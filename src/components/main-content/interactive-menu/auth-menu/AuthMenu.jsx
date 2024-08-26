import './authMenuStyles.css';
import OAuthButton from './auth-components/OAuthButton/OAuthButton';
import AuthForm from './auth-components/auth-form/AuthForm';
import { getAvalibleOAuthProviders } from '../../../../scripts/getAvalibleOAuthProviders';

function AuthMenu() {
  return (
    <div className="authMenu">
      <h4 className="authMenu__info">TRY OUT NOW!</h4>
      <div className="authMenu__providers">
        <OAuthButton oAuthProviders={getAvalibleOAuthProviders()[0]}></OAuthButton>
      </div>
      <div className="authMenu__regularAuth">
        <AuthForm></AuthForm>
      </div>
    </div>
  );
}

export default AuthMenu;
