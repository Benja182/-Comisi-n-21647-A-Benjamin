require('dotenv').config();


const express = require('express');
const app = express();
const {dbTest} = require('./database.js');
const dotenv = require('dotenv');
const tareamodel = require('./tareamodel.js');
const {title} = require('process');


//configurar EJS como motor plantilla
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
dotenv.config({path: './env/.env'});



const PORT = process.env.PORT;


app.get('/', async function (req, res) {
    const foros = await tareamodel.findAll();
    res.render('initiation', {nombre: 'Profesor',foros: foros})
});


app.get('/aggregate', function (req, res) {
    res.render('aggregate.ejs')
});


app.post('/aggregate', async function (req, res) {
    const {title, content, date, image} = req.body

    try {
        const post = await tareamodel.create({
            title: title,
            content: content,
            image: image,
            date: date
        });
        if (post) {
            res.redirect('/');
        } else {
            res.send('No se pudo agregar la tarea: ')
        }

    } catch (err) {
        res.send('Se produjo un error al agregar el contenido: ' + err)
    }
});


app.get('/delete/:id', async function (req, res) {
    const {id} = req.params;

    try {
        const borrarTarea = await tareamodel.destroy({
            where: {
                id: id
            }
        });

        if (borrarTarea) {
            res.redirect('/');
        } else {
            res.send('No se pudo borrar el post: ')
        }
    } catch (err) {
        res.send('Se produjo un error al borrar el post: ' + err)
    }
});

app.get('/edit/:id', async function (req, res) {
    const {id} = req.params;

    try {
        const editarTarea = await tareamodel.findOne({
            where: {
                id: id
            }
        });

        if (editarTarea) {
            res.render('edit', {editarTarea: editarTarea});
        } else {
            res.send('No se pudo editar el post: ')
        }
    } catch (err) {
        res.send('Se produjo un editar el post: ' + err)
    }
});

app.post('/edit/:id', async function (req, res) {
    const {id} = req.params;
    const {title, content, date, image} = req.body

    try {
        const postEditado = await tareamodel.update({
            title: title,
            content: content,
            date: date, 
            image: image
        }, {
            where: {
                id: id
            }
        });

        if (postEditado) {
            res.redirect('/');
        } else {
            res.send('No se pudo actualizar el post: ')
        }
    } catch (err) {
        res.send('Se produjo un error al actualizar el post: ' + err)
    }
});

dbTest()


app.listen(PORT, () => {
    console.log("The server is running in the port: " + PORT)
});