import { useState } from 'react';
import AuthService from '../../../../../../scripts/api/auth';
import AuthField from './auth-field/AuthField';
import './authFormStyles.css';

const FORM_TYPE_LOGIN = 'login';
const FORM_TYPE_REGISTER = 'register';

function AuthForm() {
  const [formType, setFormType] = useState(FORM_TYPE_REGISTER);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [invalidSubmition, setInvalidSubmition] = useState('');

  const handleSubmit = () => {
    if (
      userEmail.length <= 3 ||
      userFullName.length <= 0 ||
      userName.length <= 0 ||
      userPassword.length <= 8
    ) {
      setInvalidSubmition('All Fields must be set');
      return;
    }

    setInvalidSubmition('');
    AuthService.registration(userEmail, userName, userFullName, userPassword)
      .then(function () {
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response) {
          setInvalidSubmition(error.response.data.message);
        }
      });
  };

  const handleLogin = () => {
    if (userEmail.length <= 3 || userPassword.length <= 8) {
      setInvalidSubmition('All Fields must be set');
      return;
    }
    AuthService.login(userEmail, userPassword)
      .then(function () {
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response) {
          setInvalidSubmition(error.response.data.message);
        }
      });
    setInvalidSubmition('');
  };

  const handleLoginType = () => {
    setFormType(FORM_TYPE_LOGIN);
  };

  const handleRegisterType = () => {
    setFormType(FORM_TYPE_REGISTER);
  };

  return (
    <div className="authForm">
      <div className="authForm__header">
        <div className="authForm__dash"></div>
        <div className="authForm__title">Auth</div>
        <div className="authForm__dash"></div>
      </div>
      <div className="authForm__types">
        <div className="authForm__type" onClick={handleLoginType} tabIndex="0">
          login
        </div>
        <div className="authForm__type" onClick={handleRegisterType} tabIndex="0">
          register
        </div>
      </div>

      <div className={`authForm__Fields`}>
        {formType == FORM_TYPE_REGISTER ? (
          <>
            <AuthField value={userEmail} placeholder="Email" onChange={setUserEmail}></AuthField>
            <AuthField
              value={userFullName}
              placeholder="Full Name"
              onChange={setUserFullName}></AuthField>
            <AuthField value={userName} placeholder="User Name" onChange={setUserName}></AuthField>
            <AuthField
              value={userPassword}
              placeholder="Password"
              onChange={setUserPassword}
              isPassword={true}></AuthField>
            <button className="authForm__submitButton" onClick={handleSubmit}>
              Submit
            </button>
          </>
        ) : (
          <>
            <AuthField
              value={userEmail}
              placeholder="Email"
              onChange={setUserEmail}
              isPassword={false}></AuthField>
            <AuthField
              value={userPassword}
              placeholder="Password"
              onChange={setUserPassword}
              isPassword={true}></AuthField>
            <button className="authForm__submitButton" onClick={handleLogin}>
              Login
            </button>
          </>
        )}
      </div>
      {invalidSubmition == '' ? null : (
        <div className="formActionNotification colorRed">{invalidSubmition}</div>
      )}
    </div>
  );
}

export default AuthForm;
