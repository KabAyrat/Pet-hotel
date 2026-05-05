// настройки библиотеки
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT; // берем данные из .env для настройки бд. тут хранится порт(он нам еще понадобится)

// здесь берем данные из .env для подключения к бд
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.use(express.static(__dirname));



// тестовый вывод данных 
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users LIMIT 50');
        
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка' });
    }
});

app.listen(PORT, () => {
    console.log('ну чета выводится')
    console.log(`Сервер на http://localhost:${PORT}`);  
    // здесь просто выводим в консоль, для того чтоб убедиться, что бд подключена
});