const STEPS = [
  "Paste URL",
  "Generate Short Link",
  "Share Anywhere",
];

const HowItWorks = () => {
  return (
    <section className="py-24 text-center px-4">
      <h2 className="text-4xl font-bold mb-14">
        How it Works
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 rounded-2xl p-10 backdrop-blur flex-1"
          >
            <div className="text-5xl font-bold text-gray-500 mb-4">
              0{index + 1}
            </div>

            <p className="text-xl text-gray-300">
              {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;