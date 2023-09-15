const TelegramBot = require('node-telegram-bot-api');
//---------------------------------------------------------------------------------------------------
const logger = require('../utils/logger');
class Bot{
    constructor(token,chat_id){
        this.chat_id=chat_id;
        this.bot = new TelegramBot(token, {polling: true});
    }
    sendMessage(name,phone,text){
        const message ="<b>Клиент:</b>"+name+",\n<b>Телефон:</b>"+phone+",\n<b>Комментарий:</b>"+text;
        logger.info(message);
        return new Promise(resolve => {
            this.bot
                .sendMessage(this.chat_id, message, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                })
                .then(
                    result => {
                        resolve(result);
                    },
                    err => {
                        console.log(err);
                        resolve(err);
                    },
                );
        })
    }
}
module.exports =Bot;