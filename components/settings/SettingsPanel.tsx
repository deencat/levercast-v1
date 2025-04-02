"use client";

import { useState } from 'react';
import { Sun, Moon, Save, User, Lock, Bell, Globe, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';

export default function SettingsPanel() {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);

  // Toggle notifications (mock)
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Connect to LinkedIn (mock)
  const connectLinkedIn = () => {
    setLinkedInConnected(true);
    // In a real app, this would initiate OAuth flow
    alert('This would connect to LinkedIn via OAuth. (Mock functionality for prototype)');
  };

  // Connect to Twitter (mock)
  const connectTwitter = () => {
    setTwitterConnected(true);
    // In a real app, this would initiate OAuth flow
    alert('This would connect to Twitter via OAuth. (Mock functionality for prototype)');
  };

  // Save settings (mock)
  const saveSettings = () => {
    alert('Settings saved successfully! (Mock functionality for prototype)');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button
          onClick={saveSettings}
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <User size={20} className="mr-2 text-yellow-500" />
            Account Settings
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <Input
                type="text"
                className="col-span-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-white"
                defaultValue="Demo User"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <Input
                type="email"
                className="col-span-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-white"
                defaultValue="demo@example.com"
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <Lock size={20} className="mr-2 text-yellow-500" />
            Password & Security
          </h2>
          
          <Button 
            variant="outline"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
          >
            Change Password
          </Button>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <Globe size={20} className="mr-2 text-yellow-500" />
            Appearance
          </h2>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Theme Mode
            </span>
            <Button
              variant="outline" 
              onClick={toggleTheme}
              className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {theme === 'dark' ? (
                <>
                  <Moon size={18} className="text-yellow-500 mr-2" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun size={18} className="text-yellow-500 mr-2" />
                  <span>Light Mode</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <Bell size={20} className="mr-2 text-yellow-500" />
            Notifications
          </h2>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Email Notifications
            </span>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={toggleNotifications}
              className={notificationsEnabled ? "bg-yellow-500" : ""}
            />
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <Globe size={20} className="mr-2 text-yellow-500" />
            Social Media Connections
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Linkedin size={20} className="mr-2 text-[#0A66C2]" />
                <span className="font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
              </div>
              {linkedInConnected ? (
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                  Connected
                </span>
              ) : (
                <Button
                  onClick={connectLinkedIn}
                  size="sm"
                  className="bg-[#0A66C2] hover:bg-[#004182] text-white"
                >
                  Connect
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Twitter size={20} className="mr-2 text-[#1DA1F2]" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Twitter</span>
              </div>
              {twitterConnected ? (
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                  Connected
                </span>
              ) : (
                <Button
                  onClick={connectTwitter}
                  size="sm"
                  className="bg-[#1DA1F2] hover:bg-[#0c85d0] text-white"
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 