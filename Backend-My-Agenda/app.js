const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const { connectDB, Task, deleteTaskById } = require('./db');
const cors = require('cors'); // Import cors middleware correctly
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  try {
    await connectDB();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors()); // Uses cors middleware

    // Middleware to verfy HTTP method
    app.use((req, res, next) => {
      if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
        return res.status(400).json({ error: 'Método HTTP no válido' });
      }
      next();
    });

    // Routes
    app.use('/list-view', listViewRouter);
    app.use('/list-view', listEditRouter);

    // Route to obtain the data from the 'tasks' collection
    app.get('/tasks', async (req, res) => {
      try {
        const tasks = await Task.find({});
        res.json(tasks);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
      }
    });

    // Path to insert a task into the 'tasks' database
    app.post('/tasks', async (req, res) => {
      const { title, description, date, hour } = req.body;
      const task = new Task({
        title: title,
        description: description,
        date: date,
        hour: hour,
        isCompleted: false,
      });

      try {
        await task.save();
        res.json({ message: 'Tarea insertada correctamente' });
      } catch (error) {
        console.error('Error al insertar la tarea', error);
        res.status(500).json({ error: 'Error al insertar la tarea' });
      }
    });

    // Path to delete a task from the 'tasks' database by its ID
    app.delete('/tasks/:taskId', async (req, res) => {
      const taskId = req.params.taskId;

      try {
        await deleteTaskById(taskId);
        res.json({ message: 'Tarea eliminada correctamente' });
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
      }
    });

    // Path to mark a task as completed by its ID
    app.put('/tasks/:taskId/completed', async (req, res) => {
    const taskId = req.params.taskId;

       try {
         // Buscar la tarea por su ID y actualizar el campo isCompleted a true
         await Task.findByIdAndUpdate(taskId, { isCompleted: true });
         res.json({ message: 'Tarea marcada como completada correctamente' });
       } catch (error) {
         console.error('Error al marcar la tarea como completada:', error);
         res.status(500).json({ error: 'Error al marcar la tarea como completada' });
       }
     });


    const port = 3001;
    const host = 'localhost';
    app.listen(port, host, () => {
      console.log(`Servidor iniciado en el puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();
