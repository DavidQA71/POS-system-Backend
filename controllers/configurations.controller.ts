import { Request, Response } from 'express';
import getPaymentMethods from '../models/configurations.model';

const getAllPayMethods = async (req: Request, res: Response) => {
    try {
        const paymentMethods = await getPaymentMethods();

      if (!paymentMethods || paymentMethods.length === 0) {
      return res.status(204).json({
        statusCode: 204,
        statusMessage: "No hay métodos de pago disponibles",
      });
    }
        return res.status(200).json(paymentMethods);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            statusMessage: "Error al consultar los métodos de pago"
        });
    }
};

export default getAllPayMethods;