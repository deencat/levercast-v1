"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, Copy, Edit, Trash, Twitter, Linkedin } from 'lucide-react';
import { mockTemplates } from '../../lib/data/mock-data';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';

interface TemplateDetailProps {
  templateId: string;
}

export default function TemplateDetail({ templateId }: TemplateDetailProps) {
  const router = useRouter();
  
  // Find the template by ID
  const template = mockTemplates.find(t => t.id === templateId);
  
  // Handle template not found
  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <h2 className="text-2xl font-bold mb-4">Template Not Found</h2>
        <p className="text-gray-500 mb-6">The template you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push('/templates')}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Templates
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.push('/templates')}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{template.name}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{template.description}</p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Platforms</h3>
                <div className="flex gap-2">
                  {template.platforms.includes('linkedin') && (
                    <div className="flex items-center px-3 py-1 bg-[#0077B5]/10 text-[#0077B5] rounded-full">
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
                    </div>
                  )}
                  {template.platforms.includes('twitter') && (
                    <div className="flex items-center px-3 py-1 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-full">
                      <Twitter size={16} className="mr-2" />
                      Twitter
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Sample Structure</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  {template.id === '1' && (
                    <div className="space-y-4">
                      <p>🎉 Exciting news! We're proud to announce [Product/Service Name].</p>
                      <p>This new offering will help you [key benefit 1], [key benefit 2], and [key benefit 3].</p>
                      <p>Learn more at [URL] or contact us to schedule a demo!</p>
                      <p>#Announcement #NewLaunch #[Industry]</p>
                    </div>
                  )}
                  
                  {template.id === '2' && (
                    <div className="space-y-4">
                      <p>Here's my perspective on [industry topic]:</p>
                      <p>1. [Key insight 1]</p>
                      <p>2. [Key insight 2]</p>
                      <p>3. [Key insight 3]</p>
                      <p>What's your take? Share your thoughts below.</p>
                      <p>#ThoughtLeadership #[Industry] #Insights</p>
                    </div>
                  )}
                  
                  {template.id === '3' && (
                    <div className="space-y-4">
                      <p>We're thrilled to share this success story from [Client Name]!</p>
                      <p>After implementing our [product/service], they experienced:</p>
                      <p>✅ [Specific result 1]</p>
                      <p>✅ [Specific result 2]</p>
                      <p>✅ [Specific result 3]</p>
                      <p>Read the full case study: [URL]</p>
                      <p>#CustomerSuccess #CaseStudy #[Industry]</p>
                    </div>
                  )}
                  
                  {template.id === '4' && (
                    <div className="space-y-4">
                      <p>Quick update: [Brief news or accomplishment]</p>
                      <p>Thoughts? #[Industry] #QuickUpdate</p>
                    </div>
                  )}
                  
                  {template.id === '5' && (
                    <div className="space-y-4">
                      <p>🗓️ Join us for [Event Name]!</p>
                      <p>📅 Date: [Date]</p>
                      <p>⏰ Time: [Time]</p>
                      <p>📍 Location: [Physical location or 'Virtual']</p>
                      <p>Learn more and register: [URL]</p>
                      <p>#Event #[Industry] #[EventType]</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-1/4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-semibold text-sm">Actions</h3>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href={`/new-post?template=${template.id}`}>
                  <Copy size={16} className="mr-2" />
                  Use Template
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => alert('This is a prototype. Edit functionality would be implemented in the actual app.')}>
                <Edit size={16} className="mr-2" />
                Edit Template
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => alert('This is a prototype. Delete functionality would be implemented in the actual app.')}>
                <Trash size={16} className="mr-2" />
                Delete Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 