import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../mysql";

export interface IUpsertStockSQLData {
  slot: string;
  item_name: string;
  quantity: string;
}

export interface IUpsertStockSQLResponse {
  id: number;
}

export async function upsertStockSQL(data: IUpsertStockSQLData) {
  const findQuery = `
    SELECT * FROM stock WHERE slot = ? AND item_name = ?
  `

  const [findQueryResult, findFieldPacket] = await db.query<RowDataPacket[]>(findQuery, [data.slot, data.item_name]);

  if(findQueryResult.length) {
    const updateQuery = `
      UPDATE stock SET quantity = quantity + ? WHERE slot = ? AND item_name = ?
    `

    const [updateQueryResult, updateFieldPacket] = await db.query<ResultSetHeader>(updateQuery, [data.quantity, data.slot, data.item_name]);

    return updateQueryResult.insertId;
  }

  const query = `
    INSERT INTO stock (slot, item_name, quantity) VALUES (?, ?, ?)
  `

  const [queryResult, FieldPacket] = await db.query<ResultSetHeader>(query, [data.slot, data.item_name, data.quantity]);

  return queryResult.insertId;
}
