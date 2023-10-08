import React from "react";
import Footer from "@/components/Footer";
import PostList from "@/components/PostList";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import fbConfig from "@/firebase/config";

const HomePage: React.FC = () => {
  console.log({ fbConfig });
  return (
    <div>
      <Header />
      <Carousel />
      <PostList />
      <Footer />
    </div>
  );
};

export default HomePage;
