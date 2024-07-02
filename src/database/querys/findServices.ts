import { RowDataPacket } from "mysql2";
import { db } from "../mysql";

export interface IFindServicesSQLData {
  filter?: string;
  take?: number;
  skip?: number;
}

export interface IFindServicesSQLResponse {
  id: number;
  productName: string;
  inputType: string;
  conclusionComments?: string;
  fixedAt?: string;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}


export async function findServicesSQL(data?: IFindServicesSQLData): Promise<IFindServicesSQLResponse[]> {
  const where = data?.filter ? `WHERE ${data.filter.replace('&', ' AND ')}` : '';
  const limit = data?.take ? `LIMIT ${data.take}` : '';
  const offset = data?.skip ? `OFFSET ${data.skip}` : '';

  const query = `SELECT * FROM services ${where} ${limit} ${offset}`;
  const [queryResult, fieldPacket] = await db.query<RowDataPacket[]>(query);

  if(!queryResult.length) {
    return [];
  }

  return queryResult.map((service) => {
    return {
      id: service.id,
      productName: service.product_name,
      inputType: service.input_type,
      // conclusionComments: service.conclusion_comments,
      // fixedAt: service.fixed_at,
      userId: service.user_id,
      createdAt: new Date(service.created_at),
      // updatedAt: service.updated_at
    }
  })
}