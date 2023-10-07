import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import PostList from "@/components/PostList";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
};

export default ProfilePage;
