import { db } from '../config/db';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
}

interface UserRole {
    name: string;
    role: string;
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

const findUserRoleById = async (userId: number) => {
    try {
        const [rows] = await db.execute(
            `SELECT u.name, r.description as role
             FROM users u
             JOIN user_roles ur ON u.id = ur.user_id
             JOIN roles r ON ur.role_id = r.id
             WHERE u.id = ?`,
            [userId]
        );

        const users = rows as UserRole[];
        return users.length ? users[0] : null;
    } catch (error) {
        console.error(error);
        throw new Error('Error al consultar el rol del usuario');
    }
};


export { findUserByEmail };
export { findUserRoleById };