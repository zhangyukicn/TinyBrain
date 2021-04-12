import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Title from './titles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { putQuiz } from '../api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    bigInput: {
        flex: 2,
        width: '100%',
        height: '80%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    buttons: {
        flex: 5
    },
}));

function Item (info) {
    const classes = useStyles();
    console.log(info);
    const questionIndex = localStorage.getItem('questionIndex');
    const optionIndex = info.index;
    const token = localStorage.getItem('token');
    const quizId = localStorage.getItem('quiz_id');
    const questionId = localStorage.getItem('questionId');
    const history = useHistory();

    const idxToOption = () => {
        return String.fromCharCode(65 + info.info.info.questions[questionIndex].options[optionIndex].idx);
    }
    const deleteOption = () => {
        // info.info.info.questions[questionIndex][info.index]
        let deleteIdx = info.info.info.questions[questionIndex].options[optionIndex].idx;
        const optionNum = info.info.info.questions[questionIndex].options.length;
        if (optionNum === 2) {
            alert('minimum two options!');
            return false;
        }
        for (let i = deleteIdx + 1; i < optionNum; ++i) {
            info.info.info.questions[questionIndex].options[i].idx = deleteIdx;
            deleteIdx += 1;
        }
        info.info.info.questions[questionIndex].options.splice(optionIndex, 1);
        const quizJSONString = JSON.stringify(info.info.info);
        // console.log(quizJSONString);
        putQuiz(token, quizId, quizJSONString).then((data) => {
            history.push(`/edit/${quizId}/${questionId}`);
            alert('delete option!');
        })
    }
    return (
        <Box p={2} display="flex" flexDirection="row" alignContent="center">
            <Typography component="h2" color="primary" align="center" p={5}>
                {`${idxToOption()}`}
            </Typography>
            <TextField
                variant="outlined"
                label={`${info.info.info.questions[questionIndex].options[optionIndex].txt}`}
                className={classes.bigInput}
                item='true'
                id={`option${info.index}`}
            />
            <Button
                size="small"
                color="primary"
                variant="text"
                p={5}
                onClick={deleteOption}
            >
                Remove
            </Button>
        </Box>
    );
}

export default function Options (info) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('quiz_id');
    const questionId = localStorage.getItem('questionId');
    const questionIndex = localStorage.getItem('questionIndex');
    const history = useHistory();
    console.log(info);
    // const [questions, Setquestions] = React.useState();
    // React.useEffect(() => { Setquestions(info.questions); }, [info]);
    const addOption = () => {
        const optionLength = info.info.questions[questionIndex].options.length;
        if (optionLength === 6) {
            alert('Maximum 6 options!');
            return false;
        }
        info.info.questions[questionIndex].options.push({
            idx: optionLength,
            txt: null,
        });
        const quizJSONString = JSON.stringify(info.info);
        // console.log(quizJSONString);
        putQuiz(token, id, quizJSONString).then((data) => {
            history.push(`/edit/${id}/${questionId}`);
            alert('add option!');
        })
    }
    const confirmChange = () => {
        const optionLength = info.info.questions[questionIndex].options.length;
        const txtA = document.getElementById('option0').value;
        const txtB = document.getElementById('option1').value;
        if (txtA) {
            info.info.questions[questionIndex].options[0].txt = txtA;
        }
        if (txtB) {
            info.info.questions[questionIndex].options[1].txt = txtB;
        }
        if (optionLength >= 3) {
            const txtC = document.getElementById('option2').value;
            if (txtC) {
                info.info.questions[questionIndex].options[2].txt = txtC;
            }
        }
        if (optionLength >= 4) {
            const txtD = document.getElementById('option3').value;
            if (txtD) {
                info.info.questions[questionIndex].options[3].txt = txtD;
            }
        }
        if (optionLength >= 5) {
            const txtE = document.getElementById('option4').value;
            if (txtE) {
                info.info.questions[questionIndex].options[4].txt = txtE;
            }
        }
        if (optionLength >= 6) {
            const txtF = document.getElementById('option5').value;
            if (txtF) {
                info.info.questions[questionIndex].options[5].txt = txtF;
            }
        }
        const quizJSONString = JSON.stringify(info.info);
        // console.log(quizJSONString);
        putQuiz(token, id, quizJSONString).then((data) => {
            history.push(`/edit/${id}/${questionId}`);
            alert('options contents updated');
        })
    }
    return (
        <React.Fragment>
            <Box p={1} display="flex" flexDirection="column">
                <Typography component="h2" color="primary" align="center">
                    {'Options'}
                </Typography>
                {info.info ? info.info.questions[questionIndex].options.map((option, index) => (<Item key={questionId + questionIndex + index} info={info} index={index}></Item>)) : null}
                <Grid container spacing={1} justify="space-evenly" alignContent="center" className={classes.buttons}>
                    <Button size="small" color="primary" variant="contained" p={10} onClick={confirmChange}>
                    Confirm
                    </Button>
                    <Button size="small" color="primary" variant="outlined" p={10} onClick={addOption}>
                    Add new
                    </Button>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
