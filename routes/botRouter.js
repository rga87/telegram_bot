
const express = require("express");
const botController = require("../controllers/botController");
const router = express.Router();
const {check} = require("express-validator");
//--------------------------------------------------------------------------------
router.post("/:sendMessage",[
    check("name","Имя пользователя не может быть пустым").notEmpty(),
    check("phone","Телефон не может быть пустым").notEmpty(),
    check("text","Текст сообщения не может быть пустым").notEmpty(),
 ], 
 botController.sendMessage
);
//--------------------------------------------------------------------------------
module.exports = router;