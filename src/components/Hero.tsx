import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center text-zinc-900 pt-32 pb-16 px-6 md:px-12 overflow-hidden">
      
      {/* 1. IMAGEM DE FUNDO E EFEITO 'FUMÊ DOURADO' (CORRIGIDO) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" // Imagem mantida
          alt="Luminoso Fundo Advocacia Premium"
          // Opacidade ajustada para visibilidade detalhada
          className="w-full h-full object-cover opacity-20" 
        />
        {/* Overlay Dourado/Âmbar Difuso (Substitui o overlay preto pesado) */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 via-transparent to-amber-50/40"></div>
        {/* Sutil gradiente para legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950/20 opacity-80"></div>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL (Texto em tons suaves de gold e branco) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Badge de Credibilidade (Dourado Claro/Smoky) */}
          <div className="inline-flex items-center gap-3 bg-amber-50/70 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-xs font-medium mb-6 backdrop-blur-sm shadow-inner">
            {/* Ícone Verde Piscando Mantido */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="uppercase tracking-wider font-semibold">
              Atendimento Especializado em Cuiabá e Região
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight text-white">
            Defesa sólida e <span className='text-amber-500'>atendimento humanizado</span> para os seus direitos
          </h1>
          
          <div className="h-1 w-24 bg-amber-500 rounded mb-8"></div> {/* Linha decorativa */}

          <p className="text-lg md:text-xl text-zinc-200 mb-12 max-w-2xl leading-relaxed">
            O escritório Débora Monteiro atua com dedicação, ética e excelência para garantir a melhor solução jurídica para o seu caso, focando na segurança e bem-estar de nossos clientes.
          </p>
          
          {/* BOTOES DE CTA duplos (Tons Amber/Gold) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a
              href="https://wa.me/5565991133336" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded transition duration-300 shadow-lg text-center"
            >
              Fale com uma Especialista
            </a>
            <a
              href="#servicos" 
              className="inline-block bg-transparent hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold py-4 px-10 rounded transition duration-300 text-center"
            >
              Conheça nossas Áreas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}