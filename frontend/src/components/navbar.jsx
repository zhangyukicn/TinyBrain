import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { LogOut } from '../api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar () {
    const classes = useStyles();
    const history = useHistory();

    const token = localStorage.getItem('token');

    const navLogOut = (event) => {
        event.preventDefault();
        console.log(token);
        LogOut(token).then(res => {
            localStorage.removeItem('token');
            history.push('./');
        });
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
                TinyBrain
            </Typography>
            <Button color="inherit" onClick={() => history.push('./dashboard')}>Home</Button>
            <Button color="inherit" onClick={navLogOut}>LogOut</Button>
            </Toolbar>
        </AppBar>
        </div>
    );
}
