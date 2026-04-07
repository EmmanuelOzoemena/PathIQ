import React from 'react';
import { MessageCircle, ChevronRight, Clock } from 'lucide-react';

const StaffRoom = () => {
  const messages = [
    {
      name: 'Adeopjuu Ademola',
      avatar: 'AA',
      message: 'Hello, Miss Grace! I am yet to get your class list.',
      time: '10:30 AM',
      color: 'bg-blue-600'
    },
    {
      name: 'Badiru Pomile',
      avatar: 'BP',
      message: 'Please schedule your class next week for the practical session.',
      time: '09:15 AM',
      color: 'bg-green-600'
    },
    {
      name: 'Emmanuel John',
      avatar: 'EJ',
      message: 'Please attend last session statistics meeting tomorrow.',
      time: 'Yesterday',
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Staff Room</h3>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          See all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            {/* Avatar */}
            <div className={`w-10 h-10 ${msg.color} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
              {msg.avatar}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 text-sm">{msg.name}</h4>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {msg.time}
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffRoom;