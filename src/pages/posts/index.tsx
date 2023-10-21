import React from "react";
import PostList from "@/components/PostList";

const PostListPage: React.FC = () => {
  return (
    <>
      <PostList hasNavigation={false} />
    </>
  );
};

export default PostListPage;
