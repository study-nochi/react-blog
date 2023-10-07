import React from "react";
import Profile from "./PostProfile";
import PostUtilsBox from "./PostUtilsBox";

const PostDetail: React.FC = () => {
  return (
    <div className="post__detail">
      <div className="post__box">
        <div className="post__title">asdasdasd</div>
        <Profile />
        <PostUtilsBox />
        <div className="post__text">asdasdasdasdasd</div>
      </div>
    </div>
  );
};

export default PostDetail;
