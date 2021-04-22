import React from 'react';
import '../App.css';
import Playnavbar from '../components/playernavbar';
import { GotSessionAnswer, PutAnswer, GotCorrectAnswer } from '../api';
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

function AnswerDispay (props) {
    const location = useLocation();
    const classes = useStyles();
    const playerid = location.state.id;
    const points = location.state.point;
    const [SessionInformResult, setInfo] = React.useState(0);
    console.log(points);

    const fetchSessionAnswer = () => {
        GotSessionAnswer(playerid).then(
            result => {
                console.log(result);
                setInfo(result);
            })
    }
    React.useEffect(() => { fetchSessionAnswer(); }, []);

    const getResEachQuestion = () => {
        const res = [];
        if (SessionInformResult) {
            for (let i = 0; i < SessionInformResult.length; ++i) {
                res.push({ id: i, correct: 0 });
            }
            for (let j = 0; j < SessionInformResult.length; ++j) {
                if (SessionInformResult[j].correct !== false) {
                    res[j].correct += 1;
                }
            }
        }
        return res;
    }

    return (
        <div>
            <Playnavbar />
            <Grid container spacing={0}>
                <Grid item xs>
                    <Card className={classes.heroContent}>
                        <CardContent className={classes.cardContent}>
                            <div className="title-part">
                                <Typography gutterBottom variant="h4" component="h2">
                                    Congradulation! You finish the game!
                             </Typography>
                            </div>
                            <div className="words-part">
                            <Typography gutterBottom variant="h5" component="h2">
                            {`Your Points are ${points}`}
                             </Typography>
                            {getResEachQuestion().map((q, index) =>
                                (<Typography gutterBottom key={index} variant="h5" component="h2">
                                    {`Question ${index + 1}: ${q.correct}`}
                                </Typography>))}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Copyright />
        </div>
    )
}
export default AnswerDispay;
