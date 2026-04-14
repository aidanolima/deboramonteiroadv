import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || "";

    if (!apiKey || apiKey === "AIzaSyD8rINDdjts2FYrdEnKaB4GbCGSamO1AuU") {
      return NextResponse.json({ reply: "⚠️ Erro: Chave do Gemini não configurada." });
    }

    const body = await req.json();
    
    // Agora recebemos o histórico inteiro da conversa para a IA ter "memória"
    const history = body.history || [];
    const historyText = history.map((msg: any) => `${msg.role === 'user' ? 'Cliente' : 'Assistente'}: ${msg.content}`).join('\n');

    // A MENTE DA ASSISTENTE (FUNIL DE VENDAS ATIVADO)
    const systemPrompt = `Você é a assistente virtual exclusiva da 'Débora Monteiro Advogada'.
    Seu tom é profissional, humanizado e focado em converter o atendimento em consulta.
    
    REGRA 1 - CAPTAÇÃO DE LEAD (MUITO IMPORTANTE):
    Logo na sua PRIMEIRA resposta, após dar boas-vindas e acolher a dúvida do cliente, VOCÊ DEVE pedir o telefone (WhatsApp) e o e-mail dele para "registrar o atendimento no sistema". Nunca avance profundamente no caso sem pedir esses dados.

    REGRA 2 - A OFERTA DE AGENDA:
    Quando o cliente falar sobre agendar, honorários, valores, ou quiser falar com a advogada, pergunte DIRETAMENTE: 
    "Você gostaria de agendar uma consulta com a Dra. Débora para avaliarmos os detalhes do seu caso? Responda SIM ou NÃO."

    REGRA 3 - O GATILHO DO SIM:
    Se o cliente responder "SIM" (ou qualquer variação de concordância), você NÃO deve responder com texto longo. Responda EXATAMENTE E APENAS com esta palavra secreta: 
    [REDIRECIONAR_AGENDA]

    REGRA 4 - O GATILHO DO NÃO:
    Se o cliente responder "NÃO", diga que compreende perfeitamente, reforce que o escritório está à disposição e pergunte se há mais alguma dúvida rápida que você possa anotar.`;

    const promptCompleto = `${systemPrompt}\n\nHistórico da conversa:\n${historyText}\n\nAssistente:`;

    // Usando o modelo de nova geração que sua chave liberou!
    const googleURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(googleURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptCompleto }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error?.code === 503) {
        return NextResponse.json({ reply: "Nossa rede está um pouco congestionada. Por favor, nos chame no WhatsApp: (65) 99113-3336." });
      }
      return NextResponse.json({ reply: `Sistema indisponível. WhatsApp: (65) 99113-3336.` });
    }

    const replyText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    return NextResponse.json({ reply: "Erro de sistema. Chame no WhatsApp: (65) 99113-3336." }, { status: 500 });
  }
}