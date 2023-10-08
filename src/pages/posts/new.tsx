import React from "react";
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";

const PostNewPage: React.FC = () => {
  return (
    <>
      <Header />
      <section>
        <PostForm />
      </section>
    </>
  );
};

export default PostNewPage;
