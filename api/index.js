// API index.js
import express from 'express';
import { printlog } from './../utils/helpers';
import logApi from './logmessage';
import gameApi from './game';
import lobbyApi from './lobby';

const router = express.Router();

// load all API routes
router.use('/logmessage', logApi);
router.use('/game', gameApi);
router.use('/lobby', lobbyApi);

/*
  // example API route
  router.use('<API relative path>', '<APIHandler imported above>')
 */

export default router;