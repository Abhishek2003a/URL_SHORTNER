import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
  iconClass = "bg-white text-black",
}) => {
  const positive = change >= 0;

  return (
    <div className="group rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur transition hover:bg-white/15">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${
            positive
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-red-400/10 text-red-300"
          }`}
        >
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {Math.abs(change)}%
        </span>

        <span className="text-slate-600">{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
