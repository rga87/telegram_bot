﻿
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
//---------------------------------------------------------------------------------------------------
const logger = require('./utils/logger');
//---------------------------------------------------------------------------------------------------
const botRouter=require("./routes/botRouter");
//---------------------------------------------------------------------------------------------------
dotenv.config();
const PORT = process.env.Port||3000;
//const pino = require("pino-http")();
const app = express();
//app.use(pino);
app.use(cors());
app.use(express.json());
app.use("/bot",botRouter);
process.on('uncaughtException', (err) => {
  // залогировать исключение
  logger.fatal(err, 'обнаружено неотловленное исключение');
  // мягко завершить работу сервера
  server.close(() => {
    process.exit(1); // затем выйти
  });
  // если не удалось завершить работу мягко в течение 1 секунды, 
  // завершить процесс полностью
  setTimeout(() => {
    process.abort(); // выйти немедленно и создать файл дампа
  }, 1000).unref()
  process.exit(1);
});
//---------------------------------------------------------------------------------------------------
let server = app.listen(process.env.Port, function () {
  logger.info('start server');
  console.log(`listening on localhost:${PORT}`);
});
//---------------------------------------------------------------------------------------------------
module.exports = server