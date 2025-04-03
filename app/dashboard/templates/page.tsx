"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Dummy template data
const TEMPLATES = [
  {
    id: 1,
    name: "Professional Announcement",
    description: "Formal announcement of company news, product launches, or achievements.",
    example: "We're excited to announce [news]. This development will [benefit] for our customers by [value proposition].",
    tags: ["formal", "announcement", "professional"]
  },
  {
    id: 2,
    name: "Thought Leadership",
    description: "Position yourself as an expert with insightful industry commentary.",
    example: "Here are my thoughts on [industry trend]. I believe we'll see [prediction] because [reasoning].",
    tags: ["expert", "insights", "trends"]
  },
  {
    id: 3,
    name: "Customer Success Story",
    description: "Share how your product or service helped a customer succeed.",
    example: "Excited to share how [customer] achieved [result] using our [product/service]. Their challenge was [problem], and we helped by [solution].",
    tags: ["testimonial", "case study", "results"]
  },
  {
    id: 4,
    name: "Quick Tip",
    description: "Bite-sized, actionable advice your audience can implement immediately.",
    example: "Quick tip for [target audience]: Try [specific action] to improve [benefit]. I've found this works because [reason].",
    tags: ["advice", "actionable", "quick"]
  },
  {
    id: 5,
    name: "Industry News Commentary",
    description: "Your perspective on breaking news in your industry.",
    example: "Just saw that [news event]. My take: [opinion]. This could impact [industry] by [consequences].",
    tags: ["news", "commentary", "timely"]
  },
  {
    id: 6,
    name: "Personal Story",
    description: "Connect with your audience through authentic personal experiences.",
    example: "I learned an important lesson about [topic] when [experience]. Here's what happened and why it matters...",
    tags: ["personal", "authentic", "story"]
  }
];

export default function TemplatesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Content Templates</h1>
          <p className="text-gray-400">
            Choose from our collection of AI-powered templates to create effective social media content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-yellow-400/50 transition-colors"
            >
              <h3 className="text-xl font-medium mb-2">{template.name}</h3>
              <p className="text-gray-400 mb-4">{template.description}</p>
              
              <div className="bg-gray-800 p-3 rounded-md mb-4 text-sm text-gray-300 italic">
                "{template.example}"
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <a
                href={`/dashboard/new?template=${template.id}`}
                className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500 transition-colors w-full"
              >
                Use Template
              </a>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 