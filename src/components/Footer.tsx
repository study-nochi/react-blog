import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsSun, BsMoonFill } from "react-icons/bs";
import ThemeContext from "@/context/ThemeContext";
import { THEME } from "@/constants/globalEnum";

const Footer: React.FC = () => {
  const context = useContext(ThemeContext);
  return (
    <footer>
      <Link to="posts/new">글쓰기</Link>
      <Link to="posts">게시글</Link>
      <Link to="profile">프로필</Link>
      <div>
        <button onClick={context.toggleMode} className="footer__theme-btn">
          {context.theme === THEME.LIGHT ? <BsSun /> : <BsMoonFill />}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
