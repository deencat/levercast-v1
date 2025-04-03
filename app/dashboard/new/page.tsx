"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NewPostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For prototyping, we'll use a placeholder image from a public URL
      setImage("https://images.unsplash.com/photo-1567447615075-9afaaabdd626?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3");
      // In a real implementation, we would process the actual file
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-gray-400">
            Enter your content below and we'll help you format it for social media.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium">Input Content</h2>
            <div className="flex flex-col gap-4 bg-gray-900 border border-gray-800 rounded-lg p-6">
              <textarea
                className="w-full h-40 bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                placeholder="Enter your content idea here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="flex flex-col gap-2">
                {image ? (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Uploaded content"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <button
                      className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black"
                      onClick={removeImage}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-700 rounded-md p-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-gray-500" />
                      <p className="text-gray-400 text-sm">
                        Drag & drop an image or click to browse
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-yellow-400 hover:text-yellow-500 text-sm"
                      >
                        Upload Image
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <Button>
                Generate Content
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium">Preview</h2>
            
            <div className="flex flex-col gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="font-medium">LinkedIn Preview</div>
                    <div className="text-gray-400 text-sm">Your name • Just now</div>
                  </div>
                </div>
                
                <div className="text-white mb-4">
                  {content || "Your formatted LinkedIn post will appear here..."}
                </div>
                
                {image && (
                  <div className="mb-4">
                    <img
                      src={image}
                      alt="Post content"
                      className="w-full rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="font-medium">Twitter Preview</div>
                    <div className="text-gray-400 text-sm">@yourhandle • Just now</div>
                  </div>
                </div>
                
                <div className="text-white mb-4">
                  {content.length > 280 
                    ? content.substring(0, 280) + "..." 
                    : content || "Your formatted tweet will appear here..."}
                </div>
                
                {image && (
                  <div className="mb-4">
                    <img
                      src={image}
                      alt="Tweet content"
                      className="w-full rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <Button variant="secondary">
              Publish Now
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 