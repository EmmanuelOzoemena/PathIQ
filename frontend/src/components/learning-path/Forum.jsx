import React from 'react';
import { MessageCircle, ThumbsUp, MessageSquare, Users, TrendingUp } from 'lucide-react';

const Forum = () => {
  const discussions = [
    {
      title: 'Best practices for React useEffect cleanup?',
      author: 'Sarah Chen',
      replies: 23,
      likes: 45,
      time: '2 hours ago',
      tags: ['react', 'hooks'],
      pinned: true
    },
    {
      title: 'Understanding closures in JavaScript',
      author: 'Mike Johnson',
      replies: 15,
      likes: 32,
      time: '5 hours ago',
      tags: ['javascript', 'basics']
    },
    {
      title: 'CSS Grid vs Flexbox - When to use which?',
      author: 'Emma Wilson',
      replies: 31,
      likes: 67,
      time: '1 day ago',
      tags: ['css', 'layout'],
      popular: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Community Forum</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          New Discussion
        </button>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-500">Total Discussions</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-gray-500">Active Members</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-sm text-gray-500">Response Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discussions List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {discussions.map((discussion, index) => (
          <div
            key={index}
            className={`p-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors ${
              discussion.pinned ? 'bg-indigo-50/50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {discussion.pinned && (
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">
                      Pinned
                    </span>
                  )}
                  {discussion.popular && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{discussion.title}</h3>
                <p className="text-sm text-gray-500">
                  Posted by {discussion.author} • {discussion.time}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                {discussion.tags.map(tag => (
                  <span key={tag} className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  {discussion.replies} replies
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  {discussion.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;