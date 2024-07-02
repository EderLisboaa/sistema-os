import { Router, Request, Response, NextFunction as Next } from 'express';
import { loginService } from '../services/login.service';
import { find as findOs } from '../services/find.service';
import { UserService } from '../modules/users/user.service';
import { UserDatabase } from '../modules/users/user.database';
import swaggerUi from 'swagger-ui-express';

let userDatabase = new UserDatabase()

let userService = new UserService();

const router = Router();

const swaggerDocument = require('../../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


// MIDDLEWARES
let verify_login = function (req: Request, res: Response, next: Next) {
    if (req.cookies.email == undefined && req.path !== '/login') {
        res.redirect('/login');
    }
    else {
        next();
    }

}

router.use(verify_login);

router.get('/', function(req, res){
    res.redirect('/home')
});

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', userService.login);

router.get('/adm', function(req, res){
    res.render('adm');
});

router.get('/sair', function(req, res){
    res.clearCookie('nome');
    res.redirect('login');
})

router.get('/home', findOs);

router.get('/estoque', function(req, res){
    
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

router.delete('/:id', (req, res) => {
});

router.post('/createorder', function(req, res){
    
    console.log("endpoint: /createorder")
    let CorreioRecepcao = "null";
    
    if(req.body.correio){
        CorreioRecepcao = "correio"
    }
    else if(req.body.recepcao){
        CorreioRecepcao = "recepção"
    }
    
    let nome        = req.cookies.nome;
    let produto     = req.body.produto.toUpperCase();
    let os          = Number(req.body.os);
    let entrada     = CorreioRecepcao;
    let conserto    = req.body.conserto.toUpperCase();
    let data        = req.body.data.split('-');
    let dataDelta   = (`${data[0]}-${data[1]}-${data[2]}`);
    let databr      = (`${data[2]}/${data[1]}/${data[0]}`);
    
    if(nome === undefined || nome === "" || nome === null){
        res.redirect('/');
        return;
    }
    
    if(os === 0 || entrada === null || conserto === "" || data[2] === undefined){
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

router.post('/adm', function(req, res){
    let caixa       = req.body.caixa;
    let produto     = req.body.produto;
    let descricao   = req.body.descricao;
    let preco       = req.body.preco;
    
    // req.db.collection('estoque').insert({
    //     caixa:      caixa,
    //     produto:    produto,
    //     descricao:  descricao,
    //     preco:      preco
    // })
    
    res.render('adm');
});


export { router };
