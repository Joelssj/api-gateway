"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const ForwardRequestUseCase_1 = require("../../application/ForwardRequestUseCase");
const AxiosGatewayAdapter_1 = require("../adapter/AxiosGatewayAdapter");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Leer la URL base del servicio desde el archivo .env para el puerto 3002
const serviceBaseUrl = process.env.PAYMENT_SERVICE_BASE_URL;
if (!serviceBaseUrl) {
    throw new Error('PAYMENT_SERVICE_BASE_URL is not defined in the .env file');
}
const gatewayAdapter = new AxiosGatewayAdapter_1.AxiosGatewayServiceAdapter();
const forwardRequestUseCase = new ForwardRequestUseCase_1.ForwardRequestUseCase(gatewayAdapter);
class PaymentController {
    static createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received request to Payment service with path:', req.originalUrl, 'and method:', req.method);
                // La URL base ya está definida en el .env
                const paymentServiceUrl = serviceBaseUrl;
                if (!paymentServiceUrl) {
                    return res.status(500).json({ error: 'Payment service base URL is not defined' });
                }
                // La ruta completa para el microservicio
                const forwardPath = req.originalUrl.replace(/\/$/, ''); // Eliminar barra final, si existe
                console.log('Forwarding request to payment service URL:', paymentServiceUrl + forwardPath);
                // Redirige la solicitud al microservicio correspondiente
                const response = yield forwardRequestUseCase.execute(paymentServiceUrl, req.method.toLowerCase(), forwardPath, req.body);
                console.log('Response from payment service:', response);
                // Devuelve la respuesta del microservicio al cliente
                res.json(response);
            }
            catch (error) {
                console.error('Error forwarding request to payment service:', error);
                res.status(500).json({ error: 'Payment service request failed' });
            }
        });
    }
}
exports.PaymentController = PaymentController;
