import React, { useState } from "react";
import PostProfile from "./PostProfile";
import PostUtils from "./PostUtils";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

enum TabType {
  ALL = "all",
  MY = "my",
}

const PostList: React.FC<PostListProps> = ({ hasNavigation = true }) => {
  const [activeTab, setActiveTab] = useState(TabType.ALL);

  const handleClickTab = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={
              activeTab === TabType.ALL ? "post__navigation--active" : ""
            }
            onClick={() => handleClickTab(TabType.ALL)}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => handleClickTab(TabType.MY)}
            className={
              activeTab === TabType.MY ? "post__navigation--active" : ""
            }
          >
            나의 글
          </div>
        </div>
      )}

      <section className="post__list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <PostProfile />
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">text</div>
              <PostUtils contentId="1" />
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default PostList;
