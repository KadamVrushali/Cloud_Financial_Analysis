import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const salesByState = [
  { name: 'California', sales: 457688 },
  { name: 'New York', sales: 310876 },
  { name: 'Texas', sales: 170188 },
  { name: 'Washington', sales: 138641 },
  { name: 'Pennsylvania', sales: 116512 },
  { name: 'Florida', sales: 89474 },
];

const profitTrends = [
  { month: 'Jan', profit: 12450, sales: 98500 },
  { month: 'Feb', profit: 15230, sales: 112300 },
  { month: 'Mar', profit: 18900, sales: 135700 },
  { month: 'Apr', profit: 16780, sales: 128900 },
  { month: 'May', profit: 21340, sales: 156400 },
  { month: 'Jun', profit: 24560, sales: 178900 },
  { month: 'Jul', profit: 28920, sales: 195600 },
  { month: 'Aug', profit: 26450, sales: 187300 },
  { month: 'Sep', profit: 31200, sales: 209800 },
  { month: 'Oct', profit: 35670, sales: 228500 },
];

const salesByCity = [
  { name: 'New York City', sales: 256368 },
  { name: 'Los Angeles', sales: 175234 },
  { name: 'Seattle', sales: 119456 },
  { name: 'San Francisco', sales: 108923 },
  { name: 'Philadelphia', sales: 89654 },
  { name: 'Houston', sales: 76543 },
];

export function Analytics() {
  const [filterType, setFilterType] = useState<string>('state');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Analytics Dashboard</h2>
          <p className="text-slate-400">Visualize your business data insights</p>
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="state" className="text-white hover:bg-slate-700">By State</SelectItem>
            <SelectItem value="city" className="text-white hover:bg-slate-700">By City</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sales Bar Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            Sales by {filterType === 'state' ? 'State' : 'City'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={filterType === 'state' ? salesByState : salesByCity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Profit Trends Line Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Profit & Sales Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={profitTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="month" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend 
                wrapperStyle={{ color: '#94a3b8' }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
