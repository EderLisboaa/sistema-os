import { RowDataPacket } from "mysql2";
import { db } from "../mysql";

export interface IFindStockSQLData {
  filter?: string;
  take?: number;
  skip?: number;
}

export interface IFindStockSQLResponse {
  id: number;
  slot: string;
  itemName: string;
  quantity: string;
  createdAt: Date;
  updatedAt?: Date;
}


export async function findStockSQL(data?: IFindStockSQLData): Promise<IFindStockSQLResponse[]> {
  const where = data?.filter ? `WHERE ${data.filter.replace('&', ' AND ')}` : '';
  const limit = data?.take ? `LIMIT ${data.take}` : '';
  const offset = data?.skip ? `OFFSET ${data.skip}` : '';

  const query = `SELECT * FROM stock ${where} ${limit} ${offset}`;
  const [queryResult, fieldPacket] = await db.query<RowDataPacket[]>(query);

  if(!queryResult.length) {
    return [];
  }

  return queryResult.map((item) => {
    return {
      id: item.id,
      slot: item.slot,
      itemName: item.item_name,
      quantity: item.quantity,
      createdAt: new Date(item.created_at),
      updatedAt: item.updated_at
    }
  })
}