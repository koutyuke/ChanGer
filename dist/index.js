"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var next_1 = __importDefault(require("next"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = require("socket.io");
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
            console.log("join room!");
            console.log("data:".concat(guildId));
        });
        socket.on("leave", function (guildId) {
            socket.leave(guildId);
            console.log("leave room");
        });
        socket.on("message", function (data) {
            console.log("catch message");
            console.log(data);
            io.to(data.guildId).emit("message", {
                message: "data.message",
                username: data.userName,
                guildId: data.guildId,
            });
        });
        socket.on("setting", function (data) {
            io.to(data.guildId).emit("setting", {
                type: data.type,
                userName: data.userName,
                userId: data.userId,
                guildId: data.guildId,
                imageUrl: data.imageUrl,
            });
        });
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
