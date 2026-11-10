import * as relatorioService from '../services/relatorioService.js';

export async function resumo(req, res, next) {
  try { res.json(await relatorioService.resumo()); } catch (e) { next(e); }
}
