const CTA = ({ onSignup }) => {
  return (
    <section className="py-24 text-center px-4">
      <h2 className="text-4xl font-bold mb-4">Start shortening today 🚀</h2>

      <p className="text-gray-400 mb-8 text-lg">
        Join the next generation URL shortener platform.
      </p>

      <button
        onClick={onSignup}
        className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition duration-300"
      >
        Get Started
      </button>
    </section>
  );
};

export default CTA;
