import { validateTelegramWebAppData } from '../utils/server-checks';
import { User } from '../models/user';

interface ServiceResponse {
    data?: {
        avatarUrl?: string;
        username?: string;
    };
    error?: string;
}

export async function syncTelegramUser(telegramInitData: string): Promise<ServiceResponse> {
    const { validatedData, user, message } = validateTelegramWebAppData(telegramInitData);

    if (message !== 'Validation successful') {
        return { error: message };
    }

    // 杩欓噷鍙互澶勭悊鐢ㄦ埛鏁版嵁锛屽瀛樺偍鍒版暟鎹簱绛?
    // 绀轰緥杩斿洖鏁版嵁
    return {
        data: {
            avatarUrl: 'https://example.com/avatar.jpg', // 绀轰緥澶村儚 URL
            username: user.username || 'Default User',
        },
    };
}
