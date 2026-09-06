import { ArrowLeft, CalendarDays, Link2, MousePointerClick } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BarChart from "../components/Dashboard/BarChart";
import PieChart from "../components/Dashboard/PieChart";
import AnalyticsOverview from "../components/Dashboard/AnalyticsOverview";
import { analyticsData, dummyUrls } from "../data/dashboardData";

const Analytics = () => {
  const { shortCode } = useParams();

  const selectedUrl =
    dummyUrls.find((url) => url.shortCode === shortCode) || dummyUrls[0];

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-6">
        <Link
          to="/my-urls"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to My URLs
        </Link>
      </div>

      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-400">Analytics</p>

          <h1 className="text-3xl font-bold tracking-tight">
            Link performance
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
              <Link2 size={15} />
              short.ly/{selectedUrl.shortCode}
            </span>

            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <CalendarDays size={14} />
              Created {selectedUrl.createdAt}
            </span>
          </div>

          <p className="mt-3 max-w-2xl truncate text-sm text-slate-500">
            {selectedUrl.originalUrl}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
          <MousePointerClick size={18} className="text-white" />
          <div>
            <p className="text-[11px] text-slate-600">Total requests</p>
            <p className="font-bold text-white">
              {selectedUrl.clicks.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <AnalyticsOverview analytics={analyticsData} />

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <BarChart
          data={analyticsData.dailyClicks}
          title="Requests processed"
        />

        <PieChart
          data={analyticsData.browsers}
          title="Browser distribution"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PieChart
          data={analyticsData.devices}
          title="Device distribution"
        />

        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur sm:p-6">
          <h3 className="font-semibold">Traffic by country</h3>
          <p className="mt-1 text-xs text-slate-500">
            Geographic distribution of requests
          </p>

          <div className="mt-6 space-y-5">
            {analyticsData.countries.map((country) => {
              const percentage = Math.round(
                (country.value / analyticsData.totalClicks) * 100
              );

              return (
                <div key={country.name}>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{country.name}</span>
                    <span className="font-semibold text-white">
                      {country.value.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${Math.max(percentage, 3)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <h3 className="font-semibold">Recent visits</h3>
          <p className="mt-1 text-xs text-slate-500">
            Latest requests processed through this URL
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Browser</th>
                <th className="px-5 py-4">Device</th>
                <th className="px-5 py-4">Time</th>
              </tr>
            </thead>

            <tbody>
              {analyticsData.recentVisits.map((visit, index) => (
                <tr
                  key={`${visit.location}-${index}`}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-4 text-sm font-medium">
                    {visit.location}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">
                    {visit.browser}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">
                    {visit.device}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {visit.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
