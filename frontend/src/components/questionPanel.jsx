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
    console.log(quizInfo);
    const updateQuestion = () => {
        const questionContent = document.getElementById('questionContent').value;
        const answer = document.getElementById('answer').value;
        const timeLimit = document.getElementById('timeLimit').value;
        const point = document.getElementById('point').value;
        if (questionContent) {
            quizInfo.info.questions[questionIndex].content = questionContent;
        }
        if (answer) {
            quizInfo.info.questions[questionIndex].ans = answer;
        }
        if (timeLimit) {
            quizInfo.info.questions[questionIndex].time = timeLimit;
        }
        if (point) {
            quizInfo.info.questions[questionIndex].point = point;
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
                label={quizInfo.info ? `Answer: ${quizInfo.info.questions[questionIndex].ans}` : 'Answer: null' }
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
