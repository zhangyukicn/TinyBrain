import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './titles';
import Link from '@material-ui/core/Link';
import { getSessionResult, getSessionInfo } from '../api';

// Generate Order Data
function createData (id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault (event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

function Rows (info) {
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const sessionId = info.info;
    console.log(sessionId);
    const [sessionRes, setSessionRes] = React.useState(0);
    const [sessionInfo, setSessionInfo] = React.useState(0);
    const fetchSessionResult = () => {
        getSessionResult(token, sessionId).then(data => {
            setSessionRes(data);
            console.log(data);
        })
    }
    const fetchSessionInfo = () => {
        getSessionInfo(token, sessionId).then(data => {
            setSessionInfo(data);
        });
    }
    const getResEachQuestion = () => {
        let res = 0;
        if (sessionRes.results && sessionInfo.results) {
            for (let i = 0; i < sessionRes.results.length; ++i) {
                for (let j = 0; j < sessionRes.results[i].answers.length; ++j) {
                    if (sessionRes.results[i].answers[j].correct) {
                        res += 1;
                    }
                }
            }
            res = res / (sessionRes.results.length * sessionInfo.results.questions.length);
        }
        return res;
    }
    React.useEffect(() => { fetchSessionResult(); }, []);
    React.useEffect(() => { fetchSessionInfo(); }, []);
    console.log(sessionRes);
    console.log(sessionInfo);
    return (
        <TableRow key={info.info} onClick={() => { window.open(`/play/${sessionId}/result`); }} hover>
        <TableCell>{`${sessionId}`}</TableCell>
        <TableCell>{`${sessionRes.results ? sessionRes.results.length : null}`}</TableCell>
        <TableCell align="right">{getResEachQuestion() ? `${getResEachQuestion() * 100}%` : '0%'}</TableCell>
        </TableRow>
    );
}
export default function History (info) {
    return (
        <React.Fragment>
        <Title>History Sessions</Title>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Session ID</TableCell>
                <TableCell>Number of Players</TableCell>
                <TableCell align="right">Correctness</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {info.info ? info.info.oldSessions.map((sessionId) => (<Rows key={sessionId} info={sessionId}/>)) : null}
            </TableBody>
        </Table>
        </React.Fragment>
    );
}
