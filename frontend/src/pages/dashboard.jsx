import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Copyright from '../components/copyRight';
import Navbar from '../components/navbar';
import Gamecard from '../components/gameCard'
import { CreateGame, getAllQuiz } from '../api'

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

// 就是所有的game 可以存在这里面

export default function Dashboard () {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const [quizzes, setQuizzes] = React.useState();

    const fetchQuizInfo = async () => {
        getAllQuiz(token).then(data => {
            setQuizzes(Object.values(data));
        });
    }
    React.useEffect(() => { fetchQuizInfo(); }, []);
    console.log(quizzes);

    const submitCreate = () => {
        const gameName = document.getElementById('newgame_name').value;
        CreateGame(token, gameName);
        window.location.reload();
    }

    return (
        <React.Fragment>
        <CssBaseline />
        <Navbar />
        <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Dashboard
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="newgame_name"
                    label="Type the name of new game here"
                    id="newgame_name"
                />
                <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                    <Button variant="outlined" color="primary" onClick={submitCreate}>
                        Create Game
                    </Button>
                    </Grid>
                </Grid>
                </div>
            </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {quizzes ? quizzes.map((quiz) => (<Gamecard key={quiz.id} quiz={quiz}></Gamecard>)) : null }
            </Grid>
            </Container>
        </main>
        {/* Footer */}
        <Copyright />
        {/* End footer */}
        </React.Fragment>
    );
}
