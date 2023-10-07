import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Hello Blog
      </Link>
      <div>
        <Link to="posts/new">글쓰기</Link>
        <Link to="posts">게시글</Link>
        <Link to="profile">프로필</Link>
      </div>
    </header>
  );
};

export default Header;
