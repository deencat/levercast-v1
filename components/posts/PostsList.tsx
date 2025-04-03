"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Filter, ChevronDown, Calendar, SortAsc, SortDesc, X } from 'lucide-react';
import { mockPosts, Post, PostStatus } from '../../lib/data/mock-data';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type SortField = 'title' | 'createdAt' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

export default function PostsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // Filter posts based on search term, status filter, and date filter
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.rawContent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    // Date filter logic
    let matchesDate = true;
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const postDate = new Date(post.createdAt);
      matchesDate = 
        postDate.getFullYear() === filterDate.getFullYear() &&
        postDate.getMonth() === filterDate.getMonth() &&
        postDate.getDate() === filterDate.getDate();
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortField === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      const dateA = new Date(a[sortField]).getTime();
      const dateB = new Date(b[sortField]).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
  });

  // Automatically show filters on desktop
  useEffect(() => {
    const handleResize = () => {
      setShowFilters(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get status badge color
  const getStatusBadgeClasses = (status: PostStatus) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('');
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Button
          asChild
          variant="yellow"
          className="mt-4 sm:mt-0"
        >
          <Link href="/new-post">
            <PlusCircle size={20} className="mr-2" />
            Create New Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Posts</CardTitle>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SortAsc size={16} className="mr-2" />
                    Sort
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortField('title')}>
                    Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortField('createdAt')}>
                    Created Date {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortField('updatedAt')}>
                    Last Modified {sortField === 'updatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleSortOrder}>
                    {sortOrder === 'asc' ? (
                      <><SortAsc size={16} className="mr-2" /> Ascending</>
                    ) : (
                      <><SortDesc size={16} className="mr-2" /> Descending</>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-accent/50 dark:bg-accent/20 p-4 rounded-md border border-border">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <select
                    className="h-10 min-w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as PostStatus | 'all')}
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                    <ChevronDown size={16} />
                  </div>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10">
                      <Calendar size={16} className="mr-2" />
                      {dateFilter ? new Date(dateFilter).toLocaleDateString() : "Filter by Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Select Date</h4>
                      <Input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full"
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDateFilter('')}
                          className="h-8"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {(searchTerm || statusFilter !== 'all' || dateFilter) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-10"
                  >
                    <X size={16} className="mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="pb-3 font-medium">
                    <button 
                      onClick={() => {
                        setSortField('title');
                        toggleSortOrder();
                      }}
                      className="flex items-center hover:text-yellow-500"
                    >
                      Title
                      {sortField === 'title' && (
                        sortOrder === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">
                    <button 
                      onClick={() => {
                        setSortField('createdAt');
                        toggleSortOrder();
                      }}
                      className="flex items-center hover:text-yellow-500"
                    >
                      Created
                      {sortField === 'createdAt' && (
                        sortOrder === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 font-medium">
                    <button 
                      onClick={() => {
                        setSortField('updatedAt');
                        toggleSortOrder();
                      }}
                      className="flex items-center hover:text-yellow-500"
                    >
                      Last Modified
                      {sortField === 'updatedAt' && (
                        sortOrder === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedPosts.length > 0 ? (
                  sortedPosts.map(post => (
                    <tr key={post.id} className="hover:bg-muted/50">
                      <td className="py-4 pr-4">
                        <div className="max-w-sm truncate font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.rawContent}</div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(post.status)}`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 text-sm">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 text-sm">
                        {new Date(post.updatedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 text-right">
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-sm font-medium text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground">
                      No posts found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 