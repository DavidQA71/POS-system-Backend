import { db } from '../config/db';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
}

const findUserByEmail = async (email: string) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const users = rows as User[];
        return users.length ? users[0] : null;
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la base de datos');
    }

}

export { findUserByEmail };