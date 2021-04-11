import * as CONFIG from './config.json';

const port = `http://localhost:${CONFIG.BACKEND_PORT}`;
export default port;

export const LogOut = async (token) => {
    const res = await fetch(`${port}/admin/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    if (res.status === 200) {
        console.log(token);
        return data;
    } else {
        console.log(res);
        alert('Failed');
        // throw new Error('Log out failed');
    }
}

export const CreateGame = async (token, gameName) => {
    const res = await fetch(`${port}/admin/quiz/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: gameName
        }),
    });
    const data = await res.json();
    if (res.status === 200) {
        // console.log(data);
        console.log(`game created, name: ${gameName}, id: ${data.quizId}`)
        return data;
    } else {
        console.log(res);
        alert('Failed');
        // throw new Error('Log out failed');
    }
}

export const getAllQuiz = async (token) => {
    const res = await fetch(`${port}/admin/quiz`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    if (res.status === 200) {
        // console.log(data);
        return data.quizzes;
    } else {
        console.log(res);
        alert('Failed');
        // throw new Error('Log out failed');
    }
}

export const getQuizQuestions = async (token, id) => {
    const res = await fetch(`${port}/admin/quiz/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    if (res.status === 200) {
        // console.log(data.questions);
        return data.questions;
    } else {
        console.log(res);
        alert('Failed');
        // throw new Error('Log out failed');
    }
}

export const getQuizInfo = async (token, id) => {
    const res = await fetch(`${port}/admin/quiz/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    if (res.status === 200) {
        return data;
    } else {
        console.log(res);
        alert('Failed');
        // throw new Error('Log out failed');
    }
}

export const deleteQuiz = async (token, id) => {
    const res = await fetch(`${port}/admin/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    if (res.status === 200) {
        // alert('Delete successful');
        return data;
    } else {
        console.log(res);
        alert('Failed');
        // throw new Error('Log out failed');
    }
}

export const putQuiz = async (token, id, info) => {
    const res = await fetch(`${port}/admin/quiz/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: info
    });
    console.log(info);
    const data = await res.json();
    if (res.status === 200) {
        return data;
    } else {
        console.log(res);
        alert('Failed');
        // throw new Error('Log out failed');
    }
}
