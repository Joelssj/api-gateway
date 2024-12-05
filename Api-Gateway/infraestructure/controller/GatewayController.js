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
exports.GatewayController = void 0;
const ForwardRequestUseCase_1 = require("../../application/ForwardRequestUseCase");
const AxiosGatewayAdapter_1 = require("../adapter/AxiosGatewayAdapter");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Leer la URL base del servicio desde el archivo .env
const serviceBaseUrl = process.env.SERVICE_BASE_URL;
if (!serviceBaseUrl) {
    throw new Error('SERVICE_BASE_URL is not defined in the .env file');
}
const gatewayAdapter = new AxiosGatewayAdapter_1.AxiosGatewayServiceAdapter();
const forwardRequestUseCase = new ForwardRequestUseCase_1.ForwardRequestUseCase(gatewayAdapter);
class GatewayController {
    static forwardToService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received request to Gateway with path:', req.originalUrl, 'and method:', req.method);
                // La URL base ya está definida en el .env
                const serviceUrl = serviceBaseUrl; // serviceUrl es de tipo string
                // Si serviceUrl es undefined, devolver un error o lanzar una excepción
                if (!serviceUrl) {
                    return res.status(500).json({ error: 'Service base URL is not defined' });
                }
                // La ruta completa para el microservicio
                const forwardPath = req.originalUrl;
                // Debugging: verifica la URL final
                console.log('Forwarding request to service URL:', serviceUrl + forwardPath);
                // Redirige la solicitud al microservicio correspondiente
                const response = yield forwardRequestUseCase.execute(serviceUrl, req.method.toLowerCase(), forwardPath, req.body);
                console.log('Response from microservice:', response);
                // Devuelve la respuesta del microservicio al cliente
                res.json(response);
            }
            catch (error) {
                console.error('Error forwarding request:', error);
                res.status(500).json({ error: 'Service request failed' });
            }
        });
    }
}
exports.GatewayController = GatewayController;
