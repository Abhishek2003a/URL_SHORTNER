import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, ChevronLeft, ChevronRight, Link2, MousePointerClick, Plus } from "lucide-react";
import { getUserAllUrls } from "../service/urlService";
import useFetchWithAuth from "../hooks/useFetchWithAuth";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const FetchWithAuth = useFetchWithAuth();

  useEffect(() => {
    const fetchUserUrls = async () => {
      setLoading(true);
      try {
        const data = await getUserAllUrls(page, 10, FetchWithAuth);
        setUrls(data.urls || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserUrls();
  }, [page, FetchWithAuth]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const totalClicks = urls.reduce((total, url) => total + (url.clicks || 0), 0);

  const activeUrls = urls.filter((url) => !url.expired).length;

  return (
    <div className="mx-auto max-w-[1600px] text-white">
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage your shortened URLs and track their performance.
          </p>
        </div>

        <Link
          to="/create-url"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          <Plus size={18} /> Create URL
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard icon={Link2} title="Total URLs" value={urls.length} />

        <StatCard icon={MousePointerClick} title="Total Clicks" value={totalClicks} />

        <StatCard icon={BarChart3} title="Active URLs" value={activeUrls} />
      </div>

      {/* Recent URLs */}
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="text-xl font-semibold">Recent URLs</h2>

          <Link to="/my-urls" className="text-sm font-semibold text-gray-300 hover:text-white">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading URLs...</div>
        ) : urls.length === 0 ? (
          <div className="p-10 text-center">
            <p className="mb-4 text-gray-400">
              You haven't created any shortened URLs yet.
            </p>

            <Link to="/create-url" className="font-semibold text-white hover:text-gray-300">
              Create your first URL →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase text-gray-400">
                  <th className="p-4">Short URL</th>
                  <th className="p-4">Original URL</th>
                  <th className="p-4">Clicks</th>
                  <th className="p-4">Created</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {urls.slice(0, 5).map((url) => (
                  <tr
                    key={url.id}
                    className="border-b border-white/10 last:border-0 hover:bg-white/5"
                  >
                    <td className="p-4 font-semibold text-white">{url.shortCode}</td>

                    <td className="max-w-xs truncate p-4">{url.originalUrl}</td>

                    <td className="p-4">{url.clicks || 0}</td>

                    <td className="p-4 text-gray-400">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <Link
                        to={`/analytics/${url.shortCode}`}
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
                      >
                        📊 Analytics
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-white/10 p-4 text-sm text-gray-400">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="rounded-lg border border-white/20 p-2 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                title="Previous page"
              >
                <ChevronLeft size={17} />
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page >= totalPages}
                className="rounded-lg border border-white/20 p-2 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                title="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>
        <div className="rounded-xl bg-white p-3 text-black"><Icon size={20} /></div>
      </div>
    </div>
  );
};

export default Dashboard;
