import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/copyRight';
import * as CONFIG from '../config.json';
import { useHistory, Redirect } from 'react-router-dom';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { PlayerFetchSession } from '../api';

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

function Playerdispay () {
    const classes = useStyles();
    const history = useHistory();

    const toLogin = (event) => {
        event.preventDefault(); // 先莫动
        history.push('./login');
    }

    const checkgamepin = (Gamepin) => {
        if (Gamepin.length === 6) {
            return true;
        } else {
            alert('Wrong length!!');
        }
    }

    // async function PlayerFetchSession (sessionid) {
    //     const r = await fetch('/play/join/{sessionid}')
    // }

    const Gobutton = (event) => {
        event.preventDefault();
        const Gamepin = document.getElementById('gamepin').value;
        const Name = document.getElementById('NAME').value;

        if (checkgamepin(Gamepin) === true) {
            alert('yes');
            const para = {
                method: 'POST',
                body: JSON.stringify({
                    name: Name
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            fetch(`http://localhost:${CONFIG.BACKEND_PORT}/play/join/${Gamepin}`, para).then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                    // save token here
                    // console.log(res);
                    localStorage.setItem('playerid', res.playerId);
                    console.log(localStorage.getItem('playerid'));
                    history.push('./lobby');
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
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <SportsEsportsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Join a room!!
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="gamepin"
                label="GAMEPIN"
                name="gamepin"
                autoComplete="gamepin"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="NAME"
                label="NAME"
                type="NAME"
                id="NAME"
                autoComplete="current-password"
            />
            <Button
                onClick ={Gobutton}
                id = "gobutton"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Let‘s Go
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="./" variant="body2">
                    Back
                </Link>
                </Grid>
                <Grid item>
                <Link variant="body2" onClick={toLogin}>
                    {'You wanna create a game? Login'}
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

export default Playerdispay;
