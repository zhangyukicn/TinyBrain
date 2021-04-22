import React, { useState } from 'react';
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
    const classes = useStyles();
    const history = useHistory();
    const emptyImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU';
    const [QuizInform, setInfo] = React.useState(0);
    const [AnsewerInform, setAnswerInfo] = React.useState('');
    const [isNewTime, setIsNewTime] = React.useState('');
    const [isLoading, setLoaing] = useState(false);
    const [myPoint, setPoint] = useState(0);
    const [Quizanswer, setQuizAnswerInfo] = React.useState('');
    const [Submitanswer, setSubmitAnswerInfo] = React.useState('');

    // 倒计时
    let timerID, questionID, AnsewerId;
    let Point = 0;
    // const [Correct, setAnswer] = React.useState({
    //     rightAnswer: parseInt(0)
    // });

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
            history.push({ pathname: './playerresult', state: { id: playerid, point: Submitanswer } });
            history.go(0);
        }
    }

    const [time, setTime] = React.useState(0);

    const fetchQuestion = async () => {
        const res = await GotQuestion(playerid)
        if (typeof (res.question) !== 'undefined') {
            if (res.question.isoTimeLastQuestionStarted !== isNewTime) {
                clearInterval(questionID);
                console.log(res);
                clearInterval(timerID);
                await setOver(false);
                await setInfo(res);
                await setIsNewTime(res.question.isoTimeLastQuestionStarted);
                await setTime(res.question.time);
                console.log('hello' + res.question.time);
                await setLoaing(true);
                await setPoint(res.question.point);
                await setQuizAnswerInfo(res.question.ans);
            }
        } else {
            alert(res);
        }
    }

    const fetchAnswer = async () => {
        const res = await GotCorrectAnswer(playerid);
        if (typeof (res) !== 'undefined') {
            await setAnswerInfo(res.answerIds);
            console.log(res.answerIds);
        } else {
            alert(res);
        }
    }

    const [over, setOver] = React.useState(false);

    const tick = () => {
        // 暂停，或已结束
        if (over) {
            return AnsewerInform;
        }
        if (time === 0) {
            setOver(true);
            fetchAnswer();
        } else {
            setTime(time - 1);
            questionID = setInterval(() => fetchQuestion(), 1000);
        }
    };

    React.useEffect(() => {
        // 执行定时
        timerID = setInterval(() => tick(), 1000);
        // 卸载组件时进行清理
        // return () => {};
        return () => clearInterval(timerID, questionID);
    });

    // count down

    const idxToOption = (idx) => {
        // console.log(idx);
        return String.fromCharCode(65 + idx);
    }

    const showACII = (lis) => {
        const number = []
        for (let i = 0; i < lis.length; i++) {
            number.push(idxToOption(lis[i]));
        }
        return number;
    }

    const equar = (a, b) => {
        // 判断数组的长度
        if (a.length !== b.length) {
            return false
        } else {
            // 循环遍历数组的值进行比较
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false
                }
            }
            return true;
        }
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
                    console.log(feature);
                    console.log(Quizanswer);
                    alert('Success');
                    if (equar(feature, Quizanswer)) {
                        Point = Point + myPoint;
                        setSubmitAnswerInfo(Point + myPoint);
                    }
                } else if (result.status === 400) {
                    alert('Time Out');
                    history.go(0);
                }
            }
        )
    }

    React.useEffect(() => {
        fetchQuestion();
    }, []);

    if (!isLoading) {
        return null
    } else {
        return (
            <div>
                <Playnavbar />
                {/* <Countdown /> */}
                <Grid container spacing={0}>
                    <Grid item xs >
                        <Card className={classes.heroContent}>
                            <CardContent className={classes.cardContent}>
                                {/* <div id='time'> */}
                                    {QuizInform ? (QuizInform.question.time ? `Total Time ${QuizInform.question.time}s` : null) : null}
                                {/* </div> */}
                                <p>{`Time Left: ${time}s`}</p>
                                <div>{over ? `"Time's up!" and the answer is ${showACII(AnsewerInform)} ` : ''}</div>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={QuizInform ? (QuizInform.question.img ? QuizInform.question.img : emptyImg) : emptyImg}
                                />
                                <div className="title-part">
                                    <Typography gutterBottom variant="h4" component="h2">
                                        {QuizInform ? (QuizInform.question.content ? `Question ${QuizInform.question.id}: ${QuizInform.question.content}` : `${QuizInform.question.content}`) : null}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {QuizInform ? (QuizInform.question.ans ? (QuizInform.question.ans.length > 1 ? 'multiple choice' : 'single choice') : null) : null}
                                    </Typography>
                                </div>
                                <div>
                                <Typography gutterBottom variant="h4" component="h2">
                                    {QuizInform ? (QuizInform.question.options ? (QuizInform.question.options.map((option, index) => (<div key={index} className='pic-part'> <label>{`${idxToOption(index)}: ${option.txt}`}<input id={index} type="checkbox" value={`${idxToOption(index)}: ${option.txt}`} /></label></div>))) : null) : null}
                                    </Typography>
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
}
