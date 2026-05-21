import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';

interface TriggerRule {
  id: string;
  name: string;
  subtitle: string;
  colorClass: string;
  active: boolean;
}

const initialTriggers: TriggerRule[] = [
  { id: '1', name: 'New Walk-in Welcome', subtitle: 'Auto WA sent when client visit logged', colorClass: 'bg-[#E8F5E9]', active: true },
  { id: '2', name: '3-Day Follow-up', subtitle: 'If no response after quote, auto-remind', colorClass: 'bg-[#F3E5F5]', active: true },
  { id: '3', name: 'Delay Alert', subtitle: 'Auto-notify client if order delayed', colorClass: 'bg-[#FFEBEE]', active: true },
  { id: '4', name: 'Delivery Confirmation', subtitle: 'Track + confirm on day of delivery', colorClass: 'bg-[#E8F5E9]', active: true },
  { id: '5', name: 'Post-delivery Review', subtitle: 'Request Google review 7 days after', colorClass: 'bg-[#F3E5F5]', active: false },
  { id: '6', name: 'Anniversary Offer', subtitle: 'Send seasonal offer on client anniversary', colorClass: 'bg-[#FFF3E0]', active: false },
];

export function Triggers() {
  const [triggers, setTriggers] = useState<TriggerRule[]>(initialTriggers);

  const toggleTrigger = (id: string) => {
    setTriggers(prev =>
      prev.map(t => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto pr-2">
      {/* Title block */}
      <div>
        <h3 className="text-[20px] font-bold text-[#111111]">Automation Panel</h3>
        <p className="text-sm text-[#A0A0A0]">Manage instant WhatsApp auto-trigger actions for Oak & Chisel sales</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main WhatsApp Auto-triggers panel */}
        <Card className="xl:col-span-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <CardHeader className="mb-5">
            <h4 className="text-xs font-bold text-[#777777] tracking-wider uppercase">
              WhatsApp Auto-Triggers
            </h4>
          </CardHeader>

          <CardBody>
            <div className="flex flex-col gap-3">
              {triggers.map((trigger) => (
                <div
                  key={trigger.id}
                  className="flex items-center justify-between p-3.5 bg-white border border-[#EAEAEA] rounded-2xl hover:shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    {/* Subtle color-blocked square icon */}
                    <div className={`w-12 h-12 rounded-xl ${trigger.colorClass} flex-shrink-0`} />
                    
                    <div>
                      <h5 className="font-semibold text-[15px] text-[#111111] mb-0.5">{trigger.name}</h5>
                      <p className="text-[12px] text-[#888888] font-normal">{trigger.subtitle}</p>
                    </div>
                  </div>

                  {/* ON / OFF toggle pill */}
                  <Button
                    onClick={() => toggleTrigger(trigger.id)}
                    variant={trigger.active ? 'success' : 'outline'}
                    className="!px-4 !py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    {trigger.active ? 'ON' : 'OFF'}
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Info panel */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-[#6A4A3C]/10 to-[#50372D]/5 rounded-3xl p-6 border border-[#6A4A3C]/10 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#6A4A3C] shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#111111] text-base mb-1.5">WhatsApp Automation Rules</h4>
              <p className="text-xs text-[#555555] leading-relaxed mb-3">
                Oak & Chisel uses cloud-based WhatsApp API triggers to optimize your retail workflow. 
              </p>
              <ul className="text-xs text-[#555555] flex flex-col gap-2 list-disc pl-4 font-semibold">
                <li>Automated delivery notifications on the final day.</li>
                <li>Instant welcome catalogs to reduce drop-offs.</li>
                <li>Delayed quote reminders and follow-up templates.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
