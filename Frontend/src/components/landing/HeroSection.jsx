import { useState } from "react";

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!url) return;
    console.log("Shortening URL API Called:", url);
    const shortUrl = await fetch(`http://localhost:3000/api/user/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: url }),
    }).then((res) => res.json());

    console.log(shortUrl);
    setShortUrl(shortUrl.shortUrl);
    // setShortUrl("https://sho.rt/" + Math.random().toString(36).substring(7));
  };

  return (
    <section className="text-center py-24 px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
        Shorten Links.
        <span className="text-gray-400 block">Amplify Reach.</span>
      </h1>

      <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
        Fast, secure and futuristic URL shortener for creators, developers and
        modern teams.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-3 max-w-2xl mx-auto">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your URL here..."
          className="flex-1 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 outline-none focus:border-white/40 transition"
        />

        <button
          onClick={handleShorten}
          className="bg-white text-black px-6 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition duration-300"
        >
          Shorten
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 max-w-xl mx-auto backdrop-blur">
          <p className="text-green-400 break-all">{shortUrl}</p>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
