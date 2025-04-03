"use client";

import { useState, useEffect } from 'react';
import { Image, X, Send, FileUp, Linkedin, Twitter, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockTemplates } from '../../lib/data/mock-data';
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { FormError } from "../ui/form-error";
import { useFormValidation } from "../../lib/hooks/useFormValidation";

export default function NewPost() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{
    linkedin?: string;
    twitter?: string;
  }>({});
  const [activeTab, setActiveTab] = useState<'linkedin' | 'twitter'>('linkedin');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  // Form validation setup
  const { 
    values, 
    errors, 
    handleChange, 
    touchField, 
    isValid, 
    handleSubmit 
  } = useFormValidation(
    { rawContent: '' },
    {
      rawContent: {
        required: true,
        minLength: 10,
        maxLength: 1000
      }
    }
  );

  // Handle image upload (mock)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
  };

  // Select template
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  // Generate content (mock function)
  const generateContent = () => {
    // Validate the form before generating content
    touchField('rawContent');
    
    if (!values.rawContent || errors.rawContent) {
      return;
    }

    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would call the LLM service
      setGeneratedContent({
        linkedin: `I wanted to share some thoughts about this topic... \n\n${values.rawContent}\n\nWhat are your thoughts on this? Let me know in the comments below! #Levercast #ContentCreation`,
        twitter: `${values.rawContent.slice(0, 200)}${values.rawContent.length > 200 ? '...' : ''} #Levercast`
      });
      setIsGenerating(false);
    }, 1000);
  };

  // Handle form submission
  const onSubmit = (formValues: any) => {
    if (!generatedContent.linkedin && !generatedContent.twitter) {
      // Can't publish without generated content
      return;
    }
    
    setIsPublishing(true);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would publish content to social platforms
      alert('Your content has been scheduled for publishing! (Mock functionality for prototype)');
      setIsPublishing(false);
      
      // Navigate back to dashboard
      router.push('/');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Create New Post</h1>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              disabled={!generatedContent.linkedin && !generatedContent.twitter || isPublishing}
            >
              {isPublishing ? (
                <>
                  <span className="animate-spin mr-2">
                    <AlertCircle size={16} />
                  </span>
                  Publishing...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Publish
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              asChild
            >
              <Link href="/">
                Cancel
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
              <h2 className="text-lg font-semibold">Content Input</h2>
              <div>
                <Textarea
                  name="rawContent"
                  className={`min-h-[200px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-yellow-500 dark:text-white ${
                    errors.rawContent ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your content idea here..."
                  value={values.rawContent || ''}
                  onChange={handleChange}
                  onBlur={() => touchField('rawContent')}
                />
                <FormError message={errors.rawContent} />
                {!errors.rawContent && values.rawContent && (
                  <div className="text-xs text-gray-500 mt-1">
                    {values.rawContent.length} / 1000 characters
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <label className="relative cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 py-2 px-4 rounded-md inline-flex items-center transition-colors">
                  <FileUp size={16} className="mr-2" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                {selectedImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {selectedImage && (
                <div className="relative mt-4 w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Button
                type="button"
                onClick={generateContent}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                disabled={!values.rawContent || Boolean(errors.rawContent) || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-2">
                      <AlertCircle size={16} />
                    </span>
                    Generating...
                  </>
                ) : (
                  'Generate Content'
                )}
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
              <h2 className="text-lg font-semibold">Select Template</h2>
              <div className="space-y-3">
                {mockTemplates.map(template => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'hover:border-yellow-400 dark:hover:border-yellow-400'
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <div className="flex space-x-2">
                          {template.platforms.includes('linkedin') && (
                            <Linkedin size={16} className="text-blue-600 dark:text-blue-400" />
                          )}
                          {template.platforms.includes('twitter') && (
                            <Twitter size={16} className="text-sky-500" />
                          )}
                        </div>
                      </div>
                      <CardContent className="p-0 pt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {template.description}
                        </p>
                      </CardContent>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <Tabs defaultValue="linkedin" value={activeTab} onValueChange={(value) => setActiveTab(value as 'linkedin' | 'twitter')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="linkedin" className="flex items-center">
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
                    </TabsTrigger>
                    <TabsTrigger value="twitter" className="flex items-center">
                      <Twitter size={16} className="mr-2" />
                      Twitter
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="linkedin">
                    <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-900">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <Image size={24} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <p className="font-bold">Demo User</p>
                          <p className="text-xs text-gray-500">CEO at Levercast • Just now</p>
                        </div>
                      </div>
                      <div className="whitespace-pre-wrap mb-4">
                        {isGenerating ? (
                          <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                          </div>
                        ) : (
                          generatedContent.linkedin || "Your LinkedIn content will appear here once generated."
                        )}
                      </div>
                      {selectedImage && (
                        <div className="mt-4 w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="twitter">
                    <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-900">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <Image size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <p className="font-bold">Demo User <span className="font-normal text-gray-500">@demouser • Just now</span></p>
                        </div>
                      </div>
                      <div className="mb-4">
                        {isGenerating ? (
                          <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                          </div>
                        ) : (
                          generatedContent.twitter || "Your Twitter content will appear here once generated."
                        )}
                      </div>
                      {selectedImage && (
                        <div className="mt-4 w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 