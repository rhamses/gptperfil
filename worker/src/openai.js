import OpenAI from "openai";

export class OpenAIClass {
  constructor(key) {
    this.key = key;
    this.openai = new OpenAI({ apiKey: this.key });
    this.messages = [];
    this.model = "gpt-3.5-turbo";
  }
  async dica(params) {
    const { totalDicas, categoria } = params;
    this.messages = [
      {
        role: "assistant",
        content:
          "Vamos jogar perfil? Eu escolho a categoria " +
          categoria +
          ". Eu preciso que você me dê a resposta e as dicas. Eu preciso de " +
          totalDicas +
          " dicas. O primeito item da lista precisa ser apenas a resposta das dicas sem mais nenhum texto antes ou depois. Em seguida escreva a lista não numerada com as dicas. Não coloque qualquer texto antes ou depois da lista. Remova qualquer dica onde contenha a resposta ou qualquer palavra da resposta ou semelhante a resposta no texto",
      },
    ];
    return await this.processText();
  }

  async processText() {
    return await this.openai.chat.completions.create({
      messages: this.messages,
      model: this.model,
    });
  }
}
