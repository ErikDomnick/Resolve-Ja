// Valida params/body/query com zod e guarda em req.validated
// (não reescreve req.query porque no Express 5 ele é somente leitura).
export const validate = (schemas) => (req, res, next) => {
  try {
    req.validated = {};
    if (schemas.params) req.validated.params = schemas.params.parse(req.params);
    if (schemas.body) req.validated.body = schemas.body.parse(req.body ?? {});
    if (schemas.query) req.validated.query = schemas.query.parse(req.query);
    next();
  } catch (e) {
    next(e);
  }
};
