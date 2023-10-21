import React, { PropsWithChildren, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "@/context/AuthContext";
import ThemeContext from "@/context/ThemeContext";

interface LayoutProps extends PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { pathname } = window.location;

  console.log({ pathname });

  return (
    <div className={theme}>
      {user ? <Header /> : <div />}
      <section className="content">{children}</section>
      <Footer />
      {/* {removeFooterPath.includes(pathname) ? <div /> : <Footer />} */}
    </div>
  );
};

export default Layout;
