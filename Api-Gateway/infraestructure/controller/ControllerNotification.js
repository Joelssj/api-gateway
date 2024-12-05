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
exports.ControllerNotification = void 0;
const ForwardRequestUseCase_1 = require("../../application/ForwardRequestUseCase");
const AxiosGatewayAdapter_1 = require("../adapter/AxiosGatewayAdapter");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Leer la URL base del servicio desde el archivo .env para el puerto 3001
const serviceBaseUrl = process.env.NOTIFICATION_SERVICE_BASE_URL;
if (!serviceBaseUrl) {
    throw new Error('NOTIFICATION_SERVICE_BASE_URL is not defined in the .env file');
}
const gatewayAdapter = new AxiosGatewayAdapter_1.AxiosGatewayServiceAdapter();
const forwardRequestUseCase = new ForwardRequestUseCase_1.ForwardRequestUseCase(gatewayAdapter);
class ControllerNotification {
    static forwardToNotificationService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received request to Notification service with path:', req.originalUrl, 'and method:', req.method);
                // La URL base ya está definida en el .env para el servicio de notificación
                const notificationServiceUrl = serviceBaseUrl; // serviceUrl es de tipo string
                // Si notificationServiceUrl es undefined, devolver un error o lanzar una excepción
                if (!notificationServiceUrl) {
                    return res.status(500).json({ error: 'Notification service base URL is not defined' });
                }
                // La ruta completa para el microservicio
                const forwardPath = req.originalUrl;
                // Debugging: verifica la URL final
                console.log('Forwarding request to notification service URL:', notificationServiceUrl + forwardPath);
                // Redirige la solicitud al microservicio de notificación correspondiente
                const response = yield forwardRequestUseCase.execute(notificationServiceUrl, req.method.toLowerCase(), forwardPath, req.body);
                console.log('Response from notification service:', response);
                // Devuelve la respuesta del microservicio de notificación al cliente
                res.json(response);
            }
            catch (error) {
                console.error('Error forwarding request to notification service:', error);
                res.status(500).json({ error: 'Notification service request failed' });
            }
        });
    }
}
exports.ControllerNotification = ControllerNotification;
