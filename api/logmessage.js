import express from 'express';
import { printlog } from './../utils/helpers';

const router = express.Router();

router.get('/', (req, res) => {
  const { db } = res;

  setTimeout(() => {
    res.json({
      data: ['a','b', 'c'],
      valid: true
    });
  }, 1000);
});

export default router;