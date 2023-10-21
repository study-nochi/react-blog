import React from "react";
import Profile from "@/components/Profile";
import PostList from "@/components/PostList";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Profile />
      <PostList hasNavigation={false} />
    </>
  );
};

export default ProfilePage;
