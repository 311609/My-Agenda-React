const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
    isCompleted: Boolean,
    title: String,
    description: String,
    date: Date,
    hour: String,
});

// Create the Task model from the schema
const Task = mongoose.model('Task', taskSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });

        console.log('Conexión exitosa a MongoDB Atlas');
        return true; // Returns 'true' to indicate success
    }
    catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error);
        throw error;  
    }
};

async function deleteTaskById(taskId) {
    try {
        const result = await Task.findByIdAndDelete(taskId);
        return result;
    }catch (error) {
        throw error;
    }
}

module.exports = { connectDB, Task, deleteTaskById };