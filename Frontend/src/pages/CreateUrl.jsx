import { ArrowLeft, Link2, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { createShortUrl } from "../service/urlService";
import useFetchWithAuth from "../hooks/useFetchWithAuth";

const CreateUrl = () => {
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.originalUrl || "");
  const [customCode, setCustomCode] = useState("");
  const [createdUrl, setCreatedUrl] = useState("");
  const [error, setError] = useState("");
  const fetchWithAuth = useFetchWithAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await createShortUrl(url, customCode, fetchWithAuth);
      if (result.success) {
        setCreatedUrl(result.shortURL);
      }
    } catch (err) {
      setError(err.message || "Failed to create short URL");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
        <div className="border-b border-white/10 p-6 sm:p-8">
          <div className="mb-4 inline-flex rounded-xl bg-white p-3 text-black">
            <Link2 size={22} />
          </div>

          <h1 className="text-3xl font-bold">Create a short URL</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Turn a long URL into a clean, shareable link and start tracking its
            performance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Destination URL
            </label>

            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              className="w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Custom alias <span className="text-slate-600">(optional)</span>
            </label>

            <div className="flex overflow-hidden rounded-xl border border-white/20 bg-black/20 focus-within:border-white/50">
              <span className="flex items-center border-r border-white/10 px-4 text-sm text-slate-600">
                short.ly/
              </span>
              <input
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="my-link"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex gap-3">
              <Sparkles size={18} className="mt-0.5 shrink-0 text-white" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Analytics included
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Every click will be recorded so you can analyze traffic,
                  devices, browsers and locations.
                </p>
              </div>
            </div>
          </div>

          {createdUrl && (
            <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4 text-sm text-emerald-300">
              Short URL created:{" "}
              <a
                href={createdUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                {createdUrl}
              </a>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-400/10 bg-red-400/5 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Shorten URL
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUrl;
