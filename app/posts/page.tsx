import MainLayout from "../../components/layout/MainLayout";
import PostsList from "../../components/posts/PostsList";
import { Suspense } from "react";
import { PostsListSkeleton } from "../../components/content/LoadingStates";

export default function PostsPage() {
  return (
    <MainLayout>
      <Suspense fallback={<PostsListSkeleton />}>
        <PostsList />
      </Suspense>
    </MainLayout>
  );
} 