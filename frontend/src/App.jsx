import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import TokenContext from './TokenContext';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';

// yarn add @material-ui/icons

// 页面2： log in
// 页面3： sign up
// 页面4： dashboard
// 页面5： library
// 页面6： view game
// 页面7： edit game
// 页面8： play game
// 页面9： game result

// 页面10： join game
// 页面11： myresult

/*
<Router>
      <TokenContext.Provider value={{ token, setToken }}>
        {token ? null : <Redirect to='./login'/>}
        <Switch>
          <Route path="./login">
            <Login setToken={setToken} token={token} />
          </Route>
          <Route path="./signup">
            <Signup setToken={setToken} token={token} />
          </Route>
        </Switch>
      </TokenContext.Provider>
    </Router>
*/

function App () {
    const tokenStored = localStorage.getItem('token');
    const [token, setToken] = React.useState(tokenStored !== null ? tokenStored : '');
    // useState这个函数接收的参数是状态的初始值(Initial state)
    // 它返回一个数组，这个数组的第0位是当前的状态值，第1位是可以改变状态值的方法函数。
    React.useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]); // change when token changed

    if (tokenStored) {
        return (
            <Switch>
                <Route path="./login">
                    <Login setToken={setToken} token={token} />
                </Route>
                <Route path="./signup">
                    <Signup setToken={setToken} token={token} />
                </Route>
            </Switch>
        );
    } else {
        return (
            <Login path="./login" setToken={setToken} token={token} />
        );
    }
}

export default App;
