import { useState } from 'react';
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
  const [isValidSubmition, setIsValidSubmition] = useState('');

  const handleSubmit = () => {
    if (
      userEmail.length <= 0 ||
      userFullName.length <= 0 ||
      userName.length <= 0 ||
      userPassword.length <= 0
    ) {
      setIsValidSubmition('All Fields must be set');
      return;
    }

    setIsValidSubmition('');
    console.log(
      `Email: ${userEmail}, Fullname: ${userFullName}, UserName: ${userName} Password: ${userPassword} `
    );
  };

  const handleLogin = () => {
    if (userEmail.length <= 0 || userPassword.length <= 0) {
      setIsValidSubmition('All Fields must be set');
      return;
    }

    setIsValidSubmition('');
    console.log(`Email: ${userEmail}, Password: ${userPassword} `);
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
        <div className="authForm__type" onClick={handleLoginType}>
          login
        </div>
        <div className="authForm__type" onClick={handleRegisterType}>
          register
        </div>
      </div>
      {formType == FORM_TYPE_REGISTER ? (
        <div className="authForm__Fields">
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
        </div>
      ) : (
        <div className="authForm__Fields">
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
        </div>
      )}
      {isValidSubmition == '' ? null : <div className="authForm__invalid">{isValidSubmition}</div>}
    </div>
  );
}

export default AuthForm;
