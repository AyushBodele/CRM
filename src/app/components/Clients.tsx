import { Search } from 'lucide-react';
import { useState } from 'react';
import { Deal } from '../App';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface ClientsProps {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
}

const clientsData = [
  {
    id: 1,
    name: 'Rakesh Agarwal',
    phone: '+91 98765 43210',
    interest: 'Office Desk Set - 3 units',
    assignedTo: 'Rahul Joshi',
    status: 'Follow-up',
    leadScore: 75,
    scoreColor: '#F59E0B',
    lastContact: 'Today, 2:30pm',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    phone: '+91 87654 32109',
    interest: 'Sofa Set - Living Room',
    assignedTo: 'Pooja Kulkarni',
    status: 'New Walk-in',
    leadScore: 45,
    scoreColor: '#3B82F6',
    lastContact: 'Today, 1:15pm',
  },
  {
    id: 3,
    name: 'Nikhil Deshmukh',
    phone: '+91 76543 21098',
    interest: 'Conference Table + Chairs',
    assignedTo: 'Rahul Joshi',
    status: 'Order Placed',
    leadScore: 95,
    scoreColor: '#10B981',
    lastContact: 'Yesterday',
  },
  {
    id: 4,
    name: 'Sonal Mehta',
    phone: '+91 65432 10987',
    interest: 'Bedroom Wardrobe',
    assignedTo: 'Amit Mishra',
    status: 'Follow-up',
    leadScore: 60,
    scoreColor: '#F59E0B',
    lastContact: '3 days ago',
  },
  {
    id: 5,
    name: 'Arjun Kapoor',
    phone: '+91 54321 09876',
    interest: 'Full Office Interior',
    assignedTo: 'Pooja Kulkarni',
    status: 'Delivered',
    leadScore: 100,
    scoreColor: '#059669',
    lastContact: '1 week ago',
  },
];

const filters = ['All Clients', 'Walk-in', 'Follow-up Due', 'Order Placed', 'Delivered'];

export function Clients({ deals, setDeals }: ClientsProps) {
  const [activeFilter, setActiveFilter] = useState('All Clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Follow-up': return 'bg-orange-50 text-orange-500';
      case 'New Walk-in': return 'bg-blue-50 text-blue-500';
      case 'Order Placed': return 'bg-purple-50 text-purple-600 border border-purple-100';
      case 'Delivered': return 'bg-green-50 text-green-700 font-bold border border-green-200';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  const handleConvertToDeal = (client: typeof clientsData[0]) => {
    const newDeal: Deal = {
      id: Date.now().toString(),
      client: client.name,
      interest: client.interest,
      value: '₹45,000', 
      date: 'Today',
      stage: 'Walk-in',
    };

    setDeals(prev => [...prev, newDeal]);

    setSuccessMsg(`Successfully converted "${client.name}" to the Walk-in Pipeline!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 1. Process client status dynamically synced with pipeline deals state
  const processedClients = clientsData.map(client => {
    const matchingDeal = deals.find(
      d => d.client.toLowerCase() === client.name.toLowerCase()
    );
    let currentStatus = client.status;
    
    // Override status dynamically based on current pipeline stages
    if (matchingDeal) {
      if (matchingDeal.stage === 'Walk-in') {
        currentStatus = 'New Walk-in';
      } else if (matchingDeal.stage === 'Order booked') {
        currentStatus = 'Order Placed';
      } else if (matchingDeal.stage === 'Deliver') {
        currentStatus = 'Delivered';
      }
    }
    
    return {
      ...client,
      status: currentStatus,
    };
  });

  // 2. Filter clients based on Search query & Active Filter Pill selection
  const filteredClients = processedClients.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.interest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    if (!matchesSearch) return false;

    if (activeFilter === 'All Clients') return true;
    if (activeFilter === 'Walk-in') return client.status === 'New Walk-in';
    if (activeFilter === 'Follow-up Due') return client.status === 'Follow-up';
    if (activeFilter === 'Order Placed') return client.status === 'Order Placed';
    if (activeFilter === 'Delivered') return client.status === 'Delivered';

    return true;
  });

  return (
    <Card className="p-6 md:p-8">
      {/* Upper header controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-8">
        <div>
          <h3 className="text-[24px] font-bold text-[#111111]">Client Management</h3>
          <p className="text-sm font-semibold text-[#666666] mt-1">Filter clients and track status synced automatically from your sales pipeline</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <Input 
            type="text" 
            placeholder="Search clients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            className="!h-12 w-full sm:w-72"
          />
          <Button
            variant="primary"
            className="!px-6 !py-3"
          >
            Add Client
          </Button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-5 flex items-center bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm font-bold animate-in fade-in duration-200">
          {successMsg}
        </div>
      )}

      {/* Filter Chips */}
      <div className="flex gap-2.5 flex-wrap mb-8">
        {filters.map(filter => (
          <Button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            variant={activeFilter === filter ? 'primary' : 'outline'}
            className="!px-5 !py-2.5 rounded-full text-[14px] font-bold shadow-sm select-none active:scale-[0.98]"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto border border-[#EAEAEA] rounded-2xl -mx-1">
        <div className="min-w-[700px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EAEAEA] bg-[#F5F5F7]/50">
              <th className="text-left p-4 text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Client</th>
              <th className="text-left p-4 text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Interest</th>
              <th className="text-left p-4 text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Assigned To</th>
              <th className="text-left p-4 text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Lead Score</th>
              <th className="text-left p-4 text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Last Contact</th>
              <th className="text-right p-4 text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => {
                const isAlreadyInPipeline = deals.some(
                  d => d.client.toLowerCase() === client.name.toLowerCase()
                );

                return (
                  <tr 
                    key={client.id}
                    className={`hover:bg-[#F9F9FB]/50 transition-colors ${
                      index !== filteredClients.length - 1 ? 'border-b border-[#EAEAEA]' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-[16px] text-[#111111] mb-0.5">{client.name}</div>
                      <div className="text-sm text-[#777777] font-medium">{client.phone}</div>
                    </td>
                    <td className="p-4 text-[14px] text-[#333333] font-semibold">{client.interest}</td>
                    <td className="p-4 text-[14px] text-[#444444] font-medium">{client.assignedTo}</td>
                    <td className="p-4">
                      <span className={`px-3.5 py-1.5 rounded-full text-[12px] font-extrabold shadow-sm ${getStatusStyle(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full animate-pulse"
                            style={{ width: `${client.leadScore}%`, backgroundColor: client.scoreColor }}
                          />
                        </div>
                        <span className="text-sm font-bold text-[#333333]">{client.leadScore}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[14px] text-[#444444] font-medium">{client.lastContact}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        {isAlreadyInPipeline ? (
                          <span className="px-3.5 py-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-extrabold rounded-lg cursor-default select-none shadow-sm animate-in fade-in duration-100">
                            In Pipeline
                          </span>
                        ) : (
                          <Button
                            onClick={() => handleConvertToDeal(client)}
                            variant="primary"
                            size="sm"
                            className="active:scale-95 shadow-md"
                          >
                            + Deal
                          </Button>
                        )}
                        
                        <Button
                          variant="success"
                          size="sm"
                          className="!px-3 active:scale-95 shadow-sm"
                        >
                          WA
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-10 text-center text-[#777777] text-sm font-semibold">
                  No clients match the active filter or search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </Card>
  );
}
