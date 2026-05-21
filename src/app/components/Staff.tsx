import { Shield, Sparkles, UserPlus, Phone, Star, CheckCircle, Clock, Hammer } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';

interface StaffMember {
  id: string;
  name: string;
  role: 'Sales Representative' | 'Master Carpenter' | 'Delivery Coordinator' | 'Showroom Manager';
  phone: string;
  email: string;
  status: 'Active' | 'In Workshop' | 'Out on Delivery' | 'Off-duty';
  performance: string; // e.g. "₹3,40,000 Sales" or "5 Furniture pieces built"
  stars: number;
}

const initialStaff: StaffMember[] = [
  {
    id: 'ST-201',
    name: 'Rahul Joshi',
    role: 'Sales Representative',
    phone: '+91 98765 12345',
    email: 'rahul.joshi@oakandchisel.com',
    status: 'Active',
    performance: '₹3,67,200 Sales (This Month)',
    stars: 5,
  },
  {
    id: 'ST-202',
    name: 'Pooja Kulkarni',
    role: 'Sales Representative',
    phone: '+91 87654 23456',
    email: 'pooja.k@oakandchisel.com',
    status: 'Active',
    performance: '₹1,95,000 Sales (This Month)',
    stars: 4.5,
  },
  {
    id: 'ST-203',
    name: 'Devendra Vishwakarma',
    role: 'Master Carpenter',
    phone: '+91 76543 34567',
    email: 'devendra.v@oakandchisel.com',
    status: 'In Workshop',
    performance: '4 Mahogany Tables Finished',
    stars: 5,
  },
  {
    id: 'ST-204',
    name: 'Amit Mishra',
    role: 'Showroom Manager',
    phone: '+91 65432 45678',
    email: 'amit.mishra@oakandchisel.com',
    status: 'Active',
    performance: '98% Client Satisfaction',
    stars: 4.8,
  },
  {
    id: 'ST-205',
    name: 'Karan Thapar',
    role: 'Delivery Coordinator',
    phone: '+91 54321 56789',
    email: 'karan.t@oakandchisel.com',
    status: 'Out on Delivery',
    performance: '12 Safe Shipments (This Week)',
    stars: 4.2,
  }
];

