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
        // res.redirect('/login');
        res.status(401)
        res.send("Unauthorized")
    }
    else {
        next();
    }

}

router.use(verify_login);

// router.get('/', function(req, res){
//     res.redirect('/home')
// });

router.post('/login', userService.login.bind(userService));

router.get('/admin', function(req, res){
    res.render('admin');
});

router.post('/logout', function(req, res){
    res.clearCookie('userId');
    res.clearCookie('userEmail');
    res.clearCookie('userName');
    res.clearCookie('userRole');
    res.status(204);
    res.send();
    return;

})

router.get('/services', async (req, res) => {
    // res.render('home', {
    //     lista: await findServicesSQL({
    //         take: req.query.take ? parseInt(req.query.take as string) : 20,
    //         skip: req.query.skip ? parseInt(req.query.skip as string) : 0
    //     })
    // });


    const services = await findServicesSQL({
                take: req.query.take ? parseInt(req.query.take as string) : 20,
                skip: req.query.skip ? parseInt(req.query.skip as string) : 0
            })
    
    res.send(services);
    return;
});

router.get('/stock', async (req, res) => {
    const data = await findStockSQL()

    res.send(data)
    // res.render('estoque', {
    //     data: data,
    // });
});

router.delete('/:id', (req, res) => {
});

router.post('/createorder', async (req, res) => {
    const orderId = await createServiceSQL({
        productName: req.body.produto,
        userId: req.cookies.userId,
        inputType: req.body.inputType
    })

    res.send({ orderId })
    
    // res.redirect('home');      
});

router.post('/stock', async (req, res) => {  
    const itemId = await upsertStockSQL({
        slot: req.body.slot,
        item_name: req.body.itemName,
        quantity: req.body.itemQuantity,
    })

    res.send({ itemId })
    return;
    // res.render('admin', {
    //     itemId
    // });
});


export { router };
