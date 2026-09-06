const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="mb-3 text-sm font-semibold uppercase text-gray-500">Error 404</p>
      <h1 className="text-4xl font-bold sm:text-5xl">Page not found</h1>
      <a href="/" className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200">
        Return home
      </a>
    </div>
  );
};

export default NotFound;
