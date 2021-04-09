import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { getQuizQuestions, deleteQuiz } from '../api';
import { useHistory } from 'react-router-dom';

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
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Gamecard (quiz) {
    const classes = useStyles();
    const history = useHistory();

    const token = localStorage.getItem('token');
    const [questions, setQuestions] = React.useState();

    const fetchQuestions = () => {
        getQuizQuestions(token, quiz.quiz.id).then(data => {
            setQuestions(Object.values(data));
        });
    }

    React.useEffect(() => { fetchQuestions(); }, [token]);
    // React.useEffect(() => { window.location.reload(); }, [questions ? questions.length : null]);

    const getTotalTime = () => {
        if (!questions) return 0;
        let res = 0;
        for (let i = 0; i < questions.length; ++i) {
            res += questions[i].time;
        }
        return res;
    }
    const deleteButton = () => {
        deleteQuiz(token, quiz.quiz.id);
        window.location.reload();
    }

    const goToEdit = () => {
        localStorage.setItem('quiz_id', quiz.quiz.id);
        history.push(`./edit/${quiz.quiz.id}`);
    }
    /*
    title
    number of questions
    a thumbnail
    a total time to complete
    Edit button
    create, 点击加空卡片
    delete button
    */

    return (
        <Grid item quiz={quiz} xs={12} sm={6} md={4}>
            <Card className={classes.quiz}>
            <CardMedia
                className={classes.cardMedia}
                image={quiz.quiz.thumbnail ? quiz.quiz.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU'}
                title={quiz.quiz.name}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                {quiz.quiz.name ? quiz.quiz.name : 'Empty title'}
                </Typography>
                <Typography>
                { `Number of questions: ${questions ? questions.length : 0}` }
                </Typography>
                <Typography>
                { `Total time: ${getTotalTime()}` }
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={10} justify="center" alignContent="center" >
                    <Box m={5}>
                    <Button size="small" color="primary" variant="contained" p={2}>
                    Play
                    </Button>
                    <Button size="small" color="primary" p={2} onClick={goToEdit}>
                    Edit
                    </Button>
                    <Button size="small" color="primary" p={2} onClick={deleteButton}>
                    Delete
                    </Button>
                    <Button size="small" color="primary" p={2}>
                    History
                    </Button>
                    </Box>
                </Grid>
            </CardActions>
            </Card>
        </Grid>
    );
}
