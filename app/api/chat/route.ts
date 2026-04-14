import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || "";

    if (!apiKey || apiKey === "sua_chave_aqui") {
      return NextResponse.json({ reply: "⚠️ Erro: Chave do Gemini não configurada." });
    }

    const body = await req.json();
    
    const history = body.history || [];
    const historyText = history.map((msg: any) => `${msg.role === 'user' ? 'Cliente' : 'Assistente'}: ${msg.content}`).join('\n');

    // O CÉREBRO SIMPLES E DIRETO (Modo Secretária Executiva)
    const systemPrompt = `Você é a assistente virtual exclusiva da 'Débora Monteiro Advogada'.
    Seu tom é acolhedor, conciso e amigável. Suas respostas devem ser curtas (no máximo 2 parágrafos).
    
    REGRA DE OURO (CONVERSA NATURAL):
    NUNCA liste as áreas de atuação ou serviços de forma proativa. 
    Se o cliente disser apenas "Oi", "Olá" ou "Bom dia", responda APENAS: "Olá! Bem-vindo(a) ao escritório Débora Monteiro. Como posso te ajudar hoje?" e espere ele falar.
    
    BASE DE CONHECIMENTO OCULTA (Use apenas se perguntarem):
    - O escritório atende: Direito de Família (divórcio, pensão), Trabalhista, Civil e Previdenciário.

    REGRA DO FUNIL DE VENDAS:
    1. Responda a dúvida do cliente de forma muito breve e pergunte se ele quer agendar uma consulta com a Dra. Débora.
    2. SÓ PEÇA telefone e e-mail SE o cliente disser que quer agendar, perguntar preço ou disser "SIM". Exemplo: "Perfeito! Para liberar a agenda, preciso do seu telefone e e-mail."
    
    REGRA DO GATILHO DA AGENDA:
    Assim que o cliente digitar um telefone ou e-mail na conversa, NÃO responda com texto. 
    A SUA RESPOSTA DEVE SER EXATAMENTE E APENAS:
    [REDIRECIONAR_AGENDA]`;

    const promptCompleto = `${systemPrompt}\n\nHistórico da conversa:\n${historyText}\n\nAssistente:`;
    
    const googleURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(googleURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptCompleto }] }]
      })
    });

    const data = await response.json();

    // INTERCEPTANDO ERROS DO GOOGLE (VERSÃO PRODUÇÃO)
    if (!response.ok) {
      console.error("Erro retornado do Google:", data);
      
      // Se for erro de Limite de Testes (429) ou Congestionamento (503)
      if (data.error?.code === 429 || data.error?.code === 503) {
        return NextResponse.json({ 
          reply: "Nossa rede está com muitos acessos neste momento. 😅\n\nPara que você não fique esperando, por favor, me chame diretamente no WhatsApp: (65) 99113-3336. A Dra. Débora fará questão de te atender!" 
        });
      }
      
      return NextResponse.json({ 
        reply: `Sistema indisponível no momento. Por favor, acesse nosso WhatsApp: (65) 99113-3336.` 
      });
    }

    const replyText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Erro no servidor:", error);
    return NextResponse.json({ reply: "Erro de sistema. Chame no WhatsApp: (65) 99113-3336." }, { status: 500 });
  }
}