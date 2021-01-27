const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dbConfig = require("./db.config.js");
const history = require("connect-history-api-fallback");
const app = express();
const port = 3000;

// Парсинг json
app.use(bodyParser.json());

app.use(history());

// Парсинг запросов по типу: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Настройка CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    next();
  });

  // Создание соединения с базой данных
let connection;
connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  port: dbConfig.PORT,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: "utf8_general_ci",
  connectionLimit: 10,
});

connection.getConnection((err, connect) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused.");
      }
    } else {
      connect.query('SET NAMES "utf8"');
      connect.query('SET CHARACTER SET "utf8"');
      connect.query('SET SESSION collation_connection = "utf8_general_ci"');
      console.log("Успешно соединено с БД");
    }
    if (connect) connect.release();
  });

  app.get('/students', function (req, res) {
    try {
      connection.query('SELECT * FROM `Students`', function (error, results) {
        if (error) {
          res.status(500).send('Ошибка сервера')
          console.log(error);
        }
        console.log(results);
        res.json(results);
      });
    } catch (error) { 
      console.log(error);
    }
  
  });


  app.post("/add", (req, res) => {
    connection.query(`INSERT INTO Students (surname, name, middlename, number, email, data, id) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [req.body.surname, req.body.name, req.body.middlename, req.body.number, req.body.email, req.body.data, req.params.id],
      function (err) {
        if (err) {
          res.status(500).send('Ошибка сервера')
          console.log(err);
        }
        console.log('Вы добавили запись');
        res.json("create");
      });
  })

  app.get('/students/:id', function (req, res) {
    try {
      connection.query(`SELECT * FROM Students WHERE id=${req.params.id} LIMIT 1`, function (error, results) {
        if (error) {
          res.status(500).send('Ошибка сервера')
          console.log(error);
        }
        console.log(results);
        res.json(results[0]);
      });
    } catch (error) { 
      console.log(error);
    }
  
  })

  app.put("/students/:id", (req, res) => {
    connection.query(`UPDATE Students SET surname = ?, name = ?, middlename = ?, number = ?, email = ?, data = ? WHERE id=${req.params.id};`,
    [req.body.surname, req.body.name, req.body.middlename, req.body.number, req.body.email, req.body.data],
    function (err) {
    if (err) {
    res.status(500).send(err)
    console.log(err);
    }
    console.log('Редактирование прошло успешно');
    res.json("Update");
    });
  })

  app.delete("/students/:id", (req, res) => {
    connection.query(`DELETE FROM Students WHERE id=${req.params.id}`,
      function (err) {
        if (err) {
          res.status(500).send('Ошибка сервера')
          console.log(err);
        }
        console.log('Удалено');
        res.json("delete");
      });
    
  })

  // Информирование о запуске сервера и его порте
app.listen(port, () => {
    console.log("Сервер запущен на http://localhost:" + port);
  });