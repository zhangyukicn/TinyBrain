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
