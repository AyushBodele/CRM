import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Deal } from '../App';
import { Card, CardHeader, CardBody, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface PipelineProps {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
}

const stages = [
  { title: 'Walk-in' as const, color: 'bg-blue-50 text-blue-600', dotColor: 'bg-blue-500' },
  { title: 'Order booked' as const, color: 'bg-purple-50 text-purple-600', dotColor: 'bg-purple-500' },
  { title: 'Deliver' as const, color: 'bg-green-50 text-green-600', dotColor: 'bg-green-500' },
];

export function Pipeline({ deals, setDeals }: PipelineProps) {
  const [activeStage, setActiveStage] = useState<'Walk-in' | 'Order booked' | 'Deliver'>('Walk-in');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newStage, setNewStage] = useState<'Walk-in' | 'Order booked' | 'Deliver'>('Walk-in');

  const moveDeal = (dealId: string, newStage: 'Walk-in' | 'Order booked' | 'Deliver') => {
    setDeals(prevDeals =>
      prevDeals.map(deal =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );
    setOpenMenuId(null);
  };

  const handleOpenModal = (stage: 'Walk-in' | 'Order booked' | 'Deliver') => {
    setNewStage(stage);
    setIsModalOpen(true);
  };

  const handleAddDeal = () => {
    if (!newClient.trim() || !newInterest.trim()) return;

    let formattedVal = newValue.trim();
    if (formattedVal && !formattedVal.startsWith('₹')) {
      formattedVal = '₹' + formattedVal;
    }
    if (!formattedVal) {
      formattedVal = '₹0';
    }

    const createdDeal: Deal = {
      id: Date.now().toString(),
      client: newClient,
      interest: newInterest,
      value: formattedVal,
      date: 'Today',
      stage: newStage,
    };

    setDeals(prev => [...prev, createdDeal]);
    
    // Reset inputs
    setNewClient('');
    setNewInterest('');
    setNewValue('');
    setIsModalOpen(false);
    
    // Redirect to the stage where the deal was added
    setActiveStage(newStage);
  };

  const derivedColumns = stages.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage.title);
    return {
      ...stage,
      count: stageDeals.length,
      deals: stageDeals
    };
  });

  const currentColumn = derivedColumns.find(c => c.title === activeStage) || derivedColumns[0];

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 md:mb-8">
        <div>
          <h3 className="text-[18px] md:text-[20px] font-bold text-[#111111]">Sales Pipeline</h3>
          <p className="text-xs md:text-sm text-[#A0A0A0]">Select a stage below. Click a card to move its stage.</p>
        </div>
        <Button
          onClick={() => handleOpenModal(activeStage)}
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          className="shadow-md self-start sm:self-auto"
        >
          New Deal
        </Button>
      </div>

      {/* Stage tabs — scrollable on mobile */}
      <div className="flex gap-2 md:gap-8 mb-6 md:mb-10 border-b border-[#EAEAEA] pb-1 overflow-x-auto scrollbar-none">
        {derivedColumns.map(column => (
          <button
            key={column.title}
            onClick={() => {
              setActiveStage(column.title);
              setOpenMenuId(null);
            }}
            className={`px-3 md:px-8 py-3 md:py-4 -mb-px text-sm md:text-lg font-bold transition-all border-b-4 cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeStage === column.title
                ? 'text-[#6A4A3C] border-[#6A4A3C]'
                : 'text-[#555555] border-transparent hover:text-[#111111] hover:border-[#EAEAEA]'
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${column.dotColor} shadow-sm`}></div>
              <span>{column.title}</span>
              <span className={`ml-1 md:ml-2 text-xs md:text-sm font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full ${column.color} shadow-sm`}>
                {column.count}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 md:pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentColumn.deals.map((deal) => {
            const isDeliverStage = deal.stage === 'Deliver';
            return (
              <div
                key={deal.id}
                onClick={() => {
                  if (!isDeliverStage) {
                    setOpenMenuId(openMenuId === deal.id ? null : deal.id);
                  }
                }}
                className={`relative bg-white p-4 md:p-5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#EAEAEA] transition-all ${
                  isDeliverStage 
                    ? 'cursor-default' 
                    : 'cursor-pointer hover:border-[#6A4A3C] hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-base md:text-lg text-[#111111]">{deal.client}</h5>
                  <span className="font-bold text-[#6A4A3C] bg-[#6A4A3C]/10 px-2 py-1 rounded-lg text-xs md:text-sm">{deal.value}</span>
                </div>
                <p className="text-sm text-[#777777] mb-4">{deal.interest}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F7]">
                  <div className="text-xs font-semibold text-[#A0A0A0] bg-[#F5F5F7] px-3 py-1.5 rounded-md">
                    {deal.date}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isDeliverStage && (
                      <span className="text-[10px] font-bold text-[#A0A0A0] hidden sm:block">Click to move</span>
                    )}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EAEAEA] to-[#D4D4D4] flex items-center justify-center text-xs font-bold text-[#777777]">
                      {deal.client.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>

                {!isDeliverStage && openMenuId === deal.id && (
                  <div className="absolute right-4 top-14 bg-white border border-[#EAEAEA] rounded-xl shadow-xl py-2 w-48 z-10 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-xs font-bold text-[#A0A0A0] uppercase border-b border-[#F5F5F7] mb-1">Move to Stage:</div>
                    {stages
                      .filter(s => s.title !== deal.stage)
                      .map(s => (
                        <button
                          key={s.title}
                          onClick={(e) => {
                            e.stopPropagation();
                            moveDeal(deal.id, s.title);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-[#444444] hover:bg-[#F5F5F7] transition-colors flex items-center gap-2 cursor-pointer font-medium hover:text-[#6A4A3C]"
                        >
                          <div className={`w-2 h-2 rounded-full ${s.dotColor}`}></div>
                          {s.title}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
          <Button
            onClick={() => handleOpenModal(activeStage)}
            variant="outline"
            icon={<Plus className="w-6 h-6" />}
            className="!flex !flex-col !items-center !justify-center !gap-2 !py-8 text-sm font-semibold !text-[#A0A0A0] hover:!text-[#6A4A3C] hover:!bg-[#6A4A3C]/5 border-2 border-dashed border-[#EAEAEA] rounded-xl hover:border-[#6A4A3C] cursor-pointer"
          >
            Add New Deal in {currentColumn.title}
          </Button>
        </div>
      </div>

      {/* New Deal Overlay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 animate-in fade-in duration-200 p-4">
          <Card className="w-full sm:w-[420px] shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 sm:zoom-in-95 slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-150 p-5 md:p-6 rounded-3xl">
            <CardHeader className="flex justify-between items-center border-b border-[#F5F5F7] pb-3 mb-0">
              <h4 className="font-bold text-lg text-[#111111]">Create New Deal</h4>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="ghost"
                className="!text-[#A0A0A0] hover:!text-[#111111] !text-2xl !p-1 leading-none font-semibold"
              >
                &times;
              </Button>
            </CardHeader>

            <CardBody className="flex flex-col gap-3.5">
              <Input
                label="Client Name"
                type="text"
                placeholder="e.g. Rajesh Patil"
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
                className="font-semibold !h-10"
              />
              <Input
                label="Furniture Selection / Interest"
                type="text"
                placeholder="e.g. Teak Dining Table (6 chairs)"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="!h-10 text-[#555555]"
              />
              <Input
                label="Deal Value (₹)"
                type="text"
                placeholder="e.g. 75,000"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="font-semibold !h-10"
              />
              <Select
                label="Pipeline Stage"
                value={newStage}
                onChange={(e) => setNewStage(e.target.value as any)}
                options={[
                  { label: 'Walk-in', value: 'Walk-in' },
                  { label: 'Order booked', value: 'Order booked' },
                  { label: 'Deliver', value: 'Deliver' },
                ]}
              />
            </CardBody>

            <CardFooter className="flex gap-3 justify-end border-t border-[#F5F5F7] pt-4 mt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="outline" size="sm" className="shadow-sm active:scale-95">
                Cancel
              </Button>
              <Button onClick={handleAddDeal} variant="primary" size="sm" className="shadow-md active:scale-95">
                Add Deal
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
