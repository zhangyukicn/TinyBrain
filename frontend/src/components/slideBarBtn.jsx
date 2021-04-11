import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import { putQuiz } from '../api';
import { useHistory } from 'react-router-dom';

export default function slideBarBtn (info) {
    const token = localStorage.getItem('token');
    const quizId = localStorage.getItem('quiz_id');
    const history = useHistory();
    // console.log(info);
    const deleteQuestion = () => {
        // 更新quiz时，要把整个quiz info stringfy 之后再传回去，api接受的就是个string
        info.info.questions.splice(info.index, 1);
        const quizJSONString = JSON.stringify(info.info);
        // console.log(quizJSONString);
        putQuiz(token, quizId, quizJSONString).then((data) => {
            history.push(`/edit/${quizId}`);
            alert('delete!');
        })
    }

    const goToQuestion = () => {
        if (info.info.questions.length > 0) {
            history.push(`/edit/${quizId}/${info.info.questions[info.index].id}`);
            localStorage.setItem('questionId', info.info.questions[info.index].id);
            localStorage.setItem('questionIndex', info.index);
        } else {
            history.push(`/edit/${quizId}`);
            localStorage.setItem('questionIndex', info.index);
        }
    }

    return (
        <ListItem>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <Button
                onClick={goToQuestion}
            >
                {`Question ${info.index + 1}`}
            </Button>
            <Button
                size="small"
                color="primary"
                variant="text"
                p={5}
                onClick={deleteQuestion}
            >
                X
            </Button>
        </ListItem>
    );
}
