const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: '3.84.98.220',
  user: 'usuario',
  password: 'contraseña',
  database: 'examen' // Cambia esto si la base de datos no se llama "examen"
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Configurar middleware para manejar datos de formulario
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Ruta para procesar el formulario y insertar datos en la tabla "alumno"
app.post('/insertar', (req, res) => {
  const datosAlumno = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad
  };

  // Insertar datos en la tabla "alumno"
  db.query('INSERT INTO alumno SET ?', datosAlumno, (err, result) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Datos insertados correctamente:', result);
      res.send('Datos insertados correctamente');
    }
  });
});

app.get('/alumnos', (req, res) => {
  // Obtener la lista de alumnos desde la base de datos
  db.query('SELECT * FROM alumno', (err, resultados) => {
    if (err) {
      console.error('Error al obtener alumnos:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      // Enviar la lista de alumnos como respuesta
      res.json(resultados);
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
