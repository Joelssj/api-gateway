"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GatewayController_1 = require("../controller/GatewayController");
const ControllerNotification_1 = require("../controller/ControllerNotification");
const ControllerEscritura_1 = require("../controller/ControllerEscritura");
const ControllerGrafica_1 = require("../controller/ControllerGrafica");
const PaymentController_1 = require("../controller/PaymentController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = (0, express_1.Router)();
// Rutas para los microservicios que usan el puerto 3010
// **GET** Routes (con parámetros de ruta dinámicos como :uuid)
router.get('/api/v1/lead/get/:uuid', GatewayController_1.GatewayController.forwardToService);
router.get('/api/v1/lead/getall', GatewayController_1.GatewayController.forwardToService);
router.get('/api/v1/users/get/:uuid', GatewayController_1.GatewayController.forwardToService);
router.get('/api/v1/comments/get', GatewayController_1.GatewayController.forwardToService);
router.get('/api/v1/profile/get/:userUuid', GatewayController_1.GatewayController.forwardToService);
// **POST** Routes (con parámetros de ruta dinámicos como :uuid)
router.post("/api/v1/profile/picture/:userUuid", upload.single("profilePicture"), GatewayController_1.GatewayController.forwardToService);
router.post('/api/v1/users/create', GatewayController_1.GatewayController.forwardToService);
router.post('/api/v1/users/login', GatewayController_1.GatewayController.forwardToService);
router.post('/api/v1/reset/password-reset', GatewayController_1.GatewayController.forwardToService);
router.post('/api/v1/reset/validate-token', GatewayController_1.GatewayController.forwardToService);
router.post('/api/v1/reset/reset-password', GatewayController_1.GatewayController.forwardToService);
router.post('/api/v1/comments/create', GatewayController_1.GatewayController.forwardToService);
router.post('/api/v1/lead/create', GatewayController_1.GatewayController.forwardToService);
// **DELETE** Routes (con parámetros de ruta dinámicos como :uuid)
router.delete('/api/v1/lead/:uuid', GatewayController_1.GatewayController.forwardToService);
router.delete('/api/v1/users/delete/:uuid', GatewayController_1.GatewayController.forwardToService);
// **PUT** Routes (con parámetros de ruta dinámicos como :uuid)
router.put('/api/v1/lead/update/:uuid', GatewayController_1.GatewayController.forwardToService);
router.put('/api/v1/users/update/:uuid', GatewayController_1.GatewayController.forwardToService);
// Rutas para los microservicios que usan el puerto 3001
router.post('/api/v1/token/validar-token', ControllerNotification_1.ControllerNotification.forwardToNotificationService);
// Rutas para el microservicio de escritura en el puerto 3003
// POST Routes
router.post('/api/v1/task/create', ControllerEscritura_1.ControllerEscritura.forwardToEscrituraService);
router.post('/api/v1/diary/create', ControllerEscritura_1.ControllerEscritura.forwardToEscrituraService);
// PUT Routes
router.put('/api/v1/task/update/:id', ControllerEscritura_1.ControllerEscritura.forwardToEscrituraService);
// GET Routes
router.get('/api/v1/task/get', ControllerEscritura_1.ControllerEscritura.forwardToEscrituraService);
router.get('/api/v1/task/get/tareas/:userUuid', ControllerEscritura_1.ControllerEscritura.forwardToEscrituraService);
router.get('/api/v1/diary/get', ControllerEscritura_1.ControllerEscritura.forwardToEscrituraService);
//puerto 5000
// Rutas POST para crear emociones
router.post('/api/emociones', ControllerGrafica_1.ControllerGrafica.forwardToGraficaService);
// Rutas GET para obtener emociones
router.get('/api/emociones', ControllerGrafica_1.ControllerGrafica.getEmociones);
// Rutas POST para crear pagos
router.post('/api/v1/payment/create', PaymentController_1.PaymentController.createPayment);
exports.default = router;
