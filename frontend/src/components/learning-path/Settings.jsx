// src/components/learning-path/Settings.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Bell, Lock, Globe, Sun, Moon } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    mentions: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showProgress: true,
    showAchievements: true
  });

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply theme to document when changed
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <Layout activeItem="learning-path" activeSubItem="settings">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              Manage your preferences
            </p>
          </div>

          {/* Settings Grid */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between max-w-md">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {key} notifications
                    </span>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                      className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Toggle ${key} notifications`}
                    >
                      <span
                        className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Privacy</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between max-w-md">
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <button
                      onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                      className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Toggle ${key}`}
                    >
                      <span
                        className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Settings - Dark/Light Mode */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Light Mode Button */}
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg border transition-all ${
                    theme === 'light'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400 dark:border-indigo-500'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                  aria-label="Switch to light mode"
                >
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                  {theme === 'light' && (
                    <span className="ml-2 text-xs bg-indigo-200 dark:bg-indigo-800 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </button>

                {/* Dark Mode Button */}
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400 dark:border-indigo-500'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                  aria-label="Switch to dark mode"
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                  {theme === 'dark' && (
                    <span className="ml-2 text-xs bg-indigo-200 dark:bg-indigo-800 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </button>
              </div>

              {/* Theme Preview */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Preview:</p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    {theme === 'light' ? (
                      <Sun className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {theme === 'light' ? 'Light Mode Active' : 'Dark Mode Active'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your interface will adjust automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;