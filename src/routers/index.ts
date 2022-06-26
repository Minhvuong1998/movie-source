import express from 'express';
import movie from './movie';
import auth from './auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/movie', movie);

export default router;
