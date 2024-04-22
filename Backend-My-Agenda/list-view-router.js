const express = require('express');
const router = express.Router();
const Task = require('./db').Task;

router.get('/', async (req, res) => {
    try {
        // Perform the query to the database to obtain all the tasks
        const tasks = await Task.find();

        res.json(tasks);
    }catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

// Route to get a task by its ID
router.get('/:taskId', async (req, res) => {
     console.log(`Solicitud GET recibida en la ruta /list-view/${req.params.taskId}`);

 // Get task ID from request parameters
 const taskId = req.params.taskId;
 
 try{
    // Query the database to obtain the task by its ID
    const task = await Task.findById(taskId);
    // Check if the task was found in the database
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
 }catch (error) {
    console.error('Error al obtener la tarea:', error);
    rmSync.status(500).json({ error: 'Error al obtener la tarea' });
 }
});

module.exports = router;