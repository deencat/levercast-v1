"use client";

import { PlusCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { mockPosts } from '../../lib/data/mock-data';
import { Button } from "../ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function Dashboard() {
  // Get the latest 3 posts for the dashboard
  const recentPosts = mockPosts.slice(0, 3);
  
  // Count posts by status
  const postCounts = {
    total: mockPosts.length,
    published: mockPosts.filter(post => post.status === 'published').length,
    pending: mockPosts.filter(post => post.status === 'pending').length,
    draft: mockPosts.filter(post => post.status === 'draft').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Welcome to Levercast</h1>
        <Button 
          asChild
          className="mt-4 sm:mt-0 bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          <Link href="/new-post">
            <PlusCircle size={20} className="mr-2" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="p-3 pb-2 sm:p-4 sm:pb-2">
            <CardDescription>Total Posts</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1 sm:p-4 sm:pt-1">
            <p className="text-2xl sm:text-3xl font-bold">{postCounts.total}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3 pb-2 sm:p-4 sm:pb-2">
            <CardDescription>Published</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1 sm:p-4 sm:pt-1">
            <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{postCounts.published}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3 pb-2 sm:p-4 sm:pb-2">
            <CardDescription>Pending</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1 sm:p-4 sm:pt-1">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{postCounts.pending}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3 pb-2 sm:p-4 sm:pb-2">
            <CardDescription>Drafts</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1 sm:p-4 sm:pt-1">
            <p className="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-400">{postCounts.draft}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-lg">Recent Posts</CardTitle>
          <Button variant="link" asChild className="text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 p-0">
            <Link href="/posts">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentPosts.map(post => (
              <div key={post.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                  <h3 className="font-medium">{post.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full self-start sm:self-auto ${
                    post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    post.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.rawContent}</p>
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-xs text-gray-500 order-2 sm:order-1">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Button variant="link" asChild className="h-auto p-0 text-xs text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 order-1 sm:order-2">
                    <Link href={`/posts/${post.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 