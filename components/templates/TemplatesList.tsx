"use client";

import { Linkedin, Twitter } from 'lucide-react';
import { mockTemplates } from '../../lib/data/mock-data';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function TemplatesList() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Templates</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Templates</CardTitle>
          <CardDescription>
            Templates help you quickly format your content for different social media platforms. 
            Select a template that matches your content type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTemplates.map(template => (
              <Card 
                key={template.id} 
                className="border-gray-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex space-x-2">
                      {template.platforms.includes('linkedin') && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-md">
                          <Linkedin size={18} className="text-blue-600 dark:text-blue-400" />
                        </span>
                      )}
                      {template.platforms.includes('twitter') && (
                        <span className="bg-sky-100 dark:bg-sky-900/30 p-1 rounded-md">
                          <Twitter size={18} className="text-sky-500" />
                        </span>
                      )}
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="ml-auto bg-yellow-400 hover:bg-yellow-500 text-black">
                    Use Template
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