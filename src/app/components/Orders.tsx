import { Search, ShoppingBag, Eye, Send, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderData {
  id: string;
  client: string;
  phone: string;
  address: string;
  date: string;
  items: OrderItem[];
  total: string;
  deliveryDate: string;
  status: 'Processing' | 'In Transit' | 'Delivered';
}

const initialOrders: OrderData[] = [
  {
    id: 'OC-ORD-1021',
    client: 'Priya Sharma',
    phone: '+91 87654 32109',
    address: 'Flat 402, Royal Palms, Bandra, Mumbai',
    date: '18 May 2026',
    items: [
      { name: 'King Size Bed (Walnut)', qty: 1, price: 45000 },
    ],
    total: '₹53,100',
    deliveryDate: '24 May 2026',
    status: 'Processing',
  },
  {
    id: 'OC-ORD-1020',
    client: 'Nikhil Deshmukh',
    phone: '+91 76543 21098',
    address: 'Office 7A, Tech Park, Hinjewadi, Pune',
    date: '16 May 2026',
    items: [
      { name: 'Conference Table (Mahogany)', qty: 1, price: 200000 },
      { name: 'Executive Chairs (Ergonomic)', qty: 6, price: 15000 },
    ],
    total: '₹3,42,200',
    deliveryDate: 'Today',
    status: 'In Transit',
  },
  {
    id: 'OC-ORD-1019',
    client: 'Arjun Kapoor',
    phone: '+91 54321 09876',
    address: 'Villa 12, Golden Meadows, Bangalore',
    date: '10 May 2026',
    items: [
      { name: 'Chesterfield Sofa (3 Seater)', qty: 1, price: 85000 },
      { name: 'Premium Office Desk', qty: 1, price: 40000 },
    ],
    total: '₹1,47,500',
    deliveryDate: '15 May 2026',
    status: 'Delivered',
  }
];

export function Orders() {
  const [orders, setOrders] = useState<OrderData[]>(initialOrders);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Processing' | 'In Transit' | 'Delivered'>('All');
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderData | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Processing
          </span>
        );
      case 'In Transit':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-600 border border-blue-200">
            <Truck className="w-3.5 h-3.5" />
            In Transit
          </span>
        );
      case 'Delivered':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'All') return true;
    return order.status === activeFilter;
  });

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto pr-2">
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-4">
        <div>
          <h3 className="text-[20px] font-bold text-[#111111]">Order Fulfillment</h3>
          <p className="text-sm text-[#A0A0A0]">Track Oak & Chisel furniture orders, dispatch status, and deliveries</p>
        </div>

        {/* Filter Badges */}
        <div className="flex gap-2 bg-[#F5F5F7] p-1.5 rounded-2xl self-start md:self-auto shadow-sm">
          {['All', 'Processing', 'In Transit', 'Delivered'].map((filter) => (
            <Button
              key={filter}
              onClick={() => {
                setActiveFilter(filter as any);
                setSelectedOrderDetail(null);
              }}
              variant={activeFilter === filter ? 'primary' : 'ghost'}
              className="!px-4 !py-2 text-xs font-bold rounded-xl active:scale-95 shadow-sm"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Orders Table */}
        <Card className="xl:col-span-2 flex flex-col gap-4">
          <CardHeader className="mb-2">
            <h4 className="font-bold text-lg text-[#111111]">Booked Orders ({filteredOrders.length})</h4>
            <Input
              type="text"
              placeholder="Search Order ID..."
              icon={<Search className="w-4 h-4 text-[#A0A0A0]" />}
              className="!h-9 !py-1 w-52 text-xs"
            />
          </CardHeader>

          <CardBody>
            <div className="overflow-x-auto border border-[#EAEAEA] rounded-2xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#EAEAEA] bg-[#F5F5F7]/50">
                    <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Order ID</th>
                    <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Client</th>
                    <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Order Date</th>
                    <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Total Value</th>
                    <th className="text-left p-4 text-xs font-bold text-[#A0A0A0] uppercase">Status</th>
                    <th className="text-right p-4 text-xs font-bold text-[#A0A0A0] uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#EAEAEA] last:border-b-0 hover:bg-[#F9F9FB]/50">
                      <td className="p-4 text-sm font-bold text-[#6A4A3C]">{order.id}</td>
                      <td className="p-4 text-sm font-bold text-[#111111]">{order.client}</td>
                      <td className="p-4 text-sm text-[#555555]">{order.date}</td>
                      <td className="p-4 text-sm font-bold text-[#111111]">{order.total}</td>
                      <td className="p-4">{getStatusBadge(order.status)}</td>
                      <td className="p-4 text-right">
                        <Button
                          onClick={() => setSelectedOrderDetail(order)}
                          variant="ghost"
                          size="sm"
                          icon={<Eye className="w-3.5 h-3.5" />}
                          className="shadow-sm active:scale-95 ml-auto"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* Detailed Dispatch & Delivery Panel */}
        <div className="xl:col-span-1">
          {selectedOrderDetail ? (
            <Card className="flex flex-col gap-5 animate-in slide-in-from-right-4 duration-200">
              <div className="flex justify-between items-start border-b border-[#F5F5F7] pb-3">
                <div>
                  <span className="text-[10px] font-bold text-[#A0A0A0] block">{selectedOrderDetail.id}</span>
                  <h4 className="font-bold text-lg text-[#111111]">{selectedOrderDetail.client}</h4>
                  <span className="text-xs text-[#777777] block mt-0.5">{selectedOrderDetail.phone}</span>
                </div>
                <div>{getStatusBadge(selectedOrderDetail.status)}</div>
              </div>

              {/* Items ordered details */}
              <div className="flex flex-col gap-3">
                <h5 className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider">Ordered Furniture Items</h5>
                <div className="flex flex-col gap-2">
                  {selectedOrderDetail.items.map((item, idx) => (
                    <div key={idx} className="bg-[#F9F9FB] p-3 rounded-lg border border-[#EAEAEA] flex justify-between items-center text-sm font-semibold">
                      <span className="text-[#111111]">{item.name} <span className="text-xs text-[#777777] font-medium">x{item.qty}</span></span>
                      <span className="text-[#6A4A3C]">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery info */}
              <div className="flex flex-col gap-3 bg-[#F9F9FB] p-4 rounded-2xl border border-[#EAEAEA]">
                <h5 className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#6A4A3C]" />
                  Delivery & Logistics
                </h5>
                <div className="text-xs flex flex-col gap-2 text-[#555555]">
                  <div>
                    <span className="font-bold text-[#111111] block mb-0.5">Shipping Address:</span>
                    {selectedOrderDetail.address}
                  </div>
                  <div>
                    <span className="font-bold text-[#111111] block mb-0.5">Est. Delivery Date:</span>
                    <span className="font-semibold text-[#6A4A3C]">{selectedOrderDetail.deliveryDate}</span>
                  </div>
                </div>
              </div>

              {/* Order management actions */}
              <div className="border-t border-[#F5F5F7] pt-4 flex flex-col gap-2.5">
                {selectedOrderDetail.status === 'Processing' && (
                  <Button
                    onClick={() => {
                      const updated = orders.map(o => o.id === selectedOrderDetail.id ? { ...o, status: 'In Transit' as const } : o);
                      setOrders(updated);
                      setSelectedOrderDetail({ ...selectedOrderDetail, status: 'In Transit' });
                    }}
                    variant="primary"
                    icon={<Truck className="w-3.5 h-3.5" />}
                    fullWidth
                    className="active:scale-95 shadow-md"
                  >
                    Ship Order (Mark In-Transit)
                  </Button>
                )}

                {selectedOrderDetail.status === 'In Transit' && (
                  <Button
                    onClick={() => {
                      const updated = orders.map(o => o.id === selectedOrderDetail.id ? { ...o, status: 'Delivered' as const } : o);
                      setOrders(updated);
                      setSelectedOrderDetail({ ...selectedOrderDetail, status: 'Delivered' });
                    }}
                    variant="success"
                    icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    fullWidth
                    className="active:scale-95 shadow-md"
                  >
                    Complete Delivery (Mark Delivered)
                  </Button>
                )}

                <Button
                  variant="outline"
                  icon={<Send className="w-3.5 h-3.5" />}
                  fullWidth
                  className="!border-[#10B981] !text-[#10B981] hover:!bg-[#10B981]/10 active:scale-95 shadow-sm"
                >
                  Share Invoice on WhatsApp
                </Button>
              </div>
            </Card>
          ) : (
            <div className="bg-[#F5F5F7]/30 border-2 border-dashed border-[#EAEAEA] rounded-3xl p-8 text-center text-[#A0A0A0] flex flex-col items-center justify-center h-48 animate-in fade-in duration-300">
              <ShoppingBag className="w-8 h-8 mb-2 opacity-30 text-[#6A4A3C]" />
              <p className="text-xs font-semibold">Select an order from the list to see address, logistics, and shipping details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
