"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import MobileNavbar from './MobileNavbar';
import PageTransition from './PageTransition';
import { useTheme } from '../../lib/theme-context';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [isMobileView, setIsMobileView] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Update page title based on current path
  useEffect(() => {
    if (pathname === '/') {
      setPageTitle("Dashboard");
    } else if (pathname.startsWith('/posts')) {
      setPageTitle("Posts");
    } else if (pathname.startsWith('/new-post')) {
      setPageTitle("Create Post");
    } else if (pathname.startsWith('/templates')) {
      setPageTitle("Templates");
    } else if (pathname.startsWith('/settings')) {
      setPageTitle("Settings");
    } else {
      setPageTitle("Levercast");
    }
  }, [pathname]);
  
  // Check if mobile view on initial render and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      // Auto collapse sidebar on small screens
      if (window.innerWidth < 1024 && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      } else if (window.innerWidth >= 1024 && sidebarCollapsed) {
        setSidebarCollapsed(false);
      }
    };
    
    // Check on mount
    checkIsMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [sidebarCollapsed]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Menu */}
        <MobileMenu pageTitle={pageTitle} />
        
        {/* Desktop Header - hidden on mobile */}
        <header className="hidden md:flex h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 items-center justify-between px-6">
          <h2 className="text-lg font-semibold">{pageTitle}</h2>
          
          <div className="flex items-center space-x-4">
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
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <PageTransition>
            <div className="pb-16 md:pb-0"> {/* Add bottom padding for mobile */}
              {children}
            </div>
          </PageTransition>
        </main>
        
        {/* Mobile Navigation Bar */}
        <MobileNavbar />
      </div>
    </div>
  );
} 