import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Welcome to Levercast</h1>
          <p className="text-gray-400">
            Your content creation and distribution platform. Capture ideas, format them, and publish across social media with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Create New Post"
            description="Start writing a new post for social media."
            link="/dashboard/new"
            linkText="Create Post"
          />
          <DashboardCard 
            title="Recent Posts"
            description="View and manage your existing posts."
            link="/dashboard/posts"
            linkText="View Posts"
          />
          <DashboardCard 
            title="Templates"
            description="Choose from various content templates."
            link="/dashboard/templates"
            linkText="Browse Templates"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function DashboardCard({ 
  title, 
  description, 
  link, 
  linkText 
}: { 
  title: string; 
  description: string; 
  link: string; 
  linkText: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-yellow-400/50 transition-colors">
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <a 
        href={link} 
        className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500 transition-colors"
      >
        {linkText}
      </a>
    </div>
  );
} 