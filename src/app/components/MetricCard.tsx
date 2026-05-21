import { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  period: string;
  icon: LucideIcon;
}

export function MetricCard({ title, value, change, changeType, period, icon: Icon }: MetricCardProps) {
  const [activePeriod, setActivePeriod] = useState('1 Month');
  const periods = ['Today', '1 Week', '1 Month', '1 Year'];

  return (
    <Card className="h-full">
      <CardHeader className="mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#6A4A3C]/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#6A4A3C]" />
          </div>
          <h3 className="text-[16px] md:text-[18px] font-semibold text-[#111111] whitespace-nowrap">{title}</h3>
        </div>
        <div className="flex items-center gap-1 flex-wrap justify-end">
          {periods.map((p) => (
            <Button
              key={p}
              variant={activePeriod === p ? 'primary' : 'ghost'}
              className="!px-2 !py-1 text-[10px] md:text-[11px] font-bold rounded-lg whitespace-nowrap active:scale-95"
              onClick={() => setActivePeriod(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardBody>
        <div className="mb-3">
          <div className="text-[32px] font-bold text-[#111111]">
            {value}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className={`font-semibold ${changeType === 'positive' ? 'text-[#4CAF50]' : 'text-[#E74C3C]'}`}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </span>
          <span className="text-[#A0A0A0]">{period}</span>
        </div>
      </CardBody>
    </Card>
  );
}
