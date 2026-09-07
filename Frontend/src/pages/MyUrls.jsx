import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Check,
  Copy,
  ExternalLink,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { deleteShortUrl, getUserAllUrls } from "../service/urlService";
import useFetchWithAuth from "../hooks/useFetchWithAuth";

const MyUrls = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingUrlId, setDeletingUrlId] = useState("");
  const fetchWithAuth = useFetchWithAuth();

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getUserAllUrls(1, 100, fetchWithAuth);
        setUrls(data.urls || []);
      } catch (err) {
        setError(err.message || "Failed to fetch URLs");
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [fetchWithAuth]);

  const filteredUrls = useMemo(() => {
    return urls.filter((url) => {
      const matchesSearch =
        url.shortCode.toLowerCase().includes(search.toLowerCase()) ||
        url.originalUrl.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || url.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, urls]);

  const copyUrl = async (url) => {
    await navigator.clipboard?.writeText(url.shortUrl);
    setCopied(url.shortCode);
    setTimeout(() => setCopied(""), 1500);
  };

  const handleDelete = async (url) => {
    const urlId = url.id || url._id;

    if (!urlId || deletingUrlId) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${url.shortUrl || url.shortCode}?`,
    );

    if (!confirmed) return;

    setDeletingUrlId(urlId);
    setError("");

    try {
      await deleteShortUrl(urlId, fetchWithAuth);
      setUrls((currentUrls) =>
        currentUrls.filter(
          (currentUrl) => (currentUrl.id || currentUrl._id) !== urlId,
        ),
      );
    } catch (err) {
      setError(err.message || "Failed to delete URL");
    } finally {
      setDeletingUrlId("");
    }
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My URLs</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor every link you have created.
          </p>
        </div>

        <Link
          to="/create-url"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-gray-200"
        >
          <Plus size={18} />
          Create URL
        </Link>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur md:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by short code or original URL..."
            className="w-full rounded-xl border border-white/20 bg-black/20 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-600" />

          {["All", "Active", "Expired"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                filter === item
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-semibold">All shortened URLs</p>
            <p className="mt-1 text-xs text-slate-500">
              {filteredUrls.length} URLs found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Loading URLs...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-sm text-red-300">{error}</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="px-5 py-4">Short URL</th>
                <th className="px-5 py-4">Original URL</th>
                <th className="px-5 py-4">Clicks</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUrls.map((url) => (
                <tr
                  key={url.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        {url.shortUrl || `short.ly/${url.shortCode}`}
                      </span>

                      <button
                        onClick={() => copyUrl(url)}
                        className="rounded-lg p-1.5 text-slate-600 hover:bg-white/5 hover:text-white"
                      >
                        {copied === url.shortCode ? (
                          <Check size={15} className="text-emerald-300" />
                        ) : (
                          <Copy size={15} />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="max-w-[300px] truncate px-5 py-4 text-sm text-slate-400">
                    {url.originalUrl}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    {url.clicks.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        url.status === "Active"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-amber-400/10 text-amber-300"
                      }`}
                    >
                      {url.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/analytics/${url.shortCode}`}
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                        title="Analytics"
                      >
                        <BarChart3 size={16} />
                      </Link>

                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
                        title="Open"
                      >
                        <ExternalLink size={16} />
                      </a>

                      <button
                        onClick={() => handleDelete(url)}
                        disabled={deletingUrlId === (url.id || url._id)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>

                      <button className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUrls.length === 0 && (
            <div className="p-12 text-center text-sm text-slate-500">
              No URLs match your search.
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default MyUrls;
