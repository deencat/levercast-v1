"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash, Calendar, Clock, Share2, Copy, Twitter, Linkedin } from 'lucide-react';
import { mockPosts, Post } from '../../lib/data/mock-data';
import { Button } from "../ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";

interface PostDetailProps {
  postId: string;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('raw');
  
  // Find the post by ID from mock data
  const post = mockPosts.find(p => p.id === postId);
  
  // Handle post not found
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-500 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push('/posts')}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Posts
        </Button>
      </div>
    );
  }

  // Generate status badge class
  const getStatusBadgeClass = (status: Post['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col xs:flex-row items-start xs:items-center xs:space-x-4 space-y-3 xs:space-y-0">
        <Button variant="outline" onClick={() => router.push('/posts')} className="self-start">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-3">
          <h1 className="text-xl xs:text-2xl font-bold">{post.title}</h1>
          <span className={`px-2 py-1 text-xs rounded-full self-start ${getStatusBadgeClass(post.status)}`}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4 space-y-6">
          <Card>
            <CardHeader className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Post Content</h3>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Tabs defaultValue="raw" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="raw">Raw Content</TabsTrigger>
                  <TabsTrigger value="linkedin" disabled={!post.formattedContent.linkedin}>LinkedIn</TabsTrigger>
                  <TabsTrigger value="twitter" disabled={!post.formattedContent.twitter}>Twitter</TabsTrigger>
                </TabsList>
                
                <TabsContent value="raw" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{post.rawContent}</p>
                  </div>
                  {post.imageUrl && (
                    <div className="mt-4">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="rounded-md max-h-96 w-auto object-cover" 
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="linkedin" className="mt-0">
                  <div className="p-3 sm:p-4 bg-background rounded-md border border-border">
                    <div className="flex items-center mb-3">
                      <Linkedin className="text-[#0077B5] mr-2" size={20} />
                      <h3 className="font-semibold">LinkedIn Preview</h3>
                    </div>
                    <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base whitespace-pre-line">
                      {post.formattedContent.linkedin}
                    </div>
                    {post.imageUrl && (
                      <div className="mt-4">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="rounded-md max-h-96 w-auto object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="twitter" className="mt-0">
                  <div className="p-3 sm:p-4 bg-background rounded-md border border-border">
                    <div className="flex items-center mb-3">
                      <Twitter className="text-[#1DA1F2] mr-2" size={20} />
                      <h3 className="font-semibold">Twitter Preview</h3>
                    </div>
                    <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base whitespace-pre-line">
                      {post.formattedContent.twitter}
                    </div>
                    {post.imageUrl && (
                      <div className="mt-4">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="rounded-md max-h-96 w-auto object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/4 space-y-4">
          <Card>
            <CardHeader className="py-3 px-4 border-b border-border">
              <h3 className="font-semibold text-sm">Actions</h3>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href={`/posts/${post.id}/edit`}>
                    <Edit size={16} className="mr-2" />
                    Edit Post
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => alert('This is a prototype. Delete functionality would be implemented in the actual app.')}>
                  <Trash size={16} className="mr-2" />
                  Delete
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => alert('Sharing functionality would be implemented in the actual app.')}>
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => alert('Content copied to clipboard (simulation)')}>
                  <Copy size={16} className="mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3 px-4 border-b border-border">
              <h3 className="font-semibold text-sm">Post Details</h3>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar size={16} className="mt-0.5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm">{formatDate(post.createdAt)}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(post.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={16} className="mt-0.5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p className="text-sm">{formatDate(post.updatedAt)}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(post.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 