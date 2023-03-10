import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Nav/SideNav.css";

const SideNav = () => {
  return (
    <aside>
      <ul className="side-menu">
        <li>
          <Link to="/games">Games</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/developers">Developers</Link>
        </li>
        <li>
          <Link to="/memorygame">Memory Game</Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNav;
