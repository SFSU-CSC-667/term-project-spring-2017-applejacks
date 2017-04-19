import { printlog } from './helpers';

export default (req, res, next) => {
  if (req.session.name) {
    printlog('authenticated');
    next();
  } else {
    printlog('auth failed. Redirect.');
    res.redirect('/signup');
  }
};