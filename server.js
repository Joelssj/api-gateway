"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const GatewayRoutes_1 = __importDefault(require("./Api-Gateway/infraestructure/routes/GatewayRoutes"));
// Cargar las variables de entorno
dotenv_1.default.config();
// Crear la instancia de la aplicación Express
const app = (0, express_1.default)();
// Configurar el middleware para manejar JSON
app.use(express_1.default.json());
// Configurar las rutas del API Gateway
app.use('/', GatewayRoutes_1.default);
// Definir el puerto y arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
