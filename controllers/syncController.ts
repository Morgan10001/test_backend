import { Request, Response } from 'express';
import { syncTelegramUser } from '../services/syncService';

export const syncController = async (req: Request, res: Response) => {
    const { telegramInitData } = req.body;

    if (!telegramInitData) {
        return res.status(400).json({ error: 'telegramInitData is required' });
    }

    try {
        const result = await syncTelegramUser(telegramInitData);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
