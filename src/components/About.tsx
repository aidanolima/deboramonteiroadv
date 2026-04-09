"use client";

import React from 'react';

export default function About() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-zinc-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* LADO ESQUERDO: Espaço para a Foto */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {/* Imagem de placeholder. Salve uma foto real como debora.jpg na pasta public */}
            <img 
              src="/debora.jpg" 
              alt="Dra. Débora Monteiro" 
              className="w-full h-full object-cover bg-zinc-200"
              onError={(e) => {
                // Fallback caso a imagem não exista ainda
                e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            {/* Badge Flutuante sobre a foto */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-zinc-100">
              <p className="font-serif font-bold text-zinc-900 text-lg">OAB/MT</p>
              <p className="text-amber-600 font-bold">00.000</p>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Textos da Biografia */}
        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <span className="text-amber-600 font-bold tracking-wider text-sm uppercase">Conheça a Especialista</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 mt-2 mb-6">
              Dra. Débora Monteiro
            </h2>
            <div className="h-1 w-20 bg-amber-600 rounded"></div>
          </div>

          <div className="space-y-5 text-zinc-600 leading-relaxed text-lg">
            <p>
              Com mais de 10 anos de atuação no mercado jurídico de Cuiabá e região, meu foco sempre foi oferecer uma advocacia artesanal, onde cada cliente é tratado com a exclusividade e a atenção que seu caso exige.
            </p>
            <p>
              Acredito que por trás de cada processo existe uma vida, uma família ou o suor de uma empresa. Por isso, nossa atuação é pautada na <strong>ética, na transparência e na busca implacável pelo melhor resultado</strong>.
            </p>
            <p>
              Formada pela Universidade Federal de Mato Grosso (UFMT) e especialista em Direito Civil e Processo Civil, lidero uma equipe preparada para blindar os seus direitos e oferecer a segurança jurídica que você precisa para dormir em paz.
            </p>
          </div>

          {/* Assinatura ou elemento visual final */}
          <div className="mt-10">
            <p className="font-serif text-2xl text-zinc-800 italic">Débora Monteiro</p>
            <p className="text-sm text-zinc-500 mt-1">Sócia Fundadora</p>
          </div>
        </div>

      </div>
    </section>
  );
}