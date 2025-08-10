import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		if (!email) {
			return res.status(400).json({ message: 'El campo email es obligatorio' });
		}
		if (!password) {
			return res
				.status(400)
				.json({ message: 'El campo contraseña es obligatoria' });
		}

		const userData = await findUserByEmail(email);
		if (!userData) {
			return res.status(401).json({ message: 'Credenciales inválidas' });
		}
		
		const isMatch = await bcrypt.compare(password, userData.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Credenciales inválidas' });
		}
		const token = jwt.sign({ id: userData.id }, JWT_SECRET, {
			expiresIn: '1h',
		});
		return res.status(200).json({ token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Error del servidor: no se pudo acceder a la base de datos',
		});
	}
};
export { login };