export function Staff() {
  const [staffList] = useState<StaffMember[]>(initialStaff);
  const [selectedRole, setSelectedRole] = useState<string>('All');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-extrabold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm select-none">
            <CheckCircle className="w-4 h-4" />
            Active
          </span>
        );
      case 'In Workshop':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-extrabold rounded-full bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2] shadow-sm select-none">
            <Hammer className="w-4 h-4" />
            In Workshop
          </span>
        );
      case 'Out on Delivery':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-extrabold rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-sm select-none">
            <Clock className="w-4 h-4" />
            Out on Delivery
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-extrabold rounded-full bg-gray-50 text-gray-500 border border-gray-200 shadow-sm select-none">
            Off-duty
          </span>
        );
    }
  };

  const filteredStaff = staffList.filter(s => {
    if (selectedRole === 'All') return true;
    return s.role === selectedRole;
  });

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto pr-2">
      {/* Upper header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 border-b border-[#EAEAEA] pb-6">
        <div>
          <h3 className="text-[24px] font-bold text-[#111111]">Staff & Workshop Management</h3>
          <p className="text-sm font-semibold text-[#666666] mt-1">Manage showroom representatives, master craftsmen, and delivery coordinators</p>
        </div>
        <Button
          variant="primary"
          icon={<UserPlus className="w-4 h-4" />}
          className="!px-6 !py-3 font-bold select-none"
        >
          Add Staff Member
        </Button>
      </div>

      {/* Role Filter Pills - ENLARGED FONTS */}
      <div className="flex gap-2.5 flex-wrap mb-4">
        {['All', 'Sales Representative', 'Master Carpenter', 'Showroom Manager', 'Delivery Coordinator'].map(role => (
          <Button
            key={role}
            onClick={() => setSelectedRole(role)}
            variant={selectedRole === role ? 'primary' : 'outline'}
            className="!px-5 !py-2.5 rounded-full text-[14px] font-bold shadow-sm select-none active:scale-[0.98]"
          >
            {role === 'All' ? 'All Roles' : role + 's'}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Staff Directory List */}
        <Card className="xl:col-span-2 p-6 md:p-8 flex flex-col gap-4">
          <CardHeader className="mb-2">
            <h4 className="font-bold text-[20px] text-[#111111]">Active Team Directory</h4>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-4">
            {filteredStaff.map((staff) => (
              <div 
                key={staff.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 bg-[#F9F9FB]/50 hover:bg-white rounded-2xl border border-[#EAEAEA] hover:shadow-md transition-all gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#6A4A3C]/10 flex items-center justify-center font-bold text-[#6A4A3C] text-xl shadow-inner flex-shrink-0">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#A0A0A0] uppercase block tracking-wider">{staff.id}</span>
                    <h5 className="font-bold text-[17px] text-[#111111] mb-0.5">{staff.name}</h5>
                    <span className="text-sm text-[#555555] font-bold">{staff.role}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5 sm:self-auto self-start pl-16 sm:pl-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#333333]">{staff.performance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(staff.status)}
                    <div className="flex items-center text-[#F59E0B] gap-0.5 ml-1">
                      <Star className="w-4 h-4 fill-[#F59E0B]" />
                      <span className="text-sm font-extrabold">{staff.stars}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto pl-16 sm:pl-0">
                  <a
                    href={`tel:${staff.phone}`}
                    className="p-3 bg-[#F5F5F7] hover:bg-[#6A4A3C]/10 text-[#555555] hover:text-[#6A4A3C] rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Workshop status block */}
      <div className="xl:col-span-1 flex flex-col gap-6">
        {/* Workshop Carpentry Queue summary */}
        <Card className="flex flex-col gap-4">
          <CardHeader className="!mb-0">
            <h4 className="font-bold text-[20px] text-[#111111] flex items-center gap-2">
              <Hammer className="w-5.5 h-5.5 text-[#6A4A3C]" />
              Workshop Queue
            </h4>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <p className="text-xs font-bold text-[#777777] leading-relaxed">
              Track custom handmade furniture jobs currently in production inside our woodworking workshop:
            </p>
            
            <div className="flex flex-col gap-4 mt-2">
              <div className="bg-[#F9F9FB] p-4 rounded-xl border border-[#EAEAEA] text-xs">
                <div className="flex justify-between font-bold text-[13px] text-[#111111] mb-1.5">
                  <span>King Size Bed Carving</span>
                  <span className="text-[#6A4A3C] font-extrabold">80% Complete</span>
                </div>
                <p className="text-[12px] text-[#555555] mb-2.5 font-bold">Artisan: Devendra Vishwakarma</p>
                <div className="w-full h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6A4A3C] rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="bg-[#F9F9FB] p-4 rounded-xl border border-[#EAEAEA] text-xs">
                <div className="flex justify-between font-bold text-[13px] text-[#111111] mb-1.5">
                  <span>Chesterfield Leather Sofa</span>
                  <span className="text-[#6A4A3C] font-extrabold">45% Complete</span>
                </div>
                <p className="text-[12px] text-[#555555] mb-2.5 font-bold">Artisan: Devendra Vishwakarma</p>
                <div className="w-full h-2 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6A4A3C] rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

          {/* Leaderboard performance */}
          <div className="bg-gradient-to-br from-[#6A4A3C]/10 to-[#50372D]/5 rounded-3xl p-6 md:p-8 border border-[#6A4A3C]/10 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#6A4A3C] shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#111111] text-base mb-1.5">Showroom Leaderboard</h4>
              <p className="text-xs font-bold text-[#555555] leading-relaxed mb-3">
                Top performing sales representative of the month:
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#6A4A3C]/10 shadow-sm flex items-center justify-between text-[13px] font-extrabold text-[#111111]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F59E0B]" />
                  <span>Rahul Joshi</span>
                </div>
                <span className="text-[#6A4A3C]">₹3.67 Lakhs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
