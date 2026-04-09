import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 py-12 px-6 text-sm border-t border-amber-900/30 overflow-hidden">
      
      {/* 1. IMAGEM DE FUNDO E EFEITO 'FUMÊ DOURADO' NO RODAPÉ */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Fundo Rodapé"
          className="w-full h-full object-cover opacity-25" 
        />
        {/* Filtro Luz Dourada/Âmbar suave subindo da base */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent"></div>
        {/* Gradiente Fumê para garantir a leitura perfeita do texto sobre a imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/70 to-zinc-950/50"></div>
      </div>

      {/* 2. CONTEÚDO DO RODAPÉ (Trazido para frente com z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-6">
        
        {/* LADO ESQUERDO: Empresa e OAB */}
        <div className="flex-1">
          <h4 className="text-2xl font-serif font-bold text-white mb-2">Débora Monteiro</h4>
          <p className="mb-1 text-base font-medium text-zinc-300">Advocacia e Consultoria Jurídica</p>
          <p className="text-amber-500 font-semibold text-lg">OAB/MT 00.000</p>
        </div>

        {/* LADO DIREITO: Fale Conosco */}
        <div className="flex-1 md:text-right flex flex-col items-start md:items-end gap-3">
          <p className="text-lg font-bold text-white mb-2 underline decoration-amber-500/50 decoration-2 underline-offset-4">Fale Conosco</p>
          
          <p className="flex items-center gap-2 group">
            <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <a href="mailto:contato@deboramonteiroadv.com.br" className='text-zinc-300 hover:text-white transition-colors'>contato@deboramonteiroadv.com.br</a>
          </p>
          
          <p className="flex items-center gap-2 group">
            <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <span className='text-zinc-300'>(65) 99113-3336</span>
          </p>
          
          <p className="flex items-center gap-2 group">
            <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className='text-zinc-300'>Cuiabá - MT</span>
          </p>
        </div>

      </div>
      
      {/* 3. BARRA FINAL (Créditos e Direitos) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-10 pt-8 border-t border-zinc-800/80 text-center md:text-left flex flex-col md:flex-row justify-between text-zinc-400">
        <p>
          &copy; {currentYear}{" "}
          <a 
            href="https://aslsolucoestech.com.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
          >
            ASL Soluções Tech
          </a>
          . Todos os direitos reservados.
        </p>
        
        <p className="mt-2 md:mt-0">
          Desenvolvido por <a href="https://github.com/aidanolima" target="_blank" rel="noopener noreferrer" className='text-zinc-200 hover:text-amber-400 font-medium transition-colors'>Áidano Lima</a> com <span className='text-zinc-300 font-semibold'>Next.js</span>
        </p>
      </div>
    </footer>
  );
}