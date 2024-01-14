import { OpenAIClass } from "./openai";
// import openAIMock from "./mock.json";
export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
    };
    const headers = {
      ...corsHeaders,
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers"
      ),
      "Content-Type": "application/json",
    };
    try {
      const openai = new OpenAIClass(env.openai_key);
      const { categoria, dicas: totalDicas } = await new Response(
        request.body
      ).json();
      const resp = await openai.dica({ categoria, totalDicas });
      // const resp = openAIMock;
      const {
        message: { content: content },
      } = resp.choices[0];
      console.log("content", content);
      const arrContent = content.split("\n");
      const resposta = arrContent.shift();
      const dicas = arrContent;
      const body = {
        resposta,
        dicas,
      };
      // FORMAT RESPONSE
      return new Response(JSON.stringify(body), {
        headers,
      });
    } catch (error) {
      console.log(error);
      const body = {
        success: false,
      };
      return new Response(JSON.stringify(body), {
        headers,
      });
    }
  },
};
