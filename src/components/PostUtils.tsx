import React from "react";
import { Link } from "react-router-dom";

interface PostUtilsProps {
  contentId: string;
}

const PostUtils: React.FC<PostUtilsProps> = ({ contentId }) => {
  return (
    <div className="post__utils-box">
      <div className="post__delete">삭제</div>
      <div className="post__edit">
        <Link to={`/post/edit/${contentId}`}>수정</Link>
      </div>
    </div>
  );
};

export default PostUtils;
