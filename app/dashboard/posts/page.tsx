"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PenSquare, Trash2 } from "lucide-react";

// Dummy data for posts
const DUMMY_POSTS = [
  {
    id: 1,
    title: "7 Productivity Hacks for Entrepreneurs",
    content: "As entrepreneurs, time is our most valuable asset. Here are 7 proven productivity hacks that have transformed my workday...",
    createdAt: "2023-03-28T10:00:00Z",
    status: "published",
    platforms: ["linkedin", "twitter"],
  },
  {
    id: 2,
    title: "Why Customer Feedback is Your Goldmine",
    content: "Many businesses overlook the value of customer feedback. Here's how to leverage it effectively to drive growth...",
    createdAt: "2023-03-25T14:30:00Z",
    status: "published",
    platforms: ["linkedin"],
  },
  {
    id: 3,
    title: "Upcoming Product Launch Announcement",
    content: "We're excited to announce our newest product line coming next month. Stay tuned for more details on...",
    createdAt: "2023-03-22T09:15:00Z",
    status: "draft",
    platforms: [],
  },
  {
    id: 4,
    title: "5 Lessons from My Biggest Business Failure",
    content: "Failure is inevitable in entrepreneurship. Here are 5 valuable lessons I learned from my biggest business setback...",
    createdAt: "2023-03-20T11:45:00Z",
    status: "pending",
    platforms: ["linkedin", "twitter"],
  },
];

export default function PostsPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "draft":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Recent Posts</h1>
            <p className="text-gray-400">
              View and manage your social media content.
            </p>
          </div>
          <a
            href="/dashboard/new"
            className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500 transition-colors"
          >
            Create New Post
          </a>
        </div>

        <div className="flex flex-col gap-6">
          {DUMMY_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(post.status)}`}></div>
                    <span className="text-sm capitalize text-gray-400">
                      {post.status}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-400">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{post.content}</p>
                  
                  <div className="flex items-center gap-2">
                    {post.platforms.includes("linkedin") && (
                      <div className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">
                        LinkedIn
                      </div>
                    )}
                    {post.platforms.includes("twitter") && (
                      <div className="bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded text-xs">
                        Twitter
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                    <PenSquare size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 