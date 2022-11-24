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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var next_1 = __importDefault(require("next"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = require("socket.io");
var axios_1 = __importDefault(require("axios"));
var Setting_1 = require("repositories/Setting");
var port = parseInt(process.env.PORT || "3000", 10);
var dev = process.env.NODE_ENV !== "production";
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
app
    .prepare()
    .then(function () {
    var expressApp = (0, express_1.default)();
    var server = (0, http_1.createServer)(expressApp);
    var io = new socket_io_1.Server();
    io.attach(server);
    expressApp.get("/socket", function (_, res) {
        res.send("helloworld");
    });
    io.on("connection", function (socket) {
        socket.on("join", function (guildId) {
            socket.join(guildId);
            console.log("join room!: ".concat(guildId));
        });
        socket.on("leave", function (guildId) {
            socket.leave(guildId);
            console.log("leave room");
        });
        socket.on("message", function (data) {
            io.to(data.guildId).emit("message", {
                message: "data.message",
                username: data.userName,
                guildId: data.guildId,
            });
        });
        socket.on("setting", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data.type === "home")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.post("http://localhost:3000/api/setting/HOME", {
                                guildId: data.guildId,
                                categoryId: data.categoryId,
                                beforeHome: data.beforeId,
                                afterHome: data.afterId,
                            }).then(function () {
                                io.to(data.guildId).emit("setting", {
                                    guildId: data.guildId,
                                    categoryId: data.categoryId,
                                    channelId: data.channelId,
                                    beforeHome: data.beforeId,
                                    afterHome: data.afterId,
                                });
                            }).catch(function () {
                                io.to(socket.id).emit("reload");
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        socket.on("change-member", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(data);
                        return [4 /*yield*/, (0, Setting_1.ChangeTeamMember)(data.guildId, data.connectId, data.memberId).then(function () {
                                io.to(data.guildId).emit("change-member", {});
                            }).catch(function () {
                                io.to(socket.id).emit("reload");
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expressApp.all("*", function (req, res) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        handle(req, res);
    });
    server.listen(port, function () {
        console.log("listening on ".concat(port));
    });
})
    .catch(function (e) { return console.error(e); });
