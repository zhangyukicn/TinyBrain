import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom';
import TokenContext from './TokenContext';
import Welcome from './pages/welcome';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import PlayerDashboard from './pages/playerdashboard';
import Lobby from './pages/lobby';
import Edit from './pages/editQuiz';
import EditQuestion from './pages/editQuestion';
import Playcontrol from './pages/playControl';
import PlayResult from './pages/playResult';
import PlayerplayingDashborad from './pages/playerplayingDashborad';
import Playerresult from './pages/playerresult';

// yarn add @material-ui/icons
// yarn add @material-ui/core
// yarn add react-router-dom

// 页面4： dashboard
// 页面5： library
// 页面6： view game
// 页面7： edit game
// 页面8： play game
// 页面9： game result

// 页面10： join game
// 页面11： myresult

/* <TokenContext.Provider value={{ token, setToken }}>
            <Router>
            {token ? null : <Redirect to='./login'/>}
            <Switch>
                <Route path="./login" component={Login} setToken={setToken} token={token} />
                <Route path="./signup" component={Signup} setToken={setToken} token={token} />
                <Route path="./dashboard" component={Dashboard} setToken={setToken} token={token} />
            </Switch>
            </Router>
        </TokenContext.Provider> */

function App () {
    const tokenStored = localStorage.getItem('token');
    const active = localStorage.getItem('active');
    const [token, setToken] = React.useState(tokenStored !== null ? tokenStored : '');
    // useState这个函数接收的参数是状态的初始值(Initial state)
    // 它返回一个数组，这个数组的第0位是当前的状态值，第1位是可以改变状态值的方法函数。
    React.useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]); // change when token changed
    console.log(token);
    console.log(active);
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <TokenContext.Provider value={{ token, setToken }}>
                {/* 检查有否token，没有就进欢迎页面 */}
                {active ? null : (token ? <Redirect to='/dashboard'/> : <Redirect to='/'/>)}
                <Switch>
                {/* 必须用exact path 否则匹配到/就不往下匹配了 */}
                <Route exact path="/" component={Welcome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/playerdashboard" component={PlayerDashboard} />
                <Route exact path="/edit/:gameId" component={Edit} />
                <Route exact path="/edit/:gameId/:questionId" component={EditQuestion} />
                <Route exact path="/play/:session" component={Playcontrol} />
                <Route exact path="/play/:session/result" component={PlayResult} />
                <Route exact path="/lobby" component={Lobby} />
                <Route exact path="/playing" component={PlayerplayingDashborad} />
                <Route exact path="/playerresult" component={Playerresult} />
                </Switch>
            </TokenContext.Provider>
        </Router>
    );
}

export default App;
