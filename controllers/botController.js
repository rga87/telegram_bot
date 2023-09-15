const {validationResult} = require("express-validator")
const dotenv = require('dotenv');
//--------------------------------------------------------------------------------
const BotModel = require("../models/botModel");
//--------------------------------------------------------------------------------
dotenv.config();
const botModel = new BotModel(process.env.TELEGRAM_TOKEN,process.env.TELEGRAM_CHAT_ID);
//--------------------------------------------------------------------------------
exports.sendMessage = async function (req, res){
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {name,phone,text} = req.body;
    botModel.sendMessage(name,phone,text);
    res.status(200).json({'status':200,'message':'Ваше обращение принято в работу.Мы обязательно свяжемся с Вами в ближайшее время'});
  }catch(error){
    console.log(error);
    res.status(500).json({'status':500,'message':'Произошла ошибка при обработке запроса'});
  }
};
//--------------------------------------------------------------------------------

