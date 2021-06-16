import express from "express";
import cookieParser from 'cookie-parser';
import { router } from './src/routes/index.routes';

const app = express();
const port = 3000;

app.use ('/assets', express.static('./src/assets'));          //utilização de arquivos staticos
app.use (express.urlencoded({extended: true}));                           //tipo de dado que recebemos do html
app.use (express.json());                           //tipo de dado que recebemos do html
app.use (cookieParser());                               //cookie, para armazenar dados dos usuarios
app.use('/', router);

app.set('view engine','ejs');
app.set('views', './src/views')

app.listen(port, ()=>{
    console.log (`Server is runnin in localhost:${port}`);
}); 