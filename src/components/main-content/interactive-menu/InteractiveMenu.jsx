import { useState } from 'react';
import './interactiveMenuStyles.css';
import AuthMenu from './auth-menu/AuthMenu';
import UserMenu from './user-menu/UserMenu';
function InteractiveMenu() {
  const [isLogged] = useState(0);
  return (
    <div className="menuWrapper">
      <div id="interactiveMenu">
        <div className="interactiveMenu__bg"></div>
        {isLogged ? <UserMenu></UserMenu> : <AuthMenu></AuthMenu>}
      </div>
    </div>
  );
}

export default InteractiveMenu;
