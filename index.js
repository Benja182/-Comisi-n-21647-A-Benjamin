// Cargar variables de entorno desde el archivo .env
require('dotenv').config();


// Importar las librerías y archivos necesarios
const express = require('express');
const app = express();
const { dbTest } = require('./database.js'); 
const dotenv = require('dotenv'); 
const tareamodel = require('./tareamodel.js'); 
const { title } = require('process'); 
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const { validateCreatePost, checkDuplicatePost } = require('./middlewares');


// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');


// Aplicar el middleware helmet para mejorar la seguridad de la aplicación
app.use(helmet());
app.use(morgan('dev'));
app.use(morgan('dev'));


// Configurar middleware para procesar solicitudes JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
dotenv.config({ path: './env/.env' });


//Variable de entorno
const PORT = process.env.PORT;


//Inicio de renderización de la vista 'Initiation' y consulta de los datos en tabla
app.get('/', async function (req, res) {
    const foros = await tareamodel.findAll()
    res.render('initiation', {nombre: 'Argentina Programa 4.0',foros: foros})
});


//Renderización de la vista 'aggregate'
app.get('/aggregate', function (req, res) {
    res.render('aggregate.ejs')
});


//Se encarga de renderizar la vista 'aggregate' para enviar datos del usuario a la base de datos
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
            //Renderización a la vista de inicio (raiz)
            res.redirect('/');
        } else {
            //Error existente al cargar una tarea
            res.send('No se pudo agregar la tarea: ');
        }

    } catch (err) {
        res.send('Se produjo un error al agregar el contenido: ' + err)
    }
});


// Ruta para eliminar una tarea por su ID
app.get('/delete/:id', async function (req, res) {
    const {id} = req.params;

    try {
        const borrarTarea = await tareamodel.destroy({
            where: {
                id: id
            }
        });

        if (borrarTarea) {
            res.redirect('/')
        } else {
            res.send('No se pudo borrar el post: ')
        }
    } catch (err) {
        res.send('Se produjo un error al borrar el post: ' + err)
    }
});


//ACA AL PONER EL MIDDELWARE ME TIRA ERROR - Si pueden checkear aca sería genial
// Ruta para editar una tarea por su ID
app.get('/edit/:id', async function (req, res) {
    const {id} = req.params;

    try {
        const editarTarea = await tareamodel.findOne({
            where: {
                id: id
            }
        });

        if (editarTarea) {
            res.render('edit', {editarTarea: editarTarea})
        } else {
            res.send('No se pudo editar el post: ')
        }
    } catch (err) {
        res.send('Se produjo un editar el post: ' + err)
    }
});


// Ruta para procesar la edición de una tarea por su ID
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
            res.redirect('/')
        } else {
            res.send('No se pudo actualizar el post: ')
        }
    } catch (err) {
        res.send('Se produjo un error al actualizar el post: ' + err)
    }
});


//Llamada a la función dbTest()
dbTest();


// Inicia el servidor y muestra un mensaje con el puerto en el que se esta corriendo
app.listen(PORT, () => {
    console.log("The server is running in the port: " + PORT)
});