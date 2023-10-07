import React from "react";
import Footer from "@/components/Footer";
import PostList from "@/components/PostList";
import Header from "@/components/Header";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <PostList />
      <Footer />
    </div>
  );
};

export default HomePage;
