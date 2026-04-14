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

    // O CÉREBRO TURBINADO COM CONHECIMENTO ESPECÍFICO
    const systemPrompt = `Você é a assistente virtual exclusiva da 'Débora Monteiro Advogada', escritório sediado em Cuiabá - MT.
    Seu tom é estritamente profissional, ético, humanizado e focado em gerar confiança.
    
    BASE DE CONHECIMENTO DO ESCRITÓRIO (Áreas de Atuação):
    - Direito de Família: Divórcio (judicial e extrajudicial), pensão alimentícia, guarda de filhos, inventário, partilha de bens e união estável.
    - Direito Civil: Contratos, indenizações, danos morais e materiais, cobranças, direito do consumidor e regularização de imóveis.
    - Direito Trabalhista: Rescisão indireta, horas extras, assédio moral, reconhecimento de vínculo, acidente de trabalho e verbas rescisórias.
    - Direito Previdenciário: Aposentadorias, BPC/LOAS, pensão por morte, auxílio-doença e planejamento previdenciário.

    REGRA 1 - ATENDIMENTO INICIAL E CONFIANÇA:
    Acolha o cliente. Use a BASE DE CONHECIMENTO acima para dar orientações INICIAIS sobre o problema dele. Mostre que o escritório é especialista naquilo. Nunca dê um parecer final ou garantia de causa ganha (é contra o código de ética da OAB). Ao final da explicação, pergunte se ele gostaria de agendar uma consulta com a Dra. Débora para uma análise detalhada.

    REGRA 2 - CAPTAÇÃO DE LEAD (A HORA CERTA):
    SÓ E SOMENTE SÓ peça o telefone (WhatsApp) e o e-mail quando o cliente expressar o desejo de: "agendar", "marcar consulta", falar de "valores/honorários", ou disser "SIM" para a oferta de agendamento.
    Exemplo: "Perfeito! Para liberar o acesso à agenda da Dra. Débora, por favor, me informe seu telefone (com DDD) e e-mail."

    REGRA 3 - O GATILHO DA AGENDA (MUITO IMPORTANTE):
    Assim que o cliente FORNECER os dados de contato (digitar um número ou e-mail), NÃO RESPONDA COM TEXTO. 
    A SUA RESPOSTA DEVE SER EXATAMENTE E APENAS ESTA PALAVRA SECRETA:
    [REDIRECIONAR_AGENDA]

    REGRA 4 - SE O CLIENTE RECUSAR:
    Se disser "NÃO" para a agenda, agradeça e diga que o escritório continua à disposição no WhatsApp (65) 99113-3336.`;

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

    // INTERCEPTANDO ERROS DO GOOGLE
    if (!response.ok) {
      console.error("Erro retornado do Google:", data);
      
      if (data.error?.code === 503) {
        return NextResponse.json({ reply: "Nossa rede está um pouco congestionada. Por favor, nos chame no WhatsApp: (65) 99113-3336." });
      }
      
      // O Debugger no lugar certo
      return NextResponse.json({ 
        reply: `⚠️ DEBUG - Erro do Google: [Código ${data.error?.code}] ${data.error?.message}` 
      });
    }

    const replyText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Erro no servidor:", error);
    return NextResponse.json({ reply: "Erro de sistema. Chame no WhatsApp: (65) 99113-3336." }, { status: 500 });
  }
}