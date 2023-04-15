
import React from "react";
import { Nav, NavLink, NavMenu } from "./Navbar";
  
const Navbar = () => {
  return (
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/Movies">
            Movies
          </NavLink>
          <NavLink to="/People">
            Cast and Crews
          </NavLink>
        </NavMenu>
      </Nav>
  );
};
  
export default Navbar;