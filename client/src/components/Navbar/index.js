
import React from "react";
import { Nav, NavLink, NavMenu } from "./Navbar";
  
const Navbar = () => {
  return (
      <Nav class="nav-bar">
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/Movies" activeStyle>
            Movies
          </NavLink>
          <NavLink to="/People" activeStyle>
            Cast and Crews
          </NavLink>
        </NavMenu>
      </Nav>
  );
};
  
export default Navbar;