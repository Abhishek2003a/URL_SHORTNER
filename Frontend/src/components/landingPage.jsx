import { useState, useEffect } from "react";
const LandingPage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.pageX, y: e.pageY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleShorten = () => {
    if (!url) return;
    setShortUrl("https://sho.rt/" + Math.random().toString(36).substring(7));
  };

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* GRID */}
      <div
        className="absolute inset-0 z-0 animate-grid"
        style={{
          backgroundImage: `
        linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
          backgroundSize: "25px 25px", // 👈 smaller squares
        }}
      />

      {/* CURSOR GLOW */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.15), transparent 70%)`,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HERO */}
        <section className="text-center py-24 px-4">
          <h1 className="text-5xl font-bold mb-4">
            Shorten Links. <span className="text-gray-400">Amplify Reach.</span>
          </h1>
          <p className="text-gray-400 mb-6">
            Fast, secure and modern URL shortener for creators & developers.
          </p>

          {/* INPUT */}
          <div className="flex justify-center gap-2 max-w-xl mx-auto">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your URL..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 outline-none"
            />
            <button
              onClick={handleShorten}
              className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-200"
            >
              Shorten
            </button>
          </div>

          {shortUrl && <p className="mt-4 text-green-400">{shortUrl}</p>}
        </section>

        {/* FEATURES */}
        <section className="py-20 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Lightning Fast ⚡", "Secure Links 🔒", "Analytics Ready 📊"].map(
            (f, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur"
              >
                <h3 className="text-xl font-semibold">{f}</h3>
                <p className="text-gray-400 mt-2">
                  Experience next-gen performance and reliability.
                </p>
              </div>
            ),
          )}
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">How it Works</h2>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            {["Paste URL", "Click Shorten", "Share Anywhere"].map((step, i) => (
              <div key={i}>
                <div className="text-4xl mb-2">{i + 1}</div>
                <p className="text-gray-400">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Start shortening today 🚀</h2>
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200">
            Get Started
          </button>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-10 text-gray-500">
          © 2026 Smart Shortener. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
