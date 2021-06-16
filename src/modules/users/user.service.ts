import { Request, Response } from 'express';
import { UserInterface } from './interfaces/user.inteface';
import { UserDatabase } from './user.database';

export class UserService {
    private userDatabase: UserDatabase;

    constructor () {
        this.userDatabase = new UserDatabase();
    }
  
    public async login (request: Request, response: Response) {
        let {email, password} = request.body;
        
        return this.userDatabase.login(email, password);

    
        // response.cookie('email', email.toUpperCase(), { expires: new Date(Date.now() + 1800000), httpOnly: true });
        // if(!user) {
        //     response.render('login', {
        //         success: false,
        //         message: 'Login ou senha inválido'
        //     })
        // }

        // response.redirect('home');
    }
}