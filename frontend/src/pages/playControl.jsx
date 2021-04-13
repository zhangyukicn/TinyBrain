import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Copyright from '../components/copyRight';
import Nav from '../components/playNav';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { getQuizInfo, getQuizQuestions, stopSession, getSessionInfo, advanceSession } from '../api';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 200,
        width: 200,
        margin: 'auto',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
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
/*
开始了之后，重新再去get这个quiz的信息，active那里就会出现6位数的session number
这个游戏被停掉之后，active 就会重新置为null
然后之前的session number 被推到old session里面 这个可以用来fetch history
刚开始的时候 position == -1
查状态返回值
{
  "results": {
    "active": true,
    "answerAvailable": false,
    "isoTimeLastQuestionStarted": "2021-04-12T07:43:43.482Z",
    "position": 0,
    "questions":[]
}
advance 之后, position 到 0
返回值为
  "results": {
    "active": true,
    "answerAvailable": false,
    "isoTimeLastQuestionStarted": "2021-04-12T07:43:43.482Z",
    "position": 0,
    "questions": [
      {"id": 1},
      {"id": 2}],
    "players": []
}
advance 直至没有问题了
position 就是第几个问题
*/
export default function Playcontrol () {
    const classes = useStyles();
    const history = useHistory();
    const token = localStorage.getItem('token');
    const quizId = localStorage.getItem('quiz_id');
    const sessionId = localStorage.getItem('sessionId');
    const [sessionInfo, setSessionInfo] = React.useState(0);
    const [quizInfo, setQuizInfo] = React.useState(0);
    const emptyImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU';
    const fetchSessionInfo = () => {
        getSessionInfo(token, sessionId).then(data => {
            setSessionInfo(data);
        });
    }
    const fetchQuizInfo = () => {
        getQuizInfo(token, quizId).then(data => {
            setQuizInfo(data);
        });
    }
    React.useEffect(() => { fetchSessionInfo(); }, []);
    React.useEffect(() => { fetchQuizInfo(); }, []);
    console.log(sessionInfo);
    console.log(quizInfo);
    // console.log(sessionInfo.results.position);

    const proceedSession = () => {
        advanceSession(token, quizId);
        alert('Proceed!');
        fetchSessionInfo();
    }
    const quitSession = () => {
        stopSession(token, quizId);
        alert('Game abort');
        localStorage.setItem('active', 0);
        history.push('/dashBoard');
    }
    const idxToOption = (idx) => {
        return String.fromCharCode(65 + idx);
    }

    return (
        <div>
            <Nav />
            <Grid container spacing={4}>
                {/* control panel */}
                <Grid item>
                    <Card>
                        <CardMedia
                            className={classes.cardMedia}
                            image={quizInfo ? quizInfo.thumbnail : emptyImg}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {`Quiz: ${quizInfo.name}`}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                            {`session ID: ${quizInfo.active}`}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                            {sessionInfo.results ? (sessionInfo.results.position === -1 ? 'Session Not Started Yet' : `Question: ${sessionInfo.results.position + 1}`) : null}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container spacing={10} justify="center" alignContent="center" >
                                <Box m={5}>
                                <Button size="small" color="primary" variant="contained" p={2} onClick={proceedSession}>
                                Proceed
                                </Button>
                                <Button size="small" color="primary" p={2} onClick={quitSession}>
                                Quit
                                </Button>
                                </Box>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
                {/* questions */}
                <Grid item xs>
                    <Card>
                        <CardContent className={classes.cardContent}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={sessionInfo ? (sessionInfo.results.position === -1 ? emptyImg : (sessionInfo.results.questions[sessionInfo.results.position].img ? sessionInfo.results.questions[sessionInfo.results.position].img : emptyImg)) : emptyImg}
                            />
                            {sessionInfo
                            ? (sessionInfo.results.position === -1
                                ? (<Typography gutterBottom variant="h5" component="h2">
                                        {'Session not started yet'}
                                    </Typography>)
                                    : sessionInfo.results.questions[sessionInfo.results.position].options.map((option, index) =>
                                        (<Typography gutterBottom key={sessionId + index} variant="h5" component="h2">
                                            {`${idxToOption(index)}: ${option.txt}`}
                                        </Typography>)))
                                : null}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Copyright />
        </div>
    );
}
