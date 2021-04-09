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

export default function EditImage (img) {
    const history = useHistory();
    console.log(img);
    const token = localStorage.getItem('token');
    return (
        <Grid item xs={12} sm={6} md={4}>
            <CardMedia
                image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8v42_qIIylFc_HQITxDN8AQAHnoFvxKnqg&usqp=CAU'}
            />
            <CardActions>
                <Grid container spacing={10} justify="center" alignContent="center" >
                    <Box m={5}>
                    <Button size="small" color="primary" variant="contained" p={2}>
                    Play
                    </Button>
                    <Button size="small" color="primary" p={2}>
                    Edit
                    </Button>
                    </Box>
                </Grid>
            </CardActions>
        </Grid>
    );
}
