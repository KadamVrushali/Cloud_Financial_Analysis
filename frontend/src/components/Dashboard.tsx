import { DollarSign, TrendingUp, MapPin, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const summaryCards = [
  {
    title: 'Total Sales',
    value: '$2,297,200',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Total Profit',
    value: '$286,400',
    change: '+8.2%',
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Top States',
    value: 'California',
    change: '$457,688',
    icon: MapPin,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'Top Cities',
    value: 'New York City',
    change: '$256,368',
    icon: Building2,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const recentUploads = [
  { name: 'Sample_Superstore.csv', date: '2025-10-20', records: '9,994' },
  { name: 'Sales_Q4_2024.csv', date: '2025-10-18', records: '5,240' },
  { name: 'Product_Analysis.csv', date: '2025-10-15', records: '3,872' },
  { name: 'Customer_Data.csv', date: '2025-10-12', records: '12,458' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-2">Dashboard Overview</h2>
        <p className="text-slate-400">Welcome to your Financial Analytics System</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-slate-300">{card.title}</CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-white">{card.value}</div>
                <p className="text-slate-400 mt-1">{card.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Uploads */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Dataset Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUploads.map((upload, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white">{upload.name}</p>
                    <p className="text-slate-400">{upload.records} records</p>
                  </div>
                </div>
                <div className="text-slate-400">{upload.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
