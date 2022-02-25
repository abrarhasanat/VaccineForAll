import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/" exact>User Panel</NavLink>
        </li>
      )}
      {!auth.isPerson && auth.isLoggedIn && (
        <li>
          <NavLink to="/manage/set_appointment">SET APPOINTMENT</NavLink>
        </li>
      )}
      {!auth.isPerson && auth.isLoggedIn && (
        <li>
          <NavLink to="/manage/update_storage">ADD VACCINES</NavLink>
        </li>
      )}
      {!auth.isPerson && auth.isLoggedIn && (
        <li>
          <NavLink to="/manage/vaccinate">VACCINATE</NavLink>
        </li>
      )}
      {auth.isPerson && auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.uid}/update`}>Update Info</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      {
        /* {!auth.isLoggedIn && !auth.isPerson && (
        <li>
          <button onClick={auth.changeRule}>VMS</button>
        </li>
      )} */
        !auth.isLoggedIn && (
          <li>
            <NavLink to="/manage">VMS</NavLink>
          </li>
        )
      }
    </ul>
  );
};

export default NavLinks;
