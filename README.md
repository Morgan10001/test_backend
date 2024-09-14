﻿# Telegram Auth Backend

## Description
A backend service to validate and process Telegram Mini App authentication data.

## Setup

1. Clone the repository.
2. Install dependencies: \
pm install\.
3. Create a \.env\ file and add your Telegram bot token.
4. Start the server: \
pm start\.

## API Endpoints

### POST /api/telegram-user

- **Request Body**: \	elegramInitData\ (string) - Telegram initialization data.
- **Response**: JSON object containing \vatarUrl\ and \username\ or an error message.

## License
MIT
#   t e s t _ b a c k e n d  
 