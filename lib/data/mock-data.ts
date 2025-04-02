export type PostStatus = 'draft' | 'pending' | 'published';

export interface Post {
  id: string;
  title: string;
  rawContent: string;
  formattedContent: {
    linkedin?: string;
    twitter?: string;
  };
  imageUrl?: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  platforms: ('linkedin' | 'twitter')[];
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Product Launch Announcement',
    rawContent: 'Excited to announce our new product launch! After months of hard work, we\'re finally ready to share it with the world.',
    formattedContent: {
      linkedin: 'Thrilled to announce the launch of our groundbreaking new product! 🚀\n\nAfter months of dedicated work by our incredible team, we\'re proud to introduce a solution that will transform how you approach your daily challenges.\n\n#ProductLaunch #Innovation #Entrepreneurship',
      twitter: 'Just launched our game-changing product! 🚀 Months of work has paid off and we can\'t wait for you to try it. Check it out at example.com #ProductLaunch #Innovation'
    },
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    status: 'published',
    createdAt: '2023-03-15T10:30:00Z',
    updatedAt: '2023-03-15T14:45:00Z'
  },
  {
    id: '2',
    title: 'Customer Success Story',
    rawContent: 'Great meeting with our client today who shared how our solution helped them increase productivity by 35%.',
    formattedContent: {
      linkedin: 'Inspiring meeting with our client today! 📈\n\nThey shared how our solution helped them increase productivity by 35% while reducing operational costs.\n\n"Your platform has completely transformed how we approach our workflow" - Jane Smith, CTO\n\n#CustomerSuccess #Productivity #BusinessGrowth',
    },
    status: 'draft',
    createdAt: '2023-03-18T09:15:00Z',
    updatedAt: '2023-03-18T09:15:00Z'
  },
  {
    id: '3',
    title: 'Industry Insight',
    rawContent: 'Key takeaways from the industry conference: AI integration is accelerating, remote work tools are evolving, sustainability is becoming a priority.',
    formattedContent: {
      linkedin: 'Just returned from the annual industry conference, and I\'m excited to share these key insights:\n\n1. AI integration is accelerating across all sectors\n2. Remote work tools are evolving beyond basic communication\n3. Sustainability is no longer optional - it\'s a business priority\n\nWhat trends are you seeing in your industry? Let\'s discuss below.\n\n#IndustryTrends #FutureOfWork #AI',
      twitter: 'My top 3 takeaways from this year\'s industry conference:\n\n▪️ AI adoption is accelerating dramatically\n▪️ Remote work tools are getting sophisticated\n▪️ Sustainability is now a top business priority\n\nWhat trends are you watching? #IndustryInsights'
    },
    status: 'pending',
    createdAt: '2023-03-20T16:45:00Z',
    updatedAt: '2023-03-21T11:30:00Z'
  },
  {
    id: '4',
    title: 'Team Recognition',
    rawContent: 'Proud of our development team for shipping the new feature on time. Great collaboration between design and engineering.',
    formattedContent: {
      twitter: 'Huge shoutout to our incredible dev team for shipping the new feature on time! 🎉 The collaboration between design and engineering was seamless. So proud of what we\'ve built! #TeamWork #ProudLeader'
    },
    status: 'published',
    createdAt: '2023-03-22T14:00:00Z',
    updatedAt: '2023-03-22T15:30:00Z'
  },
  {
    id: '5',
    title: 'Thought Leadership',
    rawContent: 'Three key principles I follow for effective leadership: clear communication, delegation with trust, and focusing on outcomes rather than processes.',
    formattedContent: {},
    status: 'draft',
    createdAt: '2023-03-25T08:20:00Z',
    updatedAt: '2023-03-25T08:20:00Z'
  }
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Announcement',
    description: 'Perfect for product launches, new features, or company news',
    platforms: ['linkedin', 'twitter']
  },
  {
    id: '2',
    name: 'Thought Leadership',
    description: 'Share industry insights and position yourself as a thought leader',
    platforms: ['linkedin', 'twitter']
  },
  {
    id: '3',
    name: 'Customer Success Story',
    description: 'Highlight customer achievements and testimonials',
    platforms: ['linkedin']
  },
  {
    id: '4',
    name: 'Quick Updates',
    description: 'Short, engaging updates for your audience',
    platforms: ['twitter']
  },
  {
    id: '5',
    name: 'Event Promotion',
    description: 'Promote upcoming webinars, talks, or conferences',
    platforms: ['linkedin', 'twitter']
  }
]; 