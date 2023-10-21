import React from "react";
import PostList from "@/components/PostList";
import Carousel from "@/components/Carousel";
import fbConfig from "@/firebase/config";

const HomePage: React.FC = () => {
  console.log({ fbConfig });
  return (
    <>
      <Carousel />
      <PostList />
    </>
  );
};

export default HomePage;
