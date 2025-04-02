"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Newspaper, Settings, BookTemplate, ChevronLeft, ChevronRight, LogOut, User } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const { theme } = useTheme();
  
  const navItems = [
    { icon: <PlusCircle size={24} />, label: 'New Post', href: '/new-post' },
    { icon: <Newspaper size={24} />, label: 'Recent Posts', href: '/posts' },
    { icon: <BookTemplate size={24} />, label: 'Templates', href: '/templates' },
    { icon: <Settings size={24} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <div 
      className={`h-screen flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } bg-black/90 dark:bg-black/95 border-r border-gray-800 text-white`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <h1 className="text-2xl font-bold text-yellow-400">Levercast</h1>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full hover:bg-gray-800 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 py-8">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link 
                href={item.href}
                className={`flex items-center ${
                  collapsed ? 'justify-center' : 'px-6'
                } py-3 hover:bg-gray-800 transition-colors`}
              >
                <span className="text-yellow-400">{item.icon}</span>
                {!collapsed && <span className="ml-4">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-gray-800 p-4">
        <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <User size={24} className="text-yellow-400" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Demo User</p>
              <button className="text-xs text-gray-400 flex items-center mt-1 hover:text-yellow-400">
                <LogOut size={14} className="mr-1" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 