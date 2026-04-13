import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || "";

    if (!apiKey || apiKey === "sua_chave_aqui") {
      return NextResponse.json({ 
        reply: "⚠️ Erro interno de configuração de chave." 
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
    5. NUNCA invente informações.`;

    const promptCompleto = `${systemPrompt}\n\nMensagem do cliente: ${body.message}\n\nSua resposta:`;

    // 1. MUDANÇA ESTRATÉGICA: Usando a versão "Lite" que tem menos fila de espera
    const googleURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

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

    // 2. RESPOSTA ELEGANTE SE O GOOGLE CAIR:
    if (!response.ok) {
      console.error("Erro retornado do Google:", data);
      
      // Se for o erro 503 (Alta Demanda), o cliente recebe essa mensagem humanizada:
      if (data.error?.code === 503) {
        return NextResponse.json({ 
          reply: "No momento todos os nossos especialistas estão em atendimento e minha rede está um pouco congestionada. 😅\n\nPara que você não fique esperando, por favor, me chame diretamente no WhatsApp clicando no botão verde ou adicionando o número (65) 99113-3336. A Dra. Débora fará questão de te atender!" 
        });
      }

      return NextResponse.json({ 
        reply: `Sistema indisponível no momento. Por favor, acesse nosso WhatsApp: (65) 99113-3336.` 
      });
    }

    const replyText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Erro interno no servidor:", error);
    return NextResponse.json(
      { reply: "Olá! Devido ao alto volume de contatos, peço gentilmente que nos chame direto no WhatsApp: (65) 99113-3336. Nossa equipe está de prontidão!" },
      { status: 500 }
    );
  }
}