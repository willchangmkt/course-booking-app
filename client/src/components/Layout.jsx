import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import Footer from "./footer-component";

const Layout = ({currentUser, setCurrentUser}) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
      <Footer  />
    </>
  );
};

export default Layout;
