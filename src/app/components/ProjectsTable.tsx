import { MoreVertical } from 'lucide-react';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';

interface Project {
  id: string;
  name: string;
  company: string;
  avatar: string;
  members: string[];
  budget: string;
  completion: number;
  completionColor: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Living Room Interior',
    company: 'Sharma Residence',
    avatar: '🛋️',
    members: ['AH', 'JS'],
    budget: '₹4,50,000',
    completion: 55,
    completionColor: '#4CAF50'
  },
  {
    id: '2',
    name: 'Office Desks Setup',
    company: 'Tech Solutions Inc.',
    avatar: '🪑',
    members: ['MK', 'RT'],
    budget: '₹2,25,000',
    completion: 40,
    completionColor: '#D946EF'
  },
  {
    id: '3',
    name: 'Kitchen Remodel',
    company: 'Gupta Villa',
    avatar: '🪵',
    members: ['LP', 'AS'],
    budget: '₹8,75,000',
    completion: 75,
    completionColor: '#6A4A3C'
  },
];

export function ProjectsTable() {
  return (
    <Card>
      <CardHeader className="mb-6">
        <div>
          <h3 className="text-[18px] font-semibold text-[#111111] mb-1">Active Installations</h3>
          <p className="text-sm text-[#A0A0A0]">30 done this month</p>
        </div>
        <Button variant="ghost" className="!p-2 rounded-xl">
          <MoreVertical className="w-5 h-5 text-[#777777]" />
        </Button>
      </CardHeader>

      <CardBody className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EAEAEA]">
              <th className="text-left pb-4 text-sm font-semibold text-[#777777]">Client</th>
              <th className="text-left pb-4 text-sm font-semibold text-[#777777]">Team</th>
              <th className="text-left pb-4 text-sm font-semibold text-[#777777]">Amount</th>
              <th className="text-left pb-4 text-sm font-semibold text-[#777777]">Completion</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project.id}
                className={`${index !== projects.length - 1 ? 'border-b border-[#EAEAEA]' : ''}`}
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-xl">
                      {project.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#111111]">{project.company}</div>
                      <div className="text-xs text-[#A0A0A0]">{project.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex -space-x-2">
                    {project.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6A4A3C] to-[#50372D] flex items-center justify-center border-2 border-white"
                      >
                        <span className="text-white text-xs font-semibold">{member}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4">
                  <span className="font-semibold text-sm text-[#111111]">{project.budget}</span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[180px]">
                      <div className="h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${project.completion}%`,
                            backgroundColor: project.completionColor
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-[#111111] min-w-[40px]">
                      {project.completion}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
