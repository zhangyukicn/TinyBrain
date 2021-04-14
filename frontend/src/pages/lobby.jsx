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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../App.css';
import Playnavbar from '../components/playernavbar';

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

function LobbyDispay () {
  const classes = useStyles();
  const history = useHistory();
  const playerid = localStorage.getItem('playerid');

  async function wait (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async function asyncWhile () {
    const para = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    while (true) {
      const result = await fetch(`http://localhost:${CONFIG.BACKEND_PORT}/play/${playerid}/status`, para);
      await wait(500);
      if (result.status === 200) {
        console.log('yes');
        const data = await result.json();
        if (data.started === true) {
          history.push('./playing');
          break;
        }
      }
    }
  }

asyncWhile();

return (
  <div>
    <Playnavbar />
    <div className="App-header">
      <h1>Waiting for game beginning!</h1>
    </div>
  </div>
);
}

export default LobbyDispay;
