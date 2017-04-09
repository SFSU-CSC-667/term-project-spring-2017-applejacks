// API index.js
import express from 'express';
import { printlog } from './../utils/helpers';
import logApi from './logmessage';

const router = express.Router();

// load all API routes
router.use('/logmessage', logApi);

/*
  // example API route
  router.use('<API relative path>', '<APIHandler imported above>')
 */

export default router;