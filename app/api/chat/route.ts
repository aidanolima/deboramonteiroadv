import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || "";

    if (!apiKey || apiKey === "sua_chave_aqui") {
      return NextResponse.json({ 
        reply: "⚠️ Erro: A Chave do Gemini não foi encontrada no arquivo .env.local." 
      });
    }

    const body = await req.json();
    
    const systemPrompt = `Você é a assistente virtual exclusiva do escritório 'Débora Monteiro Advogada', localizado em Cuiabá - MT.
    Seu tom deve ser estritamente profissional, empático, acolhedor, humanizado e direto.
    
    Suas regras:
    1. Responda dúvidas simples sobre Direito de Família, Trabalhista, Civil e Previdenciário.
    2. NÃO dê conselhos jurídicos definitivos ou pareceres. O objetivo é acalmar o cliente e levá-lo para a consulta.
    3. Sempre seja concisa, responda em parágrafos curtos.
    4. Encoraje o cliente a falar no WhatsApp (65) 99113-3336.
    5. NUNCA invente informações. Se não souber, diga que a Dra. Débora analisará o caso pessoalmente.`;

    const promptCompleto = `${systemPrompt}\n\nMensagem do cliente: ${body.message}\n\nSua resposta:`;

    // A MÁGICA: Usando o modelo de nova geração que sua chave possui!
    const googleURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
    const response = await fetch(googleURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptCompleto }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro retornado direto do Google:", data);
      return NextResponse.json({ 
        reply: `⚠️ O Google recusou a conexão. Detalhe: ${data.error?.message || 'Erro desconhecido'}` 
      });
    }

    // Extrai a resposta da IA de nova geração
    const replyText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Erro interno no servidor:", error);
    return NextResponse.json(
      { reply: "Desculpe, meu sistema está em manutenção no momento. Por favor, chame no WhatsApp: (65) 99113-3336." },
      { status: 500 }
    );
  }
}