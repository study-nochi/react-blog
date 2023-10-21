import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsSun, BsMoonFill } from "react-icons/bs";
import ThemeContext from "@/context/ThemeContext";
import { THEME } from "@/constants/globalEnum";

const Footer: React.FC = () => {
  const { theme, toggleMode } = useContext(ThemeContext);
  return (
    <footer>
      <Link to="posts/new">글쓰기</Link>
      <Link to="posts">게시글</Link>
      <Link to="profile">프로필</Link>
      <div>
        {theme === THEME.LIGHT ? (
          <BsSun onClick={toggleMode} className="footer__theme-btn" />
        ) : (
          <BsMoonFill onClick={toggleMode} className="footer__theme-btn" />
        )}
      </div>
    </footer>
  );
};

export default Footer;
