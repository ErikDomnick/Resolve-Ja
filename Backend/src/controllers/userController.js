import * as userService from '../services/userService.js';

export async function index(req, res, next) {
  try { res.json(await userService.listUsers()); } catch (e) { next(e); }
}

export async function show(req, res, next) {
  try {
    const user = await userService.getUserById(req.validated.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try { res.status(201).json(await userService.createUser(req.validated.body)); } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    res.json(await userService.updateUser(req.validated.params.id, req.validated.body));
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    await userService.deleteUser(req.validated.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}
