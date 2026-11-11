// O back-end aceita a imagem como texto (data URL em base64) com limite de 2 milhões de caracteres.
// Por isso a foto é reduzida e comprimida antes de ir para o formulário.
const LADO_MAXIMO = 1280;

export function arquivoParaDataUrl(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    leitor.onload = () => {
      const imagem = new Image();
      imagem.onerror = () => reject(new Error("O arquivo escolhido não é uma imagem válida."));
      imagem.onload = () => {
        const escala = Math.min(1, LADO_MAXIMO / Math.max(imagem.width, imagem.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(imagem.width * escala);
        canvas.height = Math.round(imagem.height * escala);
        canvas.getContext("2d").drawImage(imagem, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      imagem.src = leitor.result;
    };
    leitor.readAsDataURL(arquivo);
  });
}
