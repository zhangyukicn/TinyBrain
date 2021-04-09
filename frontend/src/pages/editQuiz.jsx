import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Chart from '../components/chart';
import QuizCard from '../components/quizCardInEdit';
import HistoryRecords from '../components/history';
import Copyright from '../components/copyRight';
import EditImg from '../components/editImg';
import SlideBarBtn from '../components/slideBarBtn'
import { useHistory } from 'react-router-dom';
import { LogOut, getQuizQuestions, getQuizInfo } from '../api';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Editboard () {
    const classes = useStyles();
    const history = useHistory();
    const token = localStorage.getItem('token');
    const quizId = localStorage.getItem('quiz_id');
    const [questions, setQuestions] = React.useState(0);
    const [quizInfo, setQuizInfo] = React.useState(0);

    const fetchQuestions = () => {
        getQuizQuestions(token, quizId).then(data => {
            setQuestions(Object.values(data));
        });
    }

    const fetchInfo = () => {
        getQuizInfo(token, quizId).then(data => {
            setQuizInfo(data);
        });
    }

    React.useEffect(() => { fetchQuestions(); }, []);
    React.useEffect(() => { fetchInfo(); }, []);
    // console.log(quizInfo);
    // console.log(questions);
    const navLogOut = (event) => {
        event.preventDefault();
        console.log(token);
        LogOut(token).then(res => {
            localStorage.removeItem('token');
            history.push('./');
        });
    }

    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
        <CssBaseline />
        {/* nav bar with side side bar */}
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                TinyBrain
            </Typography>
            <Button color="inherit" onClick={() => history.push('../dashboard')}>Home</Button>
            <Button color="inherit" onClick={navLogOut}>LogOut</Button>
            </Toolbar>
        </AppBar>
        {/* side side bar */}
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List>
                <div>
                    <ListSubheader inset>Questions</ListSubheader>
                    {questions ? questions.map((question) => (<SlideBarBtn key={question.id} question={question}></SlideBarBtn>)) : null }
                    <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Question"/>
                    </ListItem>
                </div>
            </List>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3} justify='space-evenly'>
                    {/* Image preview & change */}
                    <Grid item xs={12} md={4} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <Chart img={quizInfo.thumbnail}/>
                    </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <QuizCard info={quizInfo}/>
                    </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <HistoryRecords />
                    </Paper>
                    </Grid>
                </Grid>

                <Box pt={4}>
                    <Copyright />
                </Box>
            </Container>
        </main>
        </div>
    );
}
