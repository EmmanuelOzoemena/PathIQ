import React, { useState } from 'react';
import StudentCard from './StudentCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StudentList = ({ students, department, level, onSelectStudent }) => {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [currentPage, setCurrentPage] = useState(1);

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // Filter students by selected letter and department/level
  const filteredStudents = students.filter(student => {
    const matchesLetter = student.name.startsWith(selectedLetter);
    const matchesDepartment = !student.department || student.department === department;
    const matchesLevel = !student.level || student.level === level;
    return matchesLetter && matchesDepartment && matchesLevel;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Alphabet Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Students ({filteredStudents.length} total)
        </label>
        <div className="flex flex-wrap gap-2">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => {
                setSelectedLetter(letter);
                setCurrentPage(1);
              }}
              className={`w-8 h-8 rounded-lg font-medium text-sm transition-colors ${
                selectedLetter === letter
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Students Grid */}
      <div className="space-y-2 mb-6">
        {paginatedStudents.map((student) => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onClick={() => onSelectStudent(student)}
          />
        ))}
        
        {paginatedStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">No students found</p>
            <p className="text-sm text-gray-400">
              Try selecting a different letter or department
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;