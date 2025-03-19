const nodemailer = require("nodemailer");
const events = require("events");

const mailEvents = new events.EventEmitter();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to test our message");
  }
});

const sendEmail = async ({ to, subject, message }) => {
  await transporter.sendMail({
    from: `"Resume Builder" <no-reply.proresume.ai>`,
    to: to,
    subject,
    html: message,
  });
};

mailEvents.on("sendMail", async (to, subject, message) => {
  await sendEmail({to, subject, message});
});

module.exports = { sendEmail, mailEvents };
