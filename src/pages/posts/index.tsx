import React from "react";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import Footer from "@/components/Footer";

const PostListPage: React.FC = () => {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
};

export default PostListPage;
