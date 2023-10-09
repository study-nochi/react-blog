import { db } from "@/firebase/config";
import { Post } from "@/types/post.type";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PostUtilsProps {
  post: Post;
  mutate?: () => void;
}

const PostUtils: React.FC<PostUtilsProps> = ({ post, mutate }) => {
  const handleClickDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      if (mutate) {
        mutate();
      }
    }
  };

  return (
    <div className="post__utils-box">
      <div
        className="post__delete"
        role="presentation"
        onClick={handleClickDelete}
      >
        삭제
      </div>
      <div className="post__edit" role="presentation">
        <Link to={`/posts/edit/${post.id}`}>수정</Link>
      </div>
    </div>
  );
};

export default PostUtils;
