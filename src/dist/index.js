"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var index_routes_1 = require("./routes/index.routes");
var app = express_1.default();
var port = 3000;
app.use('/assets', express_1.default.static('assets')); //utilização de arquivos staticos
app.use(express_1.default.urlencoded({ extended: true })); //tipo de dado que recebemos do html
app.use(express_1.default.json()); //tipo de dado que recebemos do html
app.use(cookie_parser_1.default()); //cookie, para armazenar dados dos usuarios
app.set('view engine', 'ejs');
app.use('/', index_routes_1.router);
app.listen(port, function () {
    console.log("Server is runnin in localhost:" + port);
});
