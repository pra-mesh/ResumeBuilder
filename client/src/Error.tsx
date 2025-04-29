import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center">
      <h1 className="mb-2 text-9xl font-bold text-gray-300">404</h1>
      <h2 className="mb-4 text-3xl font-bold text-gray-800">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-600">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
