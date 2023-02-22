import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';

import Icon from './icon';
import useStyles from './AuthStyles';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./input";
import {signin, signup} from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}


const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup){
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwt_decode(token);

    try {
      dispatch({ type: 'AUTH', data: { result, token} });

      navigate('/');
    } catch (error) {
      console.log(error);
    }

  }

  const googleFailure = () => {
    console.log("Gooogle Sign In was unsuccessful, Try later");
  }


  return (
    <Container component="main" maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
              { isSignup && <Input name="confirmPassword" label="Rewrite Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
            render={(renderProps) => (
              <Button 
              className={classes.googleButton} 
              color='primary' 
              fullWidth 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} 
              variant="contained" 
              startIcon={<Icon /> }>
                Google Sign In
              </Button>

            )}
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container>
            <Grid item >
                <Button onClick={switchMode}>
                  {isSignup ? "Already has account?" : "No Account? Sign up"}
                </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth