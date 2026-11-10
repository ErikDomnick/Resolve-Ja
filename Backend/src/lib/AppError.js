// Erro "esperado": o errorHandler devolve status + mensagem ao cliente.
export class AppError extends Error {
  constructor(message, status = 400, details) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.details = details;
  }
}
