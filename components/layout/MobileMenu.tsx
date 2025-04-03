"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Menu, X, PlusCircle, Newspaper, Settings, 
  BookTemplate, LogOut, User, Sun, Moon 
} from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface MobileMenuProps {
  pageTitle: string;
}

export default function MobileMenu({ pageTitle }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  
  // Close menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const navItems = [
    { icon: <PlusCircle size={20} />, label: 'New Post', href: '/new-post' },
    { icon: <Newspaper size={20} />, label: 'Recent Posts', href: '/posts' },
    { icon: <BookTemplate size={20} />, label: 'Templates', href: '/templates' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="flex md:hidden h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 items-center justify-between px-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        
        <h2 className="text-lg font-semibold">{pageTitle}</h2>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-gray-900/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-xl font-bold text-yellow-500">Levercast</h1>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* User Info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <User size={20} className="text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Demo User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">demo@example.com</p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 py-4">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className={`flex items-center px-4 py-3 ${
                        pathname === item.href || 
                        (item.href !== '/' && pathname.startsWith(item.href))
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className={pathname.startsWith(item.href) ? 'text-yellow-500' : ''}>{item.icon}</span>
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400">
                <LogOut size={18} className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 