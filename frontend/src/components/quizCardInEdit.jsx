import React from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './titles';
import { putQuiz } from '../api';
const useStyles = makeStyles({
    dateTag: {
        flex: 5,
    },
    nameBox: {
        flex: 9,
    },
    buttons: {
        flex: 5
    }
});

export default function QuizCardInEdit (quizInfo) {
    const classes = useStyles();
    const id = localStorage.getItem('quiz_id');
    const token = localStorage.getItem('token');
    console.log(quizInfo);
    const changeName = () => {
        const newName = document.getElementById('name_change').value;
        if (newName === '') {
            alert('Come on its empty');
            return false;
        }
        // 更新quiz时，要把整个quiz info stringfy 之后再传回去，api接受的就是个string
        quizInfo.info.name = newName;
        const quizJSONString = JSON.stringify(quizInfo.info);
        console.log(quizJSONString);
        putQuiz(token, id, quizJSONString).then((data) => {
            alert('hahah');
        })
    }
    return (
        <React.Fragment>
        <Title component="p" variant="h1">
            {quizInfo.info.name}
        </Title>
        <Typography color="textSecondary" className={classes.dateTag}>
            {`Created at ${quizInfo.info.createdAt}`}
        </Typography>
        <TextField
            variant="outlined"
            label="Edit name"
            id="name_change"
            className={classes.nameBox}
        />
        <div>
        <Grid container spacing={1} justify="space-evenly" alignContent="center" className={classes.buttons}>
            <Button size="small" color="primary" variant="contained" p={10}>
            Play
            </Button>
            <Button size="small" color="primary" variant="outlined" p={10} onClick={changeName}>
            Change Name
            </Button>
        </Grid>
        </div>
        </React.Fragment>
    );
}
