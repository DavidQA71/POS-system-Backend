import { db } from '../config/db';

interface IPayment {
  id: number;
  payment: string;
}

const getPaymentMethods = async () => {
    try {
        const [rows] = await db.execute(
            'SELECT id, payment FROM pay_methods'
        );
        return rows as IPayment[];
    } catch (error) {
        throw new Error('Error al consultar los métodos de pago');
    }
}

export default getPaymentMethods;
