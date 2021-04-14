import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Copyright from '../components/copyRight';
import Nav from '../components/navbar';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { getQuizInfo, getSessionResult, getSessionInfo } from '../api';

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
    fixedHeight: {
        height: 500
    }
}));
export default function Playcontrol () {
    const classes = useStyles();
    const history = useHistory();
    const token = localStorage.getItem('token');
    const quizId = localStorage.getItem('quiz_id');
    const sessionId = localStorage.getItem('sessionId');
    const emptyImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU';

    const [sessionInfo, setSessionInfo] = React.useState(0);
    const [quizInfo, setQuizInfo] = React.useState(0);
    const [sessionRes, setSessionRes] = React.useState(0);

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
    const fetchSessionResult = () => {
        getSessionResult(token, sessionId).then(data => {
            setSessionRes(data);
            console.log(data);
        })
    }

    React.useEffect(() => { fetchSessionInfo(); }, []);
    React.useEffect(() => { fetchQuizInfo(); }, []);
    React.useEffect(() => { fetchSessionResult(); }, []);

    const idxToOption = (idx) => {
        return String.fromCharCode(65 + idx);
    }
    return (
        <div>
            <Nav />
            <Grid container spacing={0}>
                {/* control panel */}
                <Grid item >
                    <Card className={classes.fixedHeight}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={quizInfo ? quizInfo.thumbnail : emptyImg}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {`Quiz: ${quizInfo.name}`}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                {`session ID: ${sessionId}`}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* questions */}
                <Grid item xs >
                    <Card className={classes.fixedHeight}>
                        <CardContent className={classes.cardContent}>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Copyright />
        </div>
    );
}
