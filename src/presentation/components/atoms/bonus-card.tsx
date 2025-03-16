import { Award, Users } from 'lucide-react';
import { Breakpoint } from '../../../lib/types';

interface BreakpointCardProps {
  breakpoint: Breakpoint;
}

export function BreakpointCard({ breakpoint }: BreakpointCardProps) {
  const reward = breakpoint.rewards[0]; // Assuming one reward per breakpoint

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {breakpoint.tripsCount} Trips Breakpoint
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${breakpoint.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {breakpoint.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">Required Trips: {breakpoint.tripsCount}</span>
        </div>

        {reward && (
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="font-medium text-indigo-900 mb-2">Reward</h4>
            <div className="flex justify-between items-center">
              <span className="text-indigo-700">{reward.currency.name}</span>
              <span className="text-lg font-semibold text-indigo-900">
                {new Intl.NumberFormat('fr-CD', {
                  style: 'currency',
                  currency: reward.currency.value,
                }).format(reward.amount)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}