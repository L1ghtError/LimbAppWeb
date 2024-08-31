import './authFieldStyles.css';
import PropTypes from 'prop-types';

function AuthField({ value, placeholder = 'fill me!', onChange = () => {}, isPassword = false }) {
  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div className="authField">
      <input
        value={value}
        type={isPassword ? 'password' : 'text'}
        name={isPassword ? 'password' : 'input'}
        autoComplete={isPassword ? 'new-password' : 'off'}
        className="authField__input"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
}

AuthField.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isPassword: PropTypes.bool
};

export default AuthField;
