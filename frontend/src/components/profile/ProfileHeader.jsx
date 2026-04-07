// src/components/profile/ProfileHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Camera, X, Check, Copy, Eye, EyeOff, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const ProfileHeader = ({ user, profileData, courses, progress }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [showUniqueCode, setShowUniqueCode] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const fileInputRef = useRef(null);

  // Use real data from props or fallback to user context
  const userName = profileData?.name || user?.name || 'Student User';
  const userEmail = profileData?.email || user?.email || 'student@email.com';
  const userId = profileData?._id || user?._id || 'STU-48392';
  const enrolledCourses = courses?.length || profileData?.enrolledCourses?.length || 0;
  const uniqueCode = profileData?.uniqueCode || user?.uniqueCode || 'Not available';
  const streakCount = progress?.streak_length || user?.streak?.count || 0;
  const completionPercentage = progress?.completionPercentage || 0;

  // Check if user already has a profile picture from the API
  useEffect(() => {
    if (profileData?.profilePicture || user?.profilePicture) {
      setProfileImage(profileData?.profilePicture || user?.profilePicture);
    }
  }, [profileData, user]);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError('');
    setUploadSuccess(false);

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await api.student.uploadProfilePicture(formData);
      
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setUploadSuccess(true);
      
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      setUploadError(error.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCancelUpload = () => {
    setProfileImage(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(uniqueCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const toggleCodeVisibility = () => {
    setShowUniqueCode(!showUniqueCode);
  };

  const getInitials = () => {
    return userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'SN';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image with Upload Button */}
        <div className="relative mb-3 sm:mb-4 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full ring-4 ring-indigo-100 dark:ring-indigo-900 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {getInitials()}
              </span>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={triggerFileInput}
              disabled={uploading}
              className="bg-black bg-opacity-50 text-white rounded-full p-1.5 sm:p-2 hover:bg-opacity-70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Upload profile picture"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {profileImage && !uploading && (
            <button
              onClick={handleCancelUpload}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              title="Remove custom image"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
          />
        </div>

        {/* Upload status indicators */}
        {uploading && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 mb-2">
            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-indigo-600"></div>
            Uploading...
          </div>
        )}

        {uploadSuccess && (
          <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600 dark:text-green-400 mb-2">
            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
            Profile picture updated!
          </div>
        )}

        {uploadError && (
          <div className="text-xs sm:text-sm text-red-600 dark:text-red-400 mb-2">
            {uploadError}
          </div>
        )}

        {/* Name and ID */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 break-words max-w-full px-2">
          {userName}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Student ID: {userId}</p>

        {/* Streak & Progress Stats */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
          {streakCount > 0 && (
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span className="text-gray-700 dark:text-gray-300">{streakCount} day streak</span>
            </div>
          )}
          {completionPercentage > 0 && (
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">{completionPercentage}% complete</span>
            </div>
          )}
        </div>

        {/* UNIQUE CODE SECTION */}
        <div className="w-full mb-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 text-left">Your Unique Code (Share with parents)</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex-1 min-w-[120px] font-mono text-xs sm:text-sm bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white break-all">
              {showUniqueCode ? uniqueCode : '••••••••••••'}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={toggleCodeVisibility}
                className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                title={showUniqueCode ? "Hide code" : "Show code"}
              >
                {showUniqueCode ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
              <button
                onClick={handleCopyCode}
                className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors relative"
                title="Copy code"
              >
                {codeCopied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>
          {codeCopied && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 text-left">✓ Code copied to clipboard!</p>
          )}
          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-2 text-left">
            Parents can use this code to link to your account and monitor your progress.
          </p>
        </div>

        {/* Stats - Removed JAMB Reference */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-5 sm:mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-indigo-600 dark:text-indigo-400 mb-1">Enrolled</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{enrolledCourses}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Courses</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-purple-600 dark:text-purple-400 mb-1">Learning Goal</p>
            <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Master Your Subjects</p>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Keep Learning</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full py-2 sm:py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors mb-3 text-sm sm:text-base">
          Edit Profile
        </button>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-1.5 sm:gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs sm:text-sm"
        >
          <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;