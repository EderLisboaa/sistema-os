"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var login_service_1 = require("../services/login.service");
var find_service_1 = require("../services/find.service");
// const exibirEstoque     = require ('./exibirEstoque');
// connect to your database
// let insertDelta =  function (tecnico: string, os: number, conserto: string, data: string){
//     let posicao;
//     // sql.connect(config, function (err) {
//     //     if (err) console.log(err);
//     //     // create Request object
//     //     var request = new sql.Request();
//     //     request.query(`select posicao from ITEMAT WHERE cod_assistencia = ${os} `, function (err, recordset) {
//     //         if (err) console.log(err)
//     //         // send records as a response
//     //         posicao = recordset.recordsets[0][0].posicao;
//     //         if (posicao === "EM CONSERTO"){
//     //             posicao = "CONSERTADO";
//     //         } 
//     //         // query to the database and get the records
//     //         request.query(`UPDATE ITEMAT SET 
//     //         desc_problema2='LAB: ${conserto}',
//     //         posicao = '${posicao}', 
//     //         tecnico = '${tecnico}', 
//     //         dt_conserto = '${data}' 
//     //         WHERE cod_assistencia= ${os}`, function (err, recordset) {
//     //             if (err) console.log(err+"deu erro aqui");
//     //             sql.close();
//     //         });
//     //     });
//     // });
// }
var router = express_1.Router();
exports.router = router;
// MIDDLEWARES
var verify_login = function (req, res, next) {
    if (req.cookies.email == undefined && req.path !== '/login') {
        res.redirect('/login');
    }
    else {
        next();
    }
};
router.use(verify_login);
router.get('/', function (req, res) {
    res.redirect('/home');
});
router.get('/login', function (req, res) {
    res.render('login');
});
router.post('/login', login_service_1.loginService);
router.get('/adm', function (req, res) {
    res.render('adm');
});
router.get('/sair', function (req, res) {
    res.clearCookie('nome');
    res.redirect('login');
});
router.get('/home', find_service_1.find);
router.get('/estoque', function (req, res) {
    // req.db.collection('estoque').find({}).toArray((erro,dados)=>{
    //     let caixa = [];
    //     let produto = [];
    //     let descricao = [];
    //     let preco = [];
    //     for (let dado of dados){
    //         caixa.push(dado.caixa);
    //         produto.push(dado.produto);
    //         descricao.push(dado.descricao);
    //         preco.push(dado.preco) 
    //     }
    //     res.render('estoque', {
    //         'lista':[
    //             caixa,
    //             produto, 
    //             descricao,
    //             preco, 
    //         ],
    //         'home': ""
    //     });
    // })
});
router.delete('/:id', function (req, res) {
});
router.post('/createorder', function (req, res) {
    console.log("endpoint: /createorder");
    var CorreioRecepcao = "null";
    if (req.body.correio) {
        CorreioRecepcao = "correio";
    }
    else if (req.body.recepcao) {
        CorreioRecepcao = "recepção";
    }
    var nome = req.cookies.nome;
    var produto = req.body.produto.toUpperCase();
    var os = Number(req.body.os);
    var entrada = CorreioRecepcao;
    var conserto = req.body.conserto.toUpperCase();
    var data = req.body.data.split('-');
    var dataDelta = (data[0] + "-" + data[1] + "-" + data[2]);
    var databr = (data[2] + "/" + data[1] + "/" + data[0]);
    if (nome === undefined || nome === "" || nome === null) {
        res.redirect('/');
        return;
    }
    if (os === 0 || entrada === null || conserto === "" || data[2] === undefined) {
        res.send('Erro: preencha todos os dados');
        return;
    }
    // req.db.collection('dados').insert({
    //     tecnico:  nome,
    //     produto:  produto,
    //     os:       os,
    //     entrada:  entrada,
    //     conserto: conserto, 
    //     data:     databr
    // });    
    // insertDelta(nome, os, conserto, dataDelta);
    res.redirect('home');
});
router.post('/adm', function (req, res) {
    var caixa = req.body.caixa;
    var produto = req.body.produto;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    // req.db.collection('estoque').insert({
    //     caixa:      caixa,
    //     produto:    produto,
    //     descricao:  descricao,
    //     preco:      preco
    // })
    res.render('adm');
});
