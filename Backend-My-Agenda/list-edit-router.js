
const express = require('express');
const router = express.Router();
const Task = require('./db').Task;

// Ruta para marcar una tarea como completada
router.put('/:taskId/completed', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        // Encuentra la tarea por su ID y actualiza el estado a completado
        const updatedTask = await Task.findByIdAndUpdate(taskId, { isCompleted: true }, { new: true });
        
        // Verifica si la tarea fue encontrada y actualizada correctamente
        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        
        res.json(updatedTask);
    } catch (error) {
        console.error('Error al marcar la tarea como completada:', error);
        res.status(500).json({ error: 'Error al marcar la tarea como completada' });
    }
});

module.exports = router;
