import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as CONFIG from '../config.json';
import { useHistory, Redirect } from 'react-router-dom';
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
      await wait(500);
      const result = await fetch(`http://localhost:${CONFIG.BACKEND_PORT}/play/${playerid}/status`, para);
      if (result.status === 200) {
        // console.log('yes');
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
