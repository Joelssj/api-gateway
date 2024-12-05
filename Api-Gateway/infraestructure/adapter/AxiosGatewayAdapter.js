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
exports.AxiosGatewayServiceAdapter = void 0;
// AxiosGatewayServiceAdapter.ts
const axios_1 = __importDefault(require("axios"));
class AxiosGatewayServiceAdapter {
    forwardRequest(serviceUrl, method, path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, axios_1.default)({
                    url: `${serviceUrl}${path}`,
                    method,
                    data: data ? data : undefined, // Asegúrate de enviar el `data` solo si está presente
                });
                return response.data;
            }
            catch (error) {
                console.error('Error in AxiosGatewayServiceAdapter:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                }
                throw new Error('Service request failed');
            }
        });
    }
}
exports.AxiosGatewayServiceAdapter = AxiosGatewayServiceAdapter;
