import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Grid } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import google from '../../img/auth/google.png';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionsTypes';
import Input from './Input';
import './styles.scss'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  let { id } = useParams();

  useEffect(() => {
    if (id == 'login') {
      setIsSignup(false)
    } else {
      setIsSignup(true)
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section id="auth">
      <div className="container-auth">
        <div className="context">{isSignup ? <h2>Registriere Dich & nimm Teil</h2> : ' '}</div>
        <Paper className="paper" elevation={3}>
          <form className="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {isSignup && (
                <>
                  <Input name="firstName" label="Vorname" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Nachname" handleChange={handleChange} half />
                </>
              )} {isSignup ? '' : <>
                <h3><LockOutlinedIcon /> Anmelden mit</h3>
                <GoogleLogin
                  clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}
                  render={(renderProps) => (
                    <Button id="googleButton" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <img src={google} alt="google" />
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
                <h5>oder</h5>
                <h3>Email</h3>
              </>}
              <Input name="email" label="Email Adresse" handleChange={handleChange} type="email" />
              <Input name="password" label="Passwort" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name="confirmPassword" label="Passwort wiederholen" handleChange={handleChange} type="password" />}
            </Grid>
            <button className="signUp" type="submit" fullwidth="true" variant="contained" color="primary">
              {isSignup ? 'Registrieren' : 'Log In'}
            </button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button className="btn" onClick={switchMode}>
                  {isSignup ? 'Du hast schon einen Account? Log In' : 'Noch keinen Account? Registiere Dich'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </section>
  );
};

export default SignUp;