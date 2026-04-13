"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [chatLog, setChatLog] = useState([
    { role: 'ai', content: 'Olá! Sou a assistente virtual do escritório Débora Monteiro. Como posso ajudar com o seu caso hoje?' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isLoading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const userMessage = mensagem;
    
    setChatLog((prev) => [...prev, { role: 'user', content: userMessage }]);
    setMensagem('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      // Se a rota não for encontrada (Erro 404)
      if (response.status === 404) {
        setChatLog((prev) => [...prev, { role: 'ai', content: 'Erro: Rota da API não encontrada. Verifique se o arquivo está em app/api/chat/route.ts' }]);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setChatLog((prev) => [...prev, { role: 'ai', content: data.reply }]);
      } else {
        setChatLog((prev) => [...prev, { role: 'ai', content: 'Desculpe, a IA encontrou um erro. Chame no WhatsApp: (65) 99113-3336.' }]);
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      setChatLog((prev) => [...prev, { role: 'ai', content: 'Erro de conexão com o servidor. Por favor, acesse nosso WhatsApp!' }]);
    } finally {
      setIsLoading(false); // Garante que destrava o botão de enviar
    }
  };

  return (
    <>
      {/* BOTÃO FLUTUANTE */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-amber-600 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-amber-700 hover:scale-110 transition-all duration-300 group"
          aria-label="Abrir Atendimento"
        >
          <span className="absolute inset-0 rounded-full bg-amber-600 animate-ping opacity-25"></span>
          <span className="relative font-serif font-bold text-xl">DM</span>
        </button>
      )}

      {/* JANELA DE CHAT */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full h-[100dvh] md:w-[380px] md:h-[600px] bg-white md:rounded-2xl shadow-2xl flex flex-col border border-zinc-200 overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          
          {/* CABEÇALHO */}
          <div className="bg-zinc-950 p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-serif font-bold">
                DM
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Assistente Virtual</h3>
                <p className="text-amber-500 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online agora
                </p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-zinc-400 hover:text-white transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* ÁREA DAS MENSAGENS */}
          <div className="flex-1 bg-zinc-50 p-4 overflow-y-auto flex flex-col gap-4">
            <div className="text-center text-xs text-zinc-400 my-2">Hoje</div>
            
            {chatLog.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm rounded-2xl ${msg.role === 'user' ? 'bg-amber-600 text-white rounded-tr-none' : 'bg-white border border-zinc-200 text-zinc-800 shadow-sm rounded-tl-none whitespace-pre-wrap'}`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl rounded-tl-none p-4 flex gap-1">
                  <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* ÁREA DE DIGITAÇÃO */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-zinc-100 flex gap-2">
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-zinc-100 text-zinc-900 placeholder:text-zinc-500 text-sm rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={!mensagem.trim() || isLoading}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-300 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>

        </div>
      )}
    </>
  );
}