import './userMenuStyles.css';
import UserInfo from './user-components/user-info/UserInfo';
import MediaLoader from './user-components/media-loader/MediaLoader';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../../store/UserSlice';
function UserMenu() {
  const userInfo = useSelector(selectUserInfo);
  return (
    <div className="userMenu">
      <h4 className="userMenu__info">WELCOME!</h4>
      <UserInfo userName={`${userInfo.username}`}></UserInfo>
      <MediaLoader></MediaLoader>
    </div>
  );
}

export default UserMenu;
