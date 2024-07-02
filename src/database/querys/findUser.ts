import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../mysql";

export interface IFindUserSQLData {
  email: string;
  password: string;
}

export interface IFindUserSQLResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function findUserSQL(data: IFindUserSQLData): Promise<IFindUserSQLResponse | null> {
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const [queryResult, fieldPacket] = await db.query<RowDataPacket[]>(query, [data.email, data.password]);

  if(!queryResult.length) {
    return null;
  }


  return {
    id: queryResult[0].id,
    name: queryResult[0].name,
    email: queryResult[0].email,
    role: queryResult[0].role
  }
}