import {
  Activity,
  Globe2,
  MousePointerClick,
  Smartphone,
} from "lucide-react";

const AnalyticsOverview = ({ analytics }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MiniStat
        icon={MousePointerClick}
        label="Total Clicks"
        value={analytics.totalClicks.toLocaleString()}
      />
      <MiniStat
        icon={Activity}
        label="Avg. Daily Clicks"
        value={analytics.avgDailyClicks}
      />
      <MiniStat
        icon={Smartphone}
        label="Mobile Traffic"
        value={`${analytics.mobileTraffic}%`}
      />
      <MiniStat
        icon={Globe2}
        label="Top Country"
        value={analytics.topCountry}
      />
    </div>
  );
};

const MiniStat = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-white p-2.5 text-black">
        <Icon size={18} />
      </div>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
    <p className="mt-4 text-2xl font-bold text-white">{value}</p>
  </div>
);

export default AnalyticsOverview;
