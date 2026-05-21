// настройки библиотеки
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// здесь берем данные из .env для подключения к бд
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('не подключено заибал, :', err.message);
    } else {
        console.log('подключено заибал');
        release();
    }
});

app.use(express.static('public'));

// app.get('/api/owner', async (req, res) => {
//     const result = await pool.query('select * from owner');
//     console.log('данные: ', result.rows);
//     res.json(result.rows);
// });


app.get('/api/booking', async (req, res) => {
    const result = await pool.query(`
        select
	    room_id as id,
	    size as размер,
	    room_num  as номер,
	    tarif.class  as тариф,
	    tarif.price  as цена,
	    room_types.name as тип_комнаты,
	    room_types.intended as предназначен_для
	    from rooms
	    join tarif on rooms.tarif_id = tarif.tarif_id
	    join room_types on rooms.room_type_id = room_types.room_type_id
	    order by tarif.tarif_id asc
        
	`);
    console.log('данные: ', result.rows);
    res.json(result.rows);
});


app.listen(PORT, () => {
    console.log('все робит')
    console.log(`сервер запущен на http://localhost:${PORT}`);
});