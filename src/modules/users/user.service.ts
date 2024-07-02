import { Request, Response } from 'express';
import { UserInterface } from './interfaces/user.inteface';
import { UserDatabase } from './user.database';
import { findUserSQL } from '../../database/querys/findUser';

export class UserService {
    private userDatabase: UserDatabase;

    constructor () {
        this.userDatabase = new UserDatabase();
    }
  
    public async login (request: Request, response: Response) {
        let {email, password} = request.body;
        
        const user = await findUserSQL({ email, password });

        if(!user) {
            response.render('login', {
                success: false,
                message: 'Login ou senha inválido'
            })
            return;
        }

        response.cookie('userId', user.id, { expires: new Date(Date.now() + 1800000), httpOnly: true });
        response.cookie('userEmail', user.email, { expires: new Date(Date.now() + 1800000), httpOnly: true });
        response.cookie('userName', user.name, { expires: new Date(Date.now() + 1800000), httpOnly: true });
        response.cookie('userRole', user.role, { expires: new Date(Date.now() + 1800000), httpOnly: true });

        response.redirect('home');
    }
}