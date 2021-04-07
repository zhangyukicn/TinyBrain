import { React } from 'react';
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
import Copyright from '../components/copyRight';
import * as CONFIG from '../config.json';
import { useHistory, Redirect } from 'react-router-dom';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp () {
    const classes = useStyles();
    const history = useHistory();

    const checkName = () => {
        const nameField = document.getElementById('signup_name');
        if (nameField.value === '') {
            nameField.style.backgroundColor = 'rgba(120, 100, 240, 0.6)';
            return false;
        } else {
            nameField.style.backgroundColor = '';
            return true;
        }
    }

    const checkEmail = () => {
        const emailField = document.getElementById('signup_email');
        const patt = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        if (!patt.test(emailField.value)) {
            emailField.style.backgroundColor = 'rgba(120, 100, 240, 0.6)';
            return false;
        } else {
            emailField.style.backgroundColor = '';
            return true;
        }
    }

    const checkPassword = () => {
        const passwordField = document.getElementById('signup_password');
        if (passwordField.value === '') {
            passwordField.style.backgroundColor = 'rgba(120, 100, 240, 0.6)';
            return false;
        } else {
            passwordField.style.backgroundColor = '';
            return true;
        }
    }

    const submitSignUp = (event) => {
        event.preventDefault();
        const nameVal = document.getElementById('signup_name').value;
        const emailVal = document.getElementById('signup_email').value;
        const passwordVal = document.getElementById('signup_password').value;
        if (!checkName() || !checkEmail() || !checkPassword()) {
            alert('Required information not complete.');
            return false;
        }
        const para = {
            method: 'POST',
            body: JSON.stringify({
                email: emailVal,
                password: passwordVal,
                name: nameVal,
            }),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://localhost:${CONFIG.BACKEND_PORT}/admin/auth/register`, para).then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                // save token here
                localStorage.setItem('token', res.token);
                // console.log(token);
                history.push('./dashBoard');
                alert('sign up successful!');
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

    const toLogIn = (event) => {
        event.preventDefault(); // 先莫动
        history.push('./login');
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                <TextField
                    onChange={checkName}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="signup_name"
                    label="Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    onChange={checkEmail}
                    variant="outlined"
                    required
                    fullWidth
                    id="signup_email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    onChange={checkPassword}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="signup_password"
                    autoComplete="current-password"
                />
                </Grid>
            </Grid>
            <Button
                onClick={submitSignUp}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link variant="body2" onClick={toLogIn}>
                    Already have an account? Log in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
        </Container>
    );
}
