import React from 'react';
import '../App.css';
import Playnavbar from '../components/playernavbar';
import { GotQuestion, PutAnswer, GotCorrectAnswer } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import * as CONFIG from '../config.json';
import { useHistory, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Copyright from '../components/copyRight';

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

function AnswerDispay () {
    let answer;
    let points = 0;
    const classes = useStyles();
    const history = useHistory();
    const playerid = localStorage.getItem('playerid');
    const emptyImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU';
    const [QuizInform, setInfo] = React.useState(0);
    // const [QuizAnsInform, setAnsweInfo] = React.useState(0);

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
            history.push('./playerresult');
            history.go(0);
        }
    }

    const fetchQuestion = () => {
        GotQuestion(playerid).then(
            result => {
                console.log(result);
                setInfo(result);
            })
    }

    const idxToOption = (idx) => {
        return String.fromCharCode(65 + idx);
    }

    React.useEffect(() => { fetchQuestion(); }, []);
    // React.useEffect(() => { fetchAnswer(); }, []);

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
        // console.log(checkbox);
        // let info = 0;

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

    let time;
    let count;
    async function refreshPage () {
        while (true) {
            time = QuizInform ? (QuizInform.question.time) : null;
            if (time !== null) {
                count = parseInt(QuizInform.question.time * 1000);
                await wait(count);
                // console.log(count);
                fetchQuestion();
                // console.log(flag);
                if (flag === 0) {
                    break;
                }
            } else {
                await wait(1000);
                fetchQuestion();
            }
        }
    }

    refreshPage();

    return (
        <div>
            <Playnavbar />
            <Grid container spacing={0}>
                <Grid item xs >
                    <Card className={classes.heroContent}>
                        <CardContent className={classes.cardContent}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={QuizInform ? (QuizInform.question.img ? QuizInform.question.img : emptyImg) : emptyImg}
                            />
                            {/* <div id='time'>
                                {QuizInform ? (QuizInform.question.time ? `Time remaining ${QuizInform.question.time}` : null) : null}
                            </div> */}
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
export default AnswerDispay;
