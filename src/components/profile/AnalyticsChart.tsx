import { type Analytics } from "../../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// ✅ Generate last 6 months with real labels
const getLast6Months = (monthlyPosts: { month: string; count: number }[]) => {
  const months = [];
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const found = monthlyPosts?.find((m) => m.month === key);
    months.push({
      month: labels[date.getMonth()],
      count: found?.count || 0,
    });
  }
  return months;
};

// ✅ Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-white font-bold text-lg">
          {payload[0].value}{" "}
          <span className="text-xs text-gray-400 font-normal">posts</span>
        </p>
      </div>
    );
  }
  return null;
};

export const AnalyticsChart = ({ analytics }: { analytics: Analytics }) => {
  const chartData = getLast6Months(analytics.monthlyPosts);
  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="space-y-6">

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Posts", value: analytics.totalPosts, emoji: "📸" },
          { label: "Likes", value: analytics.totalLikes, emoji: "❤️" },
          { label: "Reposts", value: analytics.totalReposts, emoji: "🔁" },
          { label: "Shares", value: analytics.totalShares, emoji: "🔗" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center hover:border-primary transition"
          >
            <p className="text-xl mb-1">{s.emoji}</p>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white font-bold text-base">Monthly Activity</p>
            <p className="text-gray-500 text-xs mt-0.5">Last 6 months</p>
          </div>
          <div className="bg-gray-800 rounded-xl px-3 py-1.5">
            <p className="text-primary font-bold text-sm">
              {chartData.reduce((a, b) => a + b.count, 0)} total
            </p>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={chartData}
            barCategoryGap="30%"
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#1f2937"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#ffffff08" }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.count === maxCount && maxCount > 0
                      ? "#6C63FF"        // highest bar is purple
                      : "#374151"        // others are gray
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Best month callout */}
        {maxCount > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-500 text-xs">Best month</p>
            <p className="text-white text-xs font-semibold">
              {chartData.find((d) => d.count === maxCount)?.month} —{" "}
              <span className="text-primary">{maxCount} posts</span>
            </p>
          </div>
        )}
      </div>

      {/* Member since */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wide">Member since</p>
          <p className="text-white font-semibold mt-1">
            {new Date(analytics.memberSince).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <span className="text-3xl">🎉</span>
      </div>
    </div>
  );
};