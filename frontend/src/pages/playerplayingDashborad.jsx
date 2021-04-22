import React from 'react';
import '../App.css';
import Playnavbar from '../components/playernavbar';
import { GotQuestion, PutAnswer, GotCorrectAnswer } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import * as CONFIG from '../config.json';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Copyright from '../components/copyRight';
// import Countdown from '../components/Countdown';

let flag = 1;

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

// 倒计时为0时，页面刷新去fetch新的question:

export default function AnswerDispay (props) {
    // console.log('hello');
    const location = useLocation();
    const playerid = location.state.id;
    let answer;
    let points = 0;
    const classes = useStyles();
    const history = useHistory();
    const emptyImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU';
    const [QuizInform, setInfo] = React.useState(0);
    const [AnsewerInform, setAnswerInfo] = React.useState(0);
    const [isNewTime, setIsNewTime] = React.useState('');

    // 倒计时
    const seconds = 0;
    const rightAnswer = 0;
    let timerID;
    const [Correct, setAnswer] = React.useState({
        rightAnswer: parseInt(0)
    });

    async function wait (ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    const GotQuestion = async (playerid) => {
        const res = await fetch(`http://localhost:${CONFIG.BACKEND_PORT}/play/${playerid}/question`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            console.log(res);
            flag = 0;
            history.push({ pathname: './playerresult', state: { id: playerid } });
            history.go(0);
        }
    }

    const [time, setTime] = React.useState({
        seconds: parseInt(seconds)
    });

    const fetchQuestion = () => {
        GotQuestion(playerid).then(
            result => {
                if (result.question.isoTimeLastQuestionStarted !== isNewTime) {
                    clearInterval(timerID);
                    setInfo(result)
                    setIsNewTime(result.question.isoTimeLastQuestionStarted);
                }
            }
            )
    }

    const timesecond = () => {
        if (QuizInform) {
            if (QuizInform.question.time) {
                console.log(QuizInform.question.time);
                return setTime(QuizInform.question.time);
            }
        }
    }

    const fetchAnswer = () => {
        GotCorrectAnswer(playerid).then(
                result => {
                    console.log(result);
                    setAnswerInfo(result);
                })
        }
    React.useEffect(() => { fetchAnswer(); }, []);

    const correctanswershows = () => {
        if (AnsewerInform) {
            console.log(AnsewerInform);
            return setAnswer(AnsewerInform.answerIds);
            }
        }

    const [over, setOver] = React.useState(false);

    const tick = () => {
        // 暂停，或已结束
        if (over) {
            return setAnswer({
                rightAnswer: Correct.rightAnswer
            });
        }
        if (time.seconds === 0) {
            setOver(true);
        } else {
            setTime({
                seconds: time.seconds - 1
            });
        }
    };

    React.useEffect(() => {
        // 执行定时
        timerID = setInterval(() => tick(), 1000);
        // 卸载组件时进行清理
        // return () => {};
        return () => clearInterval(timerID);
    });

    // count down

    const idxToOption = (idx) => {
        return String.fromCharCode(65 + idx);
    }

    const RecordPoints = () => {
        const resAnswer = [];
        if (QuizInform.question) {
            const res = QuizInform.question.point;
            const resans = QuizInform.question.ans;
            resAnswer.push({ res: resans, point: res });
        }
        console.log(resAnswer);
        return resAnswer;
    }

    const Clickfunction = (event) => {
        const checkbox = document.querySelectorAll("input[type='checkbox']");
        const feature = [];
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked === true) {
                feature.push(i);
            }
        }
        console.log(feature);
        const result = fetch(`http://localhost:${CONFIG.BACKEND_PORT}/play/${playerid}/answer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answerIds: feature
            }),
        }).then(
            result => {
                if (result.status === 200) {
                    console.log(result);
                    const Points = RecordPoints();
                    // console.log(Points[0].res);
                    // console.log(feature);
                    if (feature === Points[0].res) {
                        console.log('yes');
                        points = points + Points[0].point;
                        console.log(points);
                    }
                    alert('Success');
                } else if (result.status === 400) {
                    alert('Time Out');
                    history.go(0);
                }
            }
        )
    }

    React.useEffect(() => {
        // 执行定时
        const AB = setInterval(() => fetchQuestion(), 1000);
        // 卸载组件时进行清理
        return () => clearInterval(AB);
    });

    return (
        <div>
            <Playnavbar />
            {/* <Countdown /> */}
            <Grid container spacing={0}>
                <Grid item xs >
                    <Card className={classes.heroContent}>
                        <CardContent className={classes.cardContent}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={QuizInform ? (QuizInform.question.img ? QuizInform.question.img : emptyImg) : emptyImg}
                            />
                            <div id='time'>
                                {QuizInform ? (QuizInform.question.time ? `Total Time ${QuizInform.question.time}` : null) : null}
                            </div>
                            <p>{`Time Left: ${time.seconds}s`}</p>
                            <div>{over ? `"Time's up!" and the answer is ${idxToOption(Correct.rightAnswer)} ` : ''}</div>
                            <div className="title-part">
                                <Typography gutterBottom variant="h4" component="h2">
                                    {QuizInform ? (QuizInform.question.content ? `Question ${QuizInform.question.id}: ${QuizInform.question.content}` : `${QuizInform.question.content}`) : null}
                                </Typography>
                            </div>
                            <div>
                                {/* {QuizInform ? (QuizInform.question.options ? 'True' : 'False') : null} */}
                                {QuizInform ? (QuizInform.question.options ? (QuizInform.question.options.map((option, index) => (<div key={index} className='pic-part'> <label>{`${idxToOption(index)}: ${option.txt}`}<input id={index} type="checkbox" value={`${idxToOption(index)}: ${option.txt}`} /></label></div>))) : null) : null}
                            </div>
                            <button className="pressbutton" onClick={Clickfunction}>
                                Submit
                            </button>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
            <Copyright />

        </div>
    );
}
