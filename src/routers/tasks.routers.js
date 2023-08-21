import {Router} from 'express';
import * as taskCtrl from '../controlers/task.controlers';

const router = Router();
router.get('/', taskCtrl.findAllTAsks);
router.post('/', taskCtrl.createTask);
router.get('/done', taskCtrl.findAllDoneTasks);
router.get('/:id', taskCtrl.findOneTask);
router.delete('/:id',taskCtrl.deleteTask);
router.put('/:id', taskCtrl.updateTask);

export default router;