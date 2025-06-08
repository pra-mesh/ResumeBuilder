const resumeModel = require("./resume.model");

const list = async ({ page = 1, limit = 10, search, userId }) => {
  const query = [];
  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search?.title, "gi"),
      },
    });
  }
  query.push(
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        "user._id": userId,
      },
    }
  );
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: { $arrayElemAt: ["$metadata.total", 0] },
      },
    },
    {
      $project: {
        "data.user.password": 0,
        "data.user.roles": 0,
        "data.user.isBlocked": 0,
        "data.user.isEmailVerified": 0,
        "data.user._id": 0,
        "data.user.otp": 0,
        "data.user.__v": 0,
        "data.user.updatedAt": 0,
        "data.user.createdAt": 0,
        metadata: 0,
        "data.__v": 0,
        "data.user.refresh_token": 0,
      },
    }
  );

  const result = await resumeModel.aggregate(query);
  return result[0] || { data: [], total: 0 };
};

const create = async (payload) => await resumeModel.insertOne(payload);

const getById = async ({ id, currentUser }) => {
  const result = await resumeModel.findOne({ _id: id, user: currentUser });
  if (!result) {
    throw new Error("Resume not found");
  }
  return result;
};

const updateById = async ({ id, payload, currentUser }) => {
  const existingResume = await resumeModel.findOne({
    _id: id,
    user: currentUser,
  });
  if (!existingResume) throw new Error("Resume not found");
  const { user, _id, ...newPayload } = payload;
  const result = await resumeModel.findOneAndUpdate({ _id: id }, newPayload, {
    new: true,
  });
  if (!result) throw new Error("Something Went wrong ");
  return result;
};

const remove = async ({ id, currentUser }) => {
  const existingResume = await resumeModel.findOne({
    _id: id,
    user: currentUser,
  });
  if (!existingResume) throw new Error("Resume not found");
  return await resumeModel.deleteOne({ _id: id });
};
module.exports = { list, create, getById, updateById, remove };
