import { NextApiRequest, NextApiResponse } from 'next';
import {updateDocuments} from "../../../lib/ScheduleTask"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  updateDocuments(); // Ensure the cron job starts
  res.status(200).json({ message: 'Cron job started' });
}