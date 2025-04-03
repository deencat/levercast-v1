"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Linkedin, Twitter, Check, X } from "lucide-react";
import { Switch } from "@/components/ui/Switch";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [autoSave, setAutoSave] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // Dummy data for connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState({
    linkedin: true,
    twitter: false
  });

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const toggleAccount = (account: 'linkedin' | 'twitter') => {
    setConnectedAccounts({
      ...connectedAccounts,
      [account]: !connectedAccounts[account]
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400">
            Manage your account preferences and integrations.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-gray-400">Choose between dark and light mode</p>
            </div>
            <div className="flex items-center">
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={toggleTheme} 
              />
              <span className="ml-2 text-sm text-gray-400 capitalize">{theme}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Social Media Accounts</h2>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div className="flex items-center">
              <Linkedin className="text-blue-400 mr-3" />
              <div>
                <h3 className="font-medium">LinkedIn</h3>
                <p className="text-sm text-gray-400">Connect to share content on LinkedIn</p>
              </div>
            </div>
            <button
              onClick={() => toggleAccount('linkedin')}
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                connectedAccounts.linkedin
                  ? "bg-gray-800 text-gray-400"
                  : "bg-blue-600 text-white"
              }`}
            >
              {connectedAccounts.linkedin ? (
                <span className="flex items-center">
                  <Check size={16} className="mr-1" /> Connected
                </span>
              ) : (
                "Connect"
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <Twitter className="text-blue-400 mr-3" />
              <div>
                <h3 className="font-medium">Twitter</h3>
                <p className="text-sm text-gray-400">Connect to share content on Twitter</p>
              </div>
            </div>
            <button
              onClick={() => toggleAccount('twitter')}
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                connectedAccounts.twitter
                  ? "bg-gray-800 text-gray-400"
                  : "bg-blue-500 text-white"
              }`}
            >
              {connectedAccounts.twitter ? (
                <span className="flex items-center">
                  <Check size={16} className="mr-1" /> Connected
                </span>
              ) : (
                "Connect"
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Preferences</h2>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <h3 className="font-medium">Auto-Save Drafts</h3>
              <p className="text-sm text-gray-400">Automatically save your posts as drafts</p>
            </div>
            <div className="flex items-center">
              <Switch 
                checked={autoSave} 
                onCheckedChange={setAutoSave} 
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-400">Receive email updates about your posts</p>
            </div>
            <div className="flex items-center">
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
          </div>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
} 