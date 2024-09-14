import crypto from 'crypto';
import { config } from '../config';

interface User {
    id?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_premium?: boolean;
}

interface ValidatedData {
    [key: string]: string;
}

export function validateTelegramWebAppData(telegramInitData: string): { validatedData: ValidatedData | null; user: User; message: string } {
    const { botToken, bypassAuth } = config;

    let validatedData: ValidatedData | null = null;
    let user: User = {};
    let message = '';

    if (bypassAuth) {
        validatedData = { temp: '' };
        user = { id: 'undefined', username: 'Unknown User' };
        message = 'Authentication bypassed for development';
    } else {
        if (!botToken) {
            return { message: 'BOT_TOKEN is not set', validatedData: null, user: {} };
        }

        const initData = new URLSearchParams(telegramInitData);
        const hash = initData.get('hash');

        if (!hash) {
            return { message: 'Hash is missing from initData', validatedData: null, user: {} };
        }

        initData.delete('hash');

        const authDate = initData.get('auth_date');
        if (!authDate) {
            return { message: 'auth_date is missing from initData', validatedData: null, user: {} };
        }

        const authTimestamp = parseInt(authDate, 10);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const timeDifference = currentTimestamp - authTimestamp;
        const threeHoursInSeconds = 3 * 60 * 60;

        if (timeDifference > threeHoursInSeconds) {
            return { message: 'Telegram data is older than 3 hours', validatedData: null, user: {} };
        }

        const dataCheckString = Array.from(initData.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`)
            .join('\\n');

        const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
        const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

        if (calculatedHash === hash) {
            validatedData = Object.fromEntries(initData.entries());
            message = 'Validation successful';
            const userString = validatedData['user'];
            if (userString) {
                try {
                    user = JSON.parse(userString);
                } catch (error) {
                    message = 'Error parsing user data';
                    validatedData = null;
                }
            } else {
                message = 'User data is missing';
                validatedData = null;
            }
        } else {
            message = 'Hash validation failed';
        }
    }

    return { validatedData, user, message };
}
