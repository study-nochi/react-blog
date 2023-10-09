import React, { useContext, useEffect, useState } from "react";
import PostProfile from "./PostProfile";
import PostUtils from "./PostUtils";
import { Link } from "react-router-dom";
import { Post } from "@/types/post.type";
import AuthContext from "@/context/AuthContext";
import { getPostList } from "@/firebase/api";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
}

enum TabType {
  ALL = "all",
  MY = "my",
}

const PostList: React.FC<PostListProps> = ({ hasNavigation = true }) => {
  const [activeTab, setActiveTab] = useState(TabType.ALL);
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useContext(AuthContext);

  const handleClickTab = (tab: TabType) => {
    setActiveTab(tab);
  };

  const mutate = () => {
    getPostList()
      .then((newPosts) => {
        setPosts(newPosts);
      })
      .catch((error: FirebaseError) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    mutate();
  }, []);

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
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post.id}`}>
                <PostProfile post={post} />
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
              </Link>
              {user?.email === post.email && (
                <PostUtils post={post} mutate={mutate} />
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </section>
    </>
  );
};

export default PostList;
