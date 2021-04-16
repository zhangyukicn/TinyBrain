import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { putQuiz } from '../api';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Title from './titles';

const useStyles = makeStyles((theme) => ({
    dateTag: {
        flex: 5,
    },
    bigInput: {
        flex: 9,
        width: '100%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    buttons: {
        flex: 5
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    smallInput: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '35%'
    },
}));
/*
{
    "id": 1,
    "type": "m",
    "content": "are you shabi?",
    "point": 10,
    "img": null,
    "options": [
    {
        "id": 1,
        "content": "Yes"
    },
    {
        "id": 2,
        "content": "No, you are"
    }
    ],
    "ans": 1,
    "time": 10
}
*/

export default function QuizCardInEdit (quizInfo) {
    const classes = useStyles();
    const history = useHistory();
    const id = localStorage.getItem('quiz_id');
    const questionId = localStorage.getItem('questionId');
    const questionIndex = localStorage.getItem('questionIndex');
    const token = localStorage.getItem('token');
    // console.log(quizInfo);
    const intInArray = (int, array) => {
        for (let i = 0; i < array.length; ++i) {
            if (array[i] === int) {
                return true;
            }
        }
        return false;
    }
    const intArrayTostr = (array) => {
        if (array) {
            const tmp = array.map(a => { return String.fromCharCode(65 + a) });
            return [].concat(tmp);
        }
    }
    const getMax = (array) => {
        let res = 0;
        for (let i = 0; i < array.length; ++i) {
            if (array[i] > res) {
                res = array[i];
            }
        }
        return res;
    }
    const parseAnswers = (str) => {
        const res = [];
        for (let i = 0; i < str.length; ++i) {
            if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 70 && !intInArray(str.charCodeAt(i) - 65, res)) {
                // console.log(str.charCodeAt(i));
                res.push(str.charCodeAt(i) - 65);
            }
        }
        return res;
    }
    const updateQuestion = () => {
        const questionContent = document.getElementById('questionContent').value;
        const answer = document.getElementById('answer').value;
        const timeLimit = document.getElementById('timeLimit').value;
        const point = document.getElementById('point').value;
        const pattNum = /^[+]{0,1}(\d+)$/;
        if (questionContent) {
            quizInfo.info.questions[questionIndex].content = questionContent;
        }
        if (answer) {
            const patt = /(^[A-F]{1}(\s*,\s*[A-F]{1}\s*)*$)/;
            if (!patt.test(answer)) {
                alert('Invalid answer input format. Correct format example: A or A, B, C');
                return false;
            }
            if (getMax(parseAnswers(answer)) > quizInfo.info.questions[questionIndex].options.length - 1) {
                alert('Invalid answer input, Please check if there are sufficient options');
                return false;
            }
            quizInfo.info.questions[questionIndex].ans = parseAnswers(answer);
        }
        if (timeLimit) {
            if (!pattNum.test(timeLimit)) {
                alert('time limit should be a postive integer');
                return false;
            }
            quizInfo.info.questions[questionIndex].time = parseInt(timeLimit);
        }
        if (point) {
            if (!pattNum.test(point)) {
                alert('Points should be a postive integer');
                return false;
            }
            quizInfo.info.questions[questionIndex].point = parseInt(point);
        }
        const quizJSONString = JSON.stringify(quizInfo.info);
        // console.log(quizJSONString);
        putQuiz(token, id, quizJSONString).then((data) => {
            history.push(`/edit/${id}/${questionId}`);
        })
    }
    return (
        <React.Fragment>
        <Grid container spacing={1} direction='column' justify="space-evenly" alignContent="center" >
            <Box mx="auto">
            <Title component="p" variant="h4">
                {`Quiz: ${quizInfo.info.name}, Question: ${parseInt(questionIndex) + 1}`}
            </Title>
            </Box>
            <TextField
                variant="standard"
                label={quizInfo.info ? `Question: ${quizInfo.info.questions[questionIndex].content}` : 'Question content' }
                id="questionContent"
                className={classes.bigInput}
                item='true'
            />
            <TextField
                variant="standard"
                label={quizInfo.info ? `Answer: ${intArrayTostr(quizInfo.info.questions[questionIndex].ans)} (format: A or A,B)` : 'Answer: null, format: A or A,B' }
                className={classes.bigInput}
                id="answer"
                item='true'
            />
            <Grid container spacing={1} justify="space-evenly" alignContent="center" >
                <TextField
                    variant="standard"
                    label={quizInfo.info ? `Time limit: ${quizInfo.info.questions[questionIndex].time}` : 'Time limit: 0' }
                    className={classes.smallInput}
                    size="small"
                    id="timeLimit"
                />
                <TextField
                    variant="standard"
                    label={quizInfo.info ? `Points: ${quizInfo.info.questions[questionIndex].point}` : 'Points: 0' }
                    className={classes.smallInput}
                    size="small"
                    id="point"
                />
            </Grid>
            <Box m={2} mx="auto">
                <Button size="small" color="primary" variant="contained" onClick={updateQuestion} >
                Submit All
                </Button>
            </Box>
        </Grid>
        </React.Fragment>
    );
}
