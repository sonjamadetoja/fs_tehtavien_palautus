import PropTypes from 'prop-types';
import { useAuthValue, useAuthDispatch } from '../AuthContext';

const LoginForm = ({ handleLogin }) => {
  const authDispatch = useAuthDispatch();
  const authValue = useAuthValue();
  const password = authValue.password;
  const username = authValue.username;
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) =>
              authDispatch({ type: 'SET_USERNAME', payload: target.value })
            }
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) =>
              authDispatch({ type: 'SET_PASSWORD', payload: target.value })
            }
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
