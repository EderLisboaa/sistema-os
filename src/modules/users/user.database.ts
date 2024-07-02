import { db } from "../../database/mysql";

export class UserDatabase {
    constructor(){

    }
    
    public async login (email: string, password: string) {
        const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
        const [queryResult, fieldPacket] = await db.query(query);

        return queryResult;
    }
}