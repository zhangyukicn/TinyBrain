import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { putQuiz } from '../api';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

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
        // 更新quiz时，要把整个quiz info stringfy 之后再传回去，api接受的就是个string
        quizInfo.info.name = questionContent;
        const quizJSONString = JSON.stringify(quizInfo.info);
        // console.log(quizJSONString);
        putQuiz(token, id, quizJSONString).then((data) => {
            history.push(`./${id}`);
        })
    }
    return (
        <React.Fragment>
        <Grid container spacing={0.5} direction='column' justify="space-evenly" alignContent="center" >
            <TextField
                variant="standard"
                label={quizInfo.info ? `Question: ${quizInfo.info.questions[questionIndex].content}` : 'Question content' }
                id="questionContent"
                className={classes.bigInput}
                fullWidth="true"
                item='true'
            />
            <TextField
                variant="standard"
                label={quizInfo.info ? `Answer: ${quizInfo.info.questions[questionIndex].ans}` : 'Answer: null' }
                className={classes.bigInput}
                id="Answer"
                fullWidth="true"
                item='true'
            />
            <Grid container spacing={0.5} justify="space-evenly" alignContent="center" >
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
                    id="Points"
                />
            </Grid>
            <Box m={3} mx="auto">
                <Button size="small" color="primary" variant="contained" onClick={updateQuestion} >
                Submit All
                </Button>
            </Box>
        </Grid>
        </React.Fragment>
    );
}
