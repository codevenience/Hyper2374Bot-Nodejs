import dotenv from "dotenv"

// Load the environment variable
dotenv.config()

// Define configuration options
export const OPTIONS = {
    options: { 
        debug: true,
        messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env['BOT_NICK'],
        password: process.env['TMI_TOKEN']
    },
    channels: process.env['CHANNEL'].split(','),
    prefix : process.env['BOT_PREFIX'],
}
