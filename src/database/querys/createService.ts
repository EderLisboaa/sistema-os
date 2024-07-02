import { ResultSetHeader } from "mysql2";
import { db } from "../mysql";

export interface ICreateServiceSQLData {
  productName: string;
  userId: number;
  inputType: string;
}

export interface ICreateServiceSQLResponse {
  id: number;
}

export async function createServiceSQL(data: ICreateServiceSQLData) {
  const query = `
    INSERT INTO services (product_name, user_id, input_type) VALUES (?, ?, ?)
  `

  const [queryResult, FieldPacket] = await db.query<ResultSetHeader>(query, [data.productName, data.userId, data.inputType]);

  return queryResult.insertId;
}
