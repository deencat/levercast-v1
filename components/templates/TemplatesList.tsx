"use client";

import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { mockTemplates } from '../../lib/data/mock-data';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function TemplatesList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Templates</h1>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg sm:text-xl">Content Templates</CardTitle>
          <CardDescription className="mt-1">
            Templates help you quickly format your content for different social media platforms. 
            Select a template that matches your content type.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockTemplates.map(template => (
              <Card 
                key={template.id} 
                className="border-gray-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors"
              >
                <CardHeader className="p-3 pb-2 sm:p-4 sm:pb-2">
                  <div className="flex justify-between items-start sm:items-center">
                    <Link href={`/templates/${template.id}`} className="hover:text-yellow-500">
                      <CardTitle className="text-base sm:text-lg">{template.name}</CardTitle>
                    </Link>
                    <div className="flex space-x-2 mt-1 sm:mt-0">
                      {template.platforms.includes('linkedin') && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-md">
                          <Linkedin size={16} className="text-blue-600 dark:text-blue-400" />
                        </span>
                      )}
                      {template.platforms.includes('twitter') && (
                        <span className="bg-sky-100 dark:bg-sky-900/30 p-1 rounded-md">
                          <Twitter size={16} className="text-sky-500" />
                        </span>
                      )}
                    </div>
                  </div>
                  <CardDescription className="mt-2 line-clamp-2 text-xs sm:text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col xs:flex-row justify-between p-3 sm:p-4 space-y-2 xs:space-y-0">
                  <Button variant="outline" asChild className="w-full xs:w-auto justify-center xs:justify-start">
                    <Link href={`/templates/${template.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button asChild className="w-full xs:w-auto justify-center xs:justify-start bg-yellow-400 hover:bg-yellow-500 text-black">
                    <Link href={`/new-post?template=${template.id}`}>
                      Use Template
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 