import 'dotenv/config';

const faltando = ['JWT_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'].filter((k) => !process.env[k]);
if (faltando.length) {
  console.error(`Defina no .env: ${faltando.join(', ')} (veja .env.example)`);
  process.exit(1);
}

const { default: app } = await import('./app.js');

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
