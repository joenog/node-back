import { Client } from 'google-generative-ai';

// Substitua por sua chave de API
const apiKey = process.env.GEMINI_API_KEY;

// Cria um cliente
const client = new Client();
client.configure({ apiKey }); // Configura a chave de API no cliente

// Obtém o modelo
async function getModel() {
  return await client.getModel('gemini-1.5-flash');
}

// Função principal para gerar descrição
export default async function gerarDescricaoComGemini(imageBuffer, customPrompt = null) {
  try {
    // Personaliza o prompt se necessário
    const prompt = customPrompt || 'Um alt text em português do Brasil para a seguinte imagem:';

    // Cria os dados da imagem
    const image = {
      imageData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/png',
      },
    };

    // Obtém o modelo antes de gerar o conteúdo
    const model = await getModel();

    // Gera conteúdo usando a API
    const response = await client.generateText({
      model: model.name,
      prompt,
      temperature: 0.7,
      candidateCount: 1,
    });

    return response.candidates?.[0]?.output || null;
  } catch (error) {
    console.error('Erro ao gerar descrição:', error);
    return null;
  }
}

// Exemplo de uso
/*
const imageBuffer = ... seu buffer de imagem aqui ...;
const customPrompt = 'Descreva esta imagem de forma criativa e poética:';

gerarDescricaoComGemini(imageBuffer, customPrompt)
  .then(result => console.log(result))
  .catch(error => console.error(error));
*/
