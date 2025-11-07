import { connection as mysql } from "../../database/mysql";
import { UserInterface } from "./interfaces/user.inteface";

export class UserDatabase {
    public async login (email: string, password: string): Promise<boolean> {
        let query = `SELECT name, email, role FROM Users WHERE email = ? AND password = ?`;
        const result = await mysql.query(query, [email, password]);
        const user: UserInterface[] = result[0] as UserInterface[];

        if (!user || user.length === 0) {
            return false;
        }

        return true;
    }
}