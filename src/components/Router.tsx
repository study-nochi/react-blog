import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import PostListPage from "@/pages/posts";
import PostDetailPage from "@/pages/posts/detail";
import PostNewPage from "@/pages/posts/new";
import PostEditPage from "@/pages/posts/edit";
import ProfilePage from "@/pages/profile";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/sign-up";

interface RouterProps {
  isAutherticated: boolean;
}

const Router: React.FC<RouterProps> = ({ isAutherticated }) => {
  return (
    <Routes>
      {isAutherticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/new" element={<PostNewPage />} />
          <Route path="/posts/edit/:id" element={<PostEditPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
