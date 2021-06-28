import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { logoutUser } from "../api";

import "./style.css";

const Header = (props) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">FitnessTrackr</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/routines">Routines</NavLink>
            </NavItem>
            {token ? <NavItem>
              <NavLink href="/myroutines">My Routines</NavLink>
            </NavItem> : ""}
            <NavItem>
              <NavLink href="/activities">Activities</NavLink>
            </NavItem>
            {user ? (
              <NavItem>
                <NavLink href="/" onClick={logoutUser}>{`Logout (${user.username})`}</NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink href="/loginregister">Login/Register</NavLink>
              </NavItem>
            )}
          </Nav>  
        </Collapse>
      </Navbar>
    </div>
      );
};
        
            
      
//       </Navbar>
//       <span id="links">
//         <Link to={"/"}>Home</Link>
//         <Link to={"/routines"}>Routines</Link>
//         {token ? <Link to={"/myroutines"}>My Routines</Link> : ""}
//         <Link to={"/activities"}>Activities</Link>
//         {user ? (
//           <a href="/" onClick={logoutUser}>
//             {`Logout (${user.username})`}
//           </a>
//         ) : (
//           <Link to={"/loginregister"}>Login / Register</Link>
//         )}
//       </span>
//     </div>
//   );
// };

export default Header;