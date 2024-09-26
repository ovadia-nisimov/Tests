import { Router } from 'express';
import { getBeepers, createBeeper, updateBeeperStatus, deleteBeeper, getBeeperById, getBeepersByStatus } from '../controllers/beeperController';

const router = Router();

router.post('/', createBeeper);
router.get('/', getBeepers);
router.get('/:id', getBeeperById);
router.put('/:id/status', updateBeeperStatus);
router.delete('/:id', deleteBeeper);
router.get('/status/:status', getBeepersByStatus);

export default router;
