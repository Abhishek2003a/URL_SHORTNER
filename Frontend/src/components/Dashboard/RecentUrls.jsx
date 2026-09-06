import { BarChart3, Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const RecentUrls = ({ urls }) => {
  const copyUrl = async (shortCode) => {
    await navigator.clipboard?.writeText(`https://short.ly/${shortCode}`);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold text-white">Recent URLs</h2>
          <p className="mt-1 text-xs text-slate-500">
            Your latest shortened links
          </p>
        </div>

        <Link
          to="/my-urls"
          className="text-xs font-semibold text-gray-300 hover:text-white"
        >
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
              <th className="px-5 py-3 font-medium">Short URL</th>
              <th className="px-5 py-3 font-medium">Original URL</th>
              <th className="px-5 py-3 font-medium">Clicks</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {urls.slice(0, 5).map((url) => (
              <tr
                key={url.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      short.ly/{url.shortCode}
                    </span>
                    <button
                      onClick={() => copyUrl(url.shortCode)}
                      className="rounded-lg p-1.5 text-slate-600 hover:bg-white/5 hover:text-white"
                      title="Copy"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </td>

                <td className="max-w-[240px] truncate px-5 py-4 text-sm text-slate-400">
                  {url.originalUrl}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-white">
                  {url.clicks.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {url.createdAt}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/analytics/${url.shortCode}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white"
                      title="Analytics"
                    >
                      <BarChart3 size={16} />
                    </Link>

                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
                      title="Open"
                    >
                      <ExternalLink size={16} />
                    </a>

                    <button className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentUrls;
