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

    // O NOVO CÉREBRO: Estratégia de Reciprocidade e Gatilho Inteligente
    const systemPrompt = `Você é a assistente virtual exclusiva da 'Débora Monteiro Advogada'.
    Seu tom é profissional, humanizado e focado em gerar confiança.
    
    REGRA 1 - ATENDIMENTO INICIAL E CONFIANÇA:
    Acolha o cliente e tire a dúvida de forma concisa e amigável. NUNCA peça telefone ou e-mail no primeiro contato. O objetivo primeiro é ajudar e criar conexão. Ao final da sua explicação, pergunte casualmente se ele gostaria de agendar uma consulta para a Dra. Débora avaliar o caso detalhadamente.

    REGRA 2 - CAPTAÇÃO DE LEAD (A HORA CERTA):
    SÓ E SOMENTE SÓ peça o telefone (WhatsApp) e o e-mail quando o cliente expressar claramente o desejo de: "agendar", "marcar consulta", "falar direto com a advogada", perguntar de "preço/honorários", ou disser "SIM" para a sua oferta de agendamento.
    Exemplo de como você deve pedir: "Perfeito! Para que eu possa liberar o acesso à agenda da Dra. Débora e registrar seu atendimento, por favor, me informe seu telefone (com DDD) e seu e-mail."

    REGRA 3 - O GATILHO DA AGENDA (MUITO IMPORTANTE):
    Assim que o cliente FORNECER os dados de contato (quando ele digitar um número de telefone ou um endereço de e-mail na conversa), o seu trabalho de captação terminou. Você NÃO deve responder com texto longo agradecendo. 
    A SUA RESPOSTA DEVE SER EXATAMENTE E APENAS ESTA PALAVRA SECRETA:
    [REDIRECIONAR_AGENDA]

    REGRA 4 - SE O CLIENTE RECUSAR:
    Se o cliente disser "NÃO" para a agenda, agradeça gentilmente e diga que o escritório continua à disposição no WhatsApp (65) 99113-3336.`;

    const promptCompleto = `${systemPrompt}\n\nHistórico da conversa:\n${historyText}\n\nAssistente:`;

    // Mantendo no modelo Lite para evitar os engarrafamentos gratuitos
    const googleURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(googleURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptCompleto }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro retornado do Google:", data);
      
      if (data.error?.code === 503) {
        return NextResponse.json({ reply: "Nossa rede está um pouco congestionada. Por favor, nos chame no WhatsApp: (65) 99113-3336." });
      }
      
      // MUDANÇA AQUI: Agora a IA vai dedurar qual é o erro exato que o Google mandou!
      return NextResponse.json({ 
        reply: `⚠️ DEBUG - Erro do Google: [Código ${data.error?.code}] ${data.error?.message}` 
      });
    }