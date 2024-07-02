import { Request, Response } from 'express';
import { UserService } from '../modules/users/user.service';

export async function loginService (req: Request, res: Response) {
    // let user = new UserService();
    // let {email, password} = req.body;

    // res.cookie('email', email.toUpperCase(), { expires: new Date(Date.now() + 1800000), httpOnly: true });

    // const userData = await user.login(req, res);

    // if(!user) {
    //     res.render('login', {
    //         success: false,
    //         message: 'Login ou senha inválido'
    //     })
    // }

    res.redirect('home');
}