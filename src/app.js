import express from 'express'
import tasksRoutes from './routers/tasks.routers'
import morgan from 'morgan';
import cors from 'cors';

//settings
const app = express()

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: 'http://localhost:3000'
}));

//routes
app.set('port', process.env.PORT || 3000);
app.get('/', (req,res) => {
    res.json({message: 'welcom'})
})
app.use('/api/tasks', tasksRoutes)
export default app;