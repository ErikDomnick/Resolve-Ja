import * as adminService from '../services/adminService.js';

export function login(req, res, next) {
  try { res.json(adminService.login(req.validated.body)); } catch (e) { next(e); }
}
