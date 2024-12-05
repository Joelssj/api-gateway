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
exports.ControllerEscritura = void 0;
const ForwardRequestUseCase_1 = require("../../application/ForwardRequestUseCase");
const AxiosGatewayAdapter_1 = require("../adapter/AxiosGatewayAdapter");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Leer la URL base del servicio desde el archivo .env para el puerto 3003
const serviceBaseUrl = process.env.ESCRITURA_SERVICE_BASE_URL;
if (!serviceBaseUrl) {
    throw new Error('ESCRITURA_SERVICE_BASE_URL is not defined in the .env file');
}
const gatewayAdapter = new AxiosGatewayAdapter_1.AxiosGatewayServiceAdapter();
const forwardRequestUseCase = new ForwardRequestUseCase_1.ForwardRequestUseCase(gatewayAdapter);
class ControllerEscritura {
    // Método para redirigir solicitudes POST
    static forwardToEscrituraService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received request to Escritura service with path:', req.originalUrl, 'and method:', req.method);
                const escrituraServiceUrl = serviceBaseUrl;
                if (!escrituraServiceUrl) {
                    return res.status(500).json({ error: 'Escritura service base URL is not defined' });
                }
                const forwardPath = req.originalUrl;
                console.log('Forwarding request to escritura service URL:', escrituraServiceUrl + forwardPath);
                const response = yield forwardRequestUseCase.execute(escrituraServiceUrl, req.method.toLowerCase(), forwardPath, req.body);
                console.log('Response from escritura service:', response);
                res.json(response);
            }
            catch (error) {
                console.error('Error forwarding request to escritura service:', error);
                res.status(500).json({ error: 'Escritura service request failed' });
            }
        });
    }
}
exports.ControllerEscritura = ControllerEscritura;
