import React, { useState } from 'react';
import { MessageSquare, Edit2, Save } from 'lucide-react';

const TeacherNote = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState('Student shows potential but needs to improve in Mathematics and English. Consistent effort required in all subjects.');
  const [subjectNotes, setSubjectNotes] = useState({
    Maths: 'Needs improvement',
    Eng: 'Fair performance',
    Bio: 'Good understanding',
    Eco: 'Average',
    Civic: 'Excellent'
  });

  const handleSaveNote = () => {
    setIsEditing(false);
    // Here you would save the note to your backend
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Teacher's Note</h3>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSaveNote}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          rows="4"
          placeholder="Write your note here..."
        />
      ) : (
        <p className="text-gray-700 mb-4">{note}</p>
      )}

      {/* Subject Performance Indicators */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Subject Performance</h4>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(subjectNotes).map(([subject, status]) => (
            <div key={subject} className="text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium mb-1
                ${status === 'Excellent' ? 'bg-green-100 text-green-600' :
                  status === 'Good understanding' ? 'bg-blue-100 text-blue-600' :
                  status === 'Fair performance' ? 'bg-amber-100 text-amber-600' :
                  status === 'Average' ? 'bg-purple-100 text-purple-600' :
                  'bg-rose-100 text-rose-600'
                }`}>
                {subject}
              </div>
              <span className="text-xs text-gray-500">{subject}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherNote;