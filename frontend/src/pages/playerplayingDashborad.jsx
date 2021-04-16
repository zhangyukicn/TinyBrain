import React from 'react';
import '../App.css';
import Playnavbar from '../components/playernavbar';
import { GotQuestion, PutAnswer } from '../api';
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

// function Clickbox (info) {
//   console.log(info);
//   // return (<div key={index} className='pic-part'>
//   // <label>{`${idxToOption(index)}: ${option.txt}`}
//   // <input id={index} type="checkbox" value={`${idxToOption(index)}: ${option.txt}`} />
//   // </label>
//   // </div>)
// }

function AnswerDispay () {
  const classes = useStyles();
  const playerid = localStorage.getItem('playerid');
  const emptyImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU';
  const [QuizInform, setInfo] = React.useState(0);

  const fetchQuestion = () => {
    GotQuestion(playerid).then(
      result => {
        // console.log(result);
        setInfo(result);
        // const questiontitle = result.question.content;
        // const image = result.question.img;
        // document.getElementById('title_id').textContent = questiontitle;
      })
  }

  const idxToOption = (idx) => {
    return String.fromCharCode(65 + idx);
  }

  React.useEffect(() => { fetchQuestion(); }, []);

  const Clickfunction = (event) => {
    const checkbox = document.querySelectorAll("input[type='checkbox']");
    // console.log(checkbox);
    const feature = [];
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        feature.push(i);
      }
    }
    console.log(feature);
    console.log('yes');
    PutAnswer(playerid, feature)
      .then(result => {
        console.log(feature);
      })
  }

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
