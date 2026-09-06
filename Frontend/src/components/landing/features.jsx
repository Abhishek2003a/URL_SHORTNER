const FEATURES = [
  {
    title: "Lightning Fast ⚡",
    desc: "Ultra fast URL generation with optimized infrastructure.",
  },
  {
    title: "Secure Links 🔒",
    desc: "Modern security architecture to keep your links safe.",
  },
  {
    title: "Analytics Ready 📊",
    desc: "Track engagement and clicks with powerful analytics.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {FEATURES.map((feature, index) => (
        <div
          key={index}
          className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur hover:bg-white/15 transition duration-300"
        >
          <h3 className="text-2xl font-semibold mb-3">
            {feature.title}
          </h3>

          <p className="text-gray-400 leading-relaxed">
            {feature.desc}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Features;