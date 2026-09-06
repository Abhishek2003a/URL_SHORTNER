import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#ffffff", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563"];

const PieChart = ({ data, title }) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur sm:p-6">
      <h3 className="font-semibold text-white">{title}</h3>

      <div className="mt-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              iconType="circle"
              wrapperStyle={{
                color: "#94a3b8",
                fontSize: "12px",
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
