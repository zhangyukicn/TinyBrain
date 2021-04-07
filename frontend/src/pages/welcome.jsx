import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as CONFIG from '../config.json';
import { useHistory } from 'react-router-dom';
import Copyright from '../components/copyRight';
import TokenContext from '../TokenContext';

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

function welcome () {
    // const { token } = useContext(TokenContext);
    const classes = useStyles();
    const history = useHistory();

    const goToLogIn = () => {
        history.push('../login');
    }

    const goToPlay = () => {
        history.push('../playerdashboard');
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
            Welcome to TinyBrain
            </Typography>
            <Typography component="h1" variant="h5">
            Please choose to login or play game
            </Typography>
            <form className={classes.form} noValidate>
            <Button
                onClick={goToLogIn}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Log In
            </Button>
            <Button
                onClick={goToPlay}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Play Game
            </Button>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}

export default welcome;
