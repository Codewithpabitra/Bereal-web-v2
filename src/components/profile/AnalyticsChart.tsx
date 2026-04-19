import { type Analytics } from "../../types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const AnalyticsChart = ({ analytics }: { analytics: Analytics }) => {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Posts", value: analytics.totalPosts },
          { label: "Likes", value: analytics.totalLikes },
          { label: "Reposts", value: analytics.totalReposts },
          { label: "Shares", value: analytics.totalShares },
        ].map(s => (
          <div key={s.label} className="bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Monthly chart */}
      <div className="bg-gray-800 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-300 mb-4">Monthly Posts</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={analytics.monthlyPosts}>
            <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: 8 }} />
            <Bar dataKey="count" fill="#6C63FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};