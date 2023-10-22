import React, { useEffect, useState } from "react";
import Profile from "./PostProfile";
import PostUtilsBox from "./PostUtils";
import { useParams } from "react-router-dom";
import { PostData } from "@/types/post.type";
import Loader from "./Loader";
import { getPost } from "@/firebase/api";
import Comments from "./Comments";

const PostDetail: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    if (params.id) {
      getPost(params.id).then((newPost) => {
        setPost(newPost);
      });
    }
  }, []);

  return (
    <div className="post__detail">
      {post ? (
        <>
          <div className="post__box">
            <div className="post__title">{post.title}</div>
            <Profile post={post} />
            <PostUtilsBox post={post} />
            <div className="post__text post__text--pre-wrap">
              {post.content}
            </div>
          </div>
          <Comments />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
