import './userInfoStyles.css';
import PropTypes from 'prop-types';

function UserInfo({ userName }) {
  const MAX_NAME_LENGTH = 20;
  const displayName =
    userName.length > MAX_NAME_LENGTH ? `${userName.slice(0, MAX_NAME_LENGTH)}` : userName;

  return (
    <div className="userInfo">
      <div className="userInfo__userName">@{displayName}</div>
      {userName.length > MAX_NAME_LENGTH ? <div className="sizeExceeded">...</div> : null}
    </div>
  );
}

UserInfo.propTypes = {
  userName: PropTypes.string.isRequired
};

export default UserInfo;
