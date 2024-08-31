import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserParams, UserState } from '../../../store/UserSlice';
import './interactiveMenuStyles.css';
import AuthMenu from './auth-menu/AuthMenu';
import UserMenu from './user-menu/UserMenu';
function InteractiveMenu() {
  const userParams = useSelector(selectUserParams);
  const [isLogged, setIsLogged] = useState(0);

  useEffect(() => {
    if (userParams) {
      setIsLogged(userParams.userState == UserState.FULFILLED);
    }
  }, [userParams]);

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
