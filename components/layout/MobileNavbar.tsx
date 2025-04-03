"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, PlusCircle, FileText, BookOpen, User } from 'lucide-react';

export default function MobileNavbar() {
  const pathname = usePathname();
  
  const navItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <FileText size={20} />, label: 'Posts', href: '/posts' },
    { icon: <PlusCircle size={24} />, label: 'Create', href: '/new-post', highlight: true },
    { icon: <BookOpen size={20} />, label: 'Templates', href: '/templates' },
    { icon: <User size={20} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
      <nav className="flex items-center justify-around">
        {navItems.map((item, index) => (
          <Link 
            key={index}
            href={item.href}
            className={`flex flex-col items-center justify-center py-2 ${
              item.highlight ? 'px-4 -mt-5 bg-yellow-400 rounded-full shadow-lg' : 'px-3'
            }`}
          >
            <span className={`${
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                ? 'text-yellow-500'
                : 'text-gray-500 dark:text-gray-400'
            } ${item.highlight ? 'text-black' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-xs mt-1 ${
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                ? 'text-yellow-500'
                : 'text-gray-500 dark:text-gray-400'
            } ${item.highlight ? 'text-black' : ''}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
} 