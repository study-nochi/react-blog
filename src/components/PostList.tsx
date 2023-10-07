import React from "react";
import PostProfile from "./PostProfile";
import PostUtilsBox from "./PostUtilsBox";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

const PostList: React.FC<PostListProps> = ({ hasNavigation = true }) => {
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div className="post__navigation--active">전체</div>
          <div>나의 글</div>
        </div>
      )}

      <section className="post__list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <PostProfile />
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">text</div>
              <PostUtilsBox />
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default PostList;
