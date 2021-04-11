import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { putQuiz } from '../api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 200,
        width: 200,
        margin: 'auto',
    },
}));

export default function EditImage (info) {
    const classes = useStyles();
    const id = localStorage.getItem('quiz_id');
    const token = localStorage.getItem('token');
    const history = useHistory();
    const tmpThumb = info.info.thumbnail;
    const [thumbnail, setThumbnail] = useState(tmpThumb);

    const getImage = async (imgInput) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgInput.files[0]);
        reader.onloadend = () => {
            setThumbnail(reader.result);
            document.getElementById('imgPreview').src = thumbnail;
            console.log(reader.result);
            console.log(thumbnail);
        };
    }

    const changeImg = () => {
        // 更新quiz时，要把整个quiz info stringfy 之后再传回去，api接受的就是个string
        info.info.thumbnail = thumbnail;
        const quizJSONString = JSON.stringify(info.info);
        // console.log(quizJSONString);
        putQuiz(token, id, quizJSONString).then((data) => {
            history.push(`./${id}`);
            alert('change!');
        })
    }

    return (
        <Card>
        <CardMedia
            className={classes.cardMedia}
            image={thumbnail || tmpThumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU'}
            id='imgPreview'
        />
        <CardActions>
            <Grid container spacing={1} justify="space-evenly" alignContent="center" >
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    p={10}
                    component="label"
                >
                Browse Image
                <input
                    type="file"
                    hidden
                    onChange={e => getImage(e.target)}
                />
                </Button>
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    p={10}
                    onClick={changeImg}
                >
                Change
                </Button>
            </Grid>
        </CardActions>
        </Card>
    );
}
