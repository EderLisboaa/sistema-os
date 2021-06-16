import { connection as mysql } from "../../database/mysql";

export class UserDatabase {
    constructor(){

    }
    
    public async login (email: string, password: string): Promise<boolean> {
        let query = `SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
        let user = await mysql.query(query);

        // console.log(user);

        return true;
    }
}