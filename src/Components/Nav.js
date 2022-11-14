import React from "react";
import {Link} from 'react-router-dom'

function Nav() {
    return (
      <nav>
        <h3>NavBar</h3>
        <ul className="nav-links">
            <Link to="/games">
            <li>Games</li>
            </Link>
            <Link to="/characters">
            <li>Characters</li>
            </Link>
            <Link to="/developers">
            <li>Developers</li>
            </Link>
        </ul>
      </nav>
    );
  }
  
  export default Nav;