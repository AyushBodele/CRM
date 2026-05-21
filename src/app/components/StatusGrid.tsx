interface StatusItemProps {
  label: string;
  value: string;
  bgColor: string;
}

function StatusItem({ label, value, bgColor }: StatusItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F5F5F7]">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${bgColor}`}></div>
        <span className="text-sm font-medium text-[#777777]">{label}</span>
      </div>
      <span className="text-lg font-bold text-[#111111]">{value}</span>
    </div>
  );
}

export function StatusGrid() {
  const statusItems = [
    { label: 'To-process Shipment', value: '1520', bgColor: 'bg-[#E74C3C]' },
    { label: 'Processed Shipment', value: '1520', bgColor: 'bg-[#D946EF]' },
    { label: 'Pending Returns Refund', value: '459', bgColor: 'bg-[#F4C542]' },
    { label: 'Pending Cancellation', value: '121', bgColor: 'bg-[#6A4A3C]' },
    { label: 'Planned Products', value: '880', bgColor: 'bg-[#4CAF50]' },
    { label: 'Sold Out Products', value: '1520', bgColor: 'bg-[#111111]' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {statusItems.map((item) => (
        <StatusItem key={item.label} {...item} />
      ))}
    </div>
  );
}
