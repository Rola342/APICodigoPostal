const express = require('express')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const app = express();
app.use(express.json());

//SQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Codigo_Postal'
});

//Rutas
app.get('/', (req, res) => {
    res.send('Codigo Postal');
})

//All

app.get('/codigopostal', (req, res) => {
    const sql = 'Select * from codigos_postales';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        //  if (results.lenght > 0) {
        res.json(results);
        // } else {
        //     res.send('no hay resultados')
        //    console.log(results)
        //  }
    });

});

app.get('/codigopostal/:cp', (req, res) => {
    const { cp } = req.params
    const sql = `SELECT * FROM codigos_postales WHERE cp = "${cp}"`
    connection.query(sql, (error, results) => {
        if (error) throw error;
        //  if (results.lenght > 0) {
        res.json(results);
        // } else {
        //     res.send('no hay resultados')
        //    console.log(results)
        //  }
    });
});



//Check Connect
connection.connect(error => {
    if (error) throw error;
    console.log('--- Base de datos corriendo ---')
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));