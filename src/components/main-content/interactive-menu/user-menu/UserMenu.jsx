import './userMenuStyles.css';
import UserInfo from './user-components/user-info/UserInfo';
import MediaLoader from './user-components/media-loader/MediaLoader';
function UserMenu() {
  return (
    <div className="userMenu">
      <h4 className="userMenu__info">WELCOME!</h4>
      <UserInfo userName="user_ssadd"></UserInfo>
      <MediaLoader></MediaLoader>
    </div>
  );
}

export default UserMenu;
