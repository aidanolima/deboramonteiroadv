"use client";

import React, { useState } from 'react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // CONFIGURAÇÕES EXTRAS DO FORMSUBMIT
    formData.append("_captcha", "false"); // Desativa o captcha chato de confirmação
    formData.append("_subject", "Novo Contato pelo Site - Débora Monteiro Advogada"); // Assunto do email
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/deb_monteiro@hotmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Ocorreu um erro ao processar. Por favor, tente pelo WhatsApp.");
      }
    } catch (error) {
      alert("Erro de conexão. Por favor, tente pelo WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 px-6 md:px-12 bg-white text-zinc-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* LADO ESQUERDO: INFORMAÇÕES */}
        <div className="flex-1">
          <span className="text-amber-600 font-bold tracking-wider text-sm uppercase">Entre em contato</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 mt-2 mb-6 leading-tight">
            Agende sua consulta gratuita.
          </h2>
          <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
            Dê o primeiro passo para resolver sua questão jurídica. Nossa equipe está pronta para ouvir, aconselhar e lutar pelos seus direitos. Entre em contato conosco hoje mesmo para uma consulta confidencial.
          </p>

          <div className="space-y-8">
            <ContactInfoItem 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
              title="Localização do escritório"
              desc="Cuiabá - MT"
            />
            <ContactInfoItem 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
              title="Telefone"
              desc="(65) 99113-3336"
              sub="Disponível para emergências jurídicas."
            />
            <ContactInfoItem 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
              title="E-mail"
              desc="deb_monteiro@hotmail.com"
              sub="Respondemos em até 24 horas."
            />
          </div>

          <div className="mt-12 p-6 bg-zinc-50 rounded-xl border border-zinc-100 max-w-sm">
            <h4 className="font-bold mb-4">Horário de atendimento</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Segunda a sexta:</span> <span>8h00 - 18h00</span></div>
              <div className="flex justify-between"><span>Sábado:</span> <span>9h00 - 14h00</span></div>
              <div className="flex justify-between text-zinc-400"><span>Domingo:</span> <span>Fechado</span></div>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="flex-1 bg-white border border-zinc-100 shadow-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Dados Recebidos com Sucesso!</h3>
              <p className="text-zinc-600">Retornaremos seu contato em breve.</p>
              <button onClick={() => setIsSubmitted(false)} className="mt-8 text-amber-600 font-semibold hover:underline">Enviar outra mensagem</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-2xl font-serif font-bold mb-6">Solicite uma consulta</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Primeiro nome *" name="nome" type="text" placeholder="Débora" required />
                <InputGroup label="Sobrenome *" name="sobrenome" type="text" placeholder="Monteiro" required />
              </div>

              <InputGroup label="Endereço de email *" name="email" type="email" placeholder="exemplo@email.com" required />
              <InputGroup label="Número de telefone *" name="telefone" type="tel" placeholder="(65) 99113-3336" required />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Área de prática *</label>
                <select name="area" required className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
                  <option value="">Selecione uma área</option>
                  <option value="Direito de Família">Direito de Família</option>
                  <option value="Direito Trabalhista">Direito Trabalhista</option>
                  <option value="Direito Civil">Direito Civil</option>
                  <option value="Direito Previdenciário">Direito Previdenciário</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Breve descrição do seu caso</label>
                <textarea name="mensagem" rows={4} placeholder="Como podemos ajudar?" className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"></textarea>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500" />
                <span className="text-xs text-zinc-500 leading-tight group-hover:text-zinc-700">
                  Concordo com a política de privacidade e consinto em ser contatado(a) em relação à minha solicitação.
                </span>
              </label>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition shadow-lg mt-4 uppercase tracking-widest text-sm flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar solicitação"
                )}
              </button>
              
              <p className="text-[10px] text-zinc-400 text-center uppercase tracking-tight">
                Suas informações são confidenciais e protegidas pelo sigilo entre advogado e cliente.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactInfoItem({ icon, title, desc, sub }: any) {
  return (
    <div className="flex gap-5 items-start">
      <div className="bg-zinc-900 text-white p-3 rounded-lg shadow-md">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-zinc-900">{title}</h4>
        <p className="text-zinc-600">{desc}</p>
        {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold">{label}</label>
      <input 
        {...props} 
        className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-zinc-300" 
      />
    </div>
  );
}