import * as userService from '../services/userService.js';

export async function index(req, res, next) {
  try { res.json(await userService.listUsers()); } catch (e) { next(e); }
}

export async function show(req, res, next) {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name e email são obrigatórios' });
    res.status(201).json(await userService.createUser({ name, email }));
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const { name, email } = req.body;
    res.json(await userService.updateUser(Number(req.params.id), { name, email }));
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (e) { next(e); }
}