
import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
  
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  z-index: 999;
  @media screen and (max-width: 600px) {
    height: 45px; 
  }
`;

const NavLink = styled(Link)`
  color: #E50914;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #fff;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;
  
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
`;


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