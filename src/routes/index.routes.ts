import { Router, Request, Response, NextFunction as Next } from 'express';
import { loginService } from '../services/login.service';
import { find as findOs } from '../services/find.service';
import { UserService } from '../modules/users/user.service';
import { UserDatabase } from '../modules/users/user.database';
import { createServiceSQL } from '../database/querys/createService';
import { findServicesSQL } from '../database/querys/findServices';
import { upsertStockSQL } from '../database/querys/upsertStock';
import { findStockSQL } from '../database/querys/findStock';
import swaggerUi from 'swagger-ui-express';

let userDatabase = new UserDatabase()

let userService = new UserService();

const router = Router();

const swaggerDocument = require('../../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


// MIDDLEWARES
let verify_login = function (req: Request, res: Response, next: Next) {
    if (req.cookies.userEmail == undefined && req.path !== '/login') {
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


router.post('/login', userService.login.bind(userService));

router.get('/admin', function(req, res){
    res.render('admin');
});

router.get('/sair', function(req, res){
    res.clearCookie('nome');
    res.redirect('login');
})

router.get('/home', async (req, res) => {
    res.render('home', {
        lista: await findServicesSQL({
            take: req.query.take ? parseInt(req.query.take as string) : 20,
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0
        })
    });

});

router.get('/estoque', async (req, res) => {
    
    const data = await findStockSQL()

    console.log('data =>', data)

    res.render('estoque', {
        data: data,
    });
});

router.delete('/:id', (req, res) => {
});

router.post('/createorder', async (req, res) => {
    
    console.log('req.body', req.body)

    await createServiceSQL({
        productName: req.body.produto,
        userId: req.cookies.userId,
        inputType: req.body.inputType
    })
    
    // insertDelta(nome, os, conserto, dataDelta);
    res.redirect('home');      
});

router.post('/admin', async (req, res) => {  
    console.log('req.body', req.body)

    const itemId = await upsertStockSQL({
        slot: req.body.caixa,
        item_name: req.body.produto,
        quantity: req.body.quantidade,
    })

    console.log('itemId', itemId)
    
    res.render('admin', {
        itemId
    });
});


export { router };
