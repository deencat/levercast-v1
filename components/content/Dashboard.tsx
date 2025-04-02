"use client";

import { PlusCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { mockPosts } from '../../lib/data/mock-data';
import { Button } from "../ui/button";
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Welcome to Levercast</h1>
        <Button 
          asChild
          className="mt-4 md:mt-0 bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          <Link href="/new-post">
            <PlusCircle size={20} className="mr-2" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{postCounts.total}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Published</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{postCounts.published}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{postCounts.pending}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Drafts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{postCounts.draft}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Recent Posts</CardTitle>
          <Button variant="link" asChild className="text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 p-0">
            <Link href="/posts">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentPosts.map(post => (
              <div key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <div className="flex justify-between">
                  <h3 className="font-medium">{post.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    post.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.rawContent}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Button variant="link" asChild className="h-auto p-0 text-xs text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400">
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