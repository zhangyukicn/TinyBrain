import { React, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Redirect } from 'react-router-dom';
import Copyright from '../components/copyRight';
import TokenContext from '../TokenContext';
import * as CONFIG from '../config.json';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LogIn () {
    // const { token } = useContext(TokenContext);
    const classes = useStyles();
    const history = useHistory();

    // validate email
    const checkEmail = () => {
        const patt = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        const emailField = document.getElementById('login_email');
        if (!patt.test(emailField.value)) {
            emailField.style.backgroundColor = 'rgba(120, 100, 240, 0.6)';
            return false;
        } else {
            emailField.style.backgroundColor = '';
            return true;
        }
    }

    // validate password
    const checkPassword = () => {
        const passwordField = document.getElementById('login_password');
        if (passwordField.value === '') {
            passwordField.style.backgroundColor = 'rgba(120, 100, 240, 0.6)';
            return false;
        } else {
            passwordField.style.backgroundColor = '';
            return true;
        }
    }

    const submitLogIn = (event) => {
        event.preventDefault(); // 先莫动
        const emailVal = document.getElementById('login_email').value;
        const passwordVal = document.getElementById('login_password').value;
        if (!checkEmail(emailVal) || !checkPassword(passwordVal)) {
            alert('please double check your input');
            return false;
        }

        const para = {
            method: 'POST',
            body: JSON.stringify({
                email: emailVal,
                password: passwordVal
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(`http://localhost:${CONFIG.BACKEND_PORT}/admin/auth/login`, para).then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                // save token here
                localStorage.setItem('token', res.token);
                console.log(localStorage.getItem('token'));
                history.push('./dashBoard');
                // alert('login!!');
                })
            } else {
                res.json().then(res => {
                    console.log(res.error);
                    alert(res.error);
                    return false;
                })
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Log In
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                onChange={checkEmail}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login_email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="login_password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                onClick={submitLogIn}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Log In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="./" variant="body2">
                    Back
                </Link>
                </Grid>
                <Grid item>
                <Link href="./signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}

export default LogIn;
