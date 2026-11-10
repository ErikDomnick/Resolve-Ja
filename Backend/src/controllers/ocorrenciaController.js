import * as service from '../services/ocorrenciaService.js';

export async function create(req, res, next) {
  try { res.status(201).json(await service.criar(req.validated.body)); } catch (e) { next(e); }
}

export async function index(req, res, next) {
  try { res.json(await service.listar(req.validated.query)); } catch (e) { next(e); }
}

export async function show(req, res, next) {
  try { res.json(await service.buscar(req.validated.params.id)); } catch (e) { next(e); }
}

export async function acompanhar(req, res, next) {
  try {
    res.json(await service.acompanhar(req.validated.params.id, req.validated.query.email));
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    res.json(await service.atualizar(req.validated.params.id, req.validated.body));
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    await service.remover(req.validated.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}
