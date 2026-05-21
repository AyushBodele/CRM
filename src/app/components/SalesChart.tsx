import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: '01', revenue: 200, orders: 180 },
  { month: '02', revenue: 150, orders: 220 },
  { month: '03', revenue: 280, orders: 200 },
  { month: '04', revenue: 320, orders: 280 },
  { month: '05', revenue: 380, orders: 350 },
  { month: '06', revenue: 420, orders: 380 },
  { month: '07', revenue: 460, orders: 420 },
  { month: '08', revenue: 500, orders: 480 },
  { month: '09', revenue: 520, orders: 500 },
  { month: '10', revenue: 580, orders: 550 },
];

export function SalesChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[18px] font-semibold text-[#111111] mb-1">Sales Overview</h3>
          <p className="text-sm text-[#A0A0A0]">Sales status in September 2023</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-[#777777] rounded-xl hover:bg-[#F5F5F7]">
            Today
          </button>
          <button className="px-4 py-2 text-sm font-medium text-[#777777] rounded-xl hover:bg-[#F5F5F7]">
            Weekly
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-[#6A4A3C] text-white rounded-xl">
            Monthly
          </button>
          <button className="px-4 py-2 text-sm font-medium text-[#777777] rounded-xl hover:bg-[#F5F5F7]">
            Yearly
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F7" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#A0A0A0', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#A0A0A0', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111111',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 12px',
              color: '#ffffff',
              fontSize: '12px'
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#111111"
            strokeWidth={3}
            dot={{ fill: '#111111', r: 4 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#6A4A3C"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: '#6A4A3C', r: 4 }}
            name="Orders"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
