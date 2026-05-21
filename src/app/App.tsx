import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { SalesChart } from './components/SalesChart';
import { StatusGrid } from './components/StatusGrid';
import { ProjectsTable } from './components/ProjectsTable';
import { Clients } from './components/Clients';
import { Pipeline } from './components/Pipeline';
import { Quotation } from './components/Quotation';
import { Orders } from './components/Orders';
import { Triggers } from './components/Triggers';
import { Staff } from './components/Staff';
import { ARPreview } from './components/ARPreview';
import { DollarSign, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardBody } from './components/ui/Card';

export interface Deal {
  id: string;
  client: string;
  interest: string;
  value: string;
  date: string;
  stage: 'Walk-in' | 'Order booked' | 'Deliver';
}

const initialDeals: Deal[] = [
  { id: '1', client: 'Vikas Sharma', interest: 'Living Room Sofa', value: '₹45,000', date: 'Today', stage: 'Walk-in' },
  { id: '2', client: 'Neha Gupta', interest: 'Dining Table Set', value: '₹85,000', date: 'Yesterday', stage: 'Walk-in' },
  { id: '3', client: 'Rajesh Kumar', interest: 'Office Chairs (x5)', value: '₹25,000', date: '2 days ago', stage: 'Walk-in' },
  { id: '6', client: 'Tech Corp', interest: '10x Office Desks', value: '₹2,50,000', date: 'Deliver Tomorrow', stage: 'Order booked' },
  { id: '7', client: 'Anjali Desai', interest: 'Center Table', value: '₹15,000', date: 'Deliver in 2 days', stage: 'Order booked' },
  { id: '8', client: 'Mehta Family', interest: 'TV Unit & Bookshelf', value: '₹95,000', date: 'Delivered Today', stage: 'Deliver' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="ml-[260px]">
        <Header activeTab={activeTab} />

        <main className="p-8">
          {activeTab === 'Dashboard' && (
            <>
              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-4">
                  <MetricCard
                    title="Revenue"
                    value="₹98,86,658"
                    change="4.3%"
                    changeType="positive"
                    period="From Last Month"
                    icon={DollarSign}
                  />
                </div>
                <div className="col-span-4">
                  <MetricCard
                    title="Costs"
                    value="₹48,91,125"
                    change="32%"
                    changeType="negative"
                    period="From Last Month"
                    icon={ShoppingCart}
                  />
                </div>
                <div className="col-span-4">
                  <Card className="h-full">
                    <CardHeader className="mb-4">
                      <h3 className="text-[18px] font-semibold text-[#111111]">Quick Stats</h3>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#777777]">Total Clients</span>
                          <span className="font-bold text-[#111111]">1,234</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#777777]">Active Deals</span>
                          <span className="font-bold text-[#111111]">89</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#777777]">Conversion Rate</span>
                          <span className="font-bold text-[#4CAF50]">23.5%</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-8">
                  <SalesChart />
                </div>
                <div className="col-span-4">
                  <Card>
                    <CardHeader className="mb-4">
                      <h3 className="text-[18px] font-semibold text-[#111111]">Order Status</h3>
                    </CardHeader>
                    <CardBody>
                      <StatusGrid />
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div className="mb-6">
                <ProjectsTable />
              </div>
            </>
          )}

          {activeTab === 'Clients' && <Clients deals={deals} setDeals={setDeals} />}
          
          {activeTab === 'Pipeline' && <Pipeline deals={deals} setDeals={setDeals} />}

          {activeTab === 'AR Preview' && <ARPreview />}

          {activeTab === 'Quotation' && <Quotation />}

          {activeTab === 'Orders' && <Orders />}

          {activeTab === 'Triggers' && <Triggers />}

          {activeTab === 'Staff' && <Staff />}

          {activeTab !== 'Dashboard' && activeTab !== 'Clients' && activeTab !== 'Pipeline' && activeTab !== 'AR Preview' && activeTab !== 'Quotation' && activeTab !== 'Orders' && activeTab !== 'Triggers' && activeTab !== 'Staff' && (
            <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center min-h-[400px]">
              <h2 className="text-2xl font-bold text-[#111111] mb-2">{activeTab}</h2>
              <p className="text-[#777777]">This page is currently under construction.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}