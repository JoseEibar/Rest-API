import Task from '../models/task';
import {getPagination} from '../libs/getPagination';

export const findAllTAsks = async (req,res) => {
    try {
        const {page, size, title} = req.query;
        const condition = title
        ? {title: {$regex: new RegExp(title), $options: "i"}}
        : {};
        const {limit, offset} = getPagination(page,size);
        const data = await Task.paginate(condition,{offset: offset, limit: limit});
        res.json({
            totalItems:data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage:data.page - 1
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocurrio un error al encontrar tareas!"
        });
    }
};

export const createTask = async (req,res) => {
    if(!req.body.title){
        return res.status(400).send({message: 'El titulo es obligatorio!!!.'})
    }
    try {
        const newTask = new Task({
            title: req.body.title,
            description:req.body.description,
            done: req.body.done ? req.body.done : false
        });
        const taskSaved = await newTask.save();
        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocurrio un error al crear la tarea!"
        });
    }
};

export const findOneTask = async (req,res) => {
    const {id} = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({message: `La tarea: ${id}, no fue encontrada`});
        };
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error al delvolver la tarea: ${id}`
        });
    }
};

export const deleteTask = async (req,res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({
            message: "Task were deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || `Ocurrio un error al borrar la tarea: ${id}`
        });
    }
};

export const findAllDoneTasks = async (req,res) => {
    try {
        const tasks = await Task.find({done: true});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Error al encontrar las tareas done!'
        });
    }
};

export const updateTask = async (req,res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.json({message: "Task was update successfully"});
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Error al actulizar la tarea!'
        });
    }
};