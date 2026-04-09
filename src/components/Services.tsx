import React from 'react';

// Adicionamos SVGs diretamente no array para evitar instalar bibliotecas extras
const servicesList = [
  { 
    title: "Direito de Família", 
    desc: "Atuação em divórcios, pensão alimentícia, guarda, inventários e partilha de bens com discrição e empatia.",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    title: "Direito Trabalhista", 
    desc: "Defesa dos direitos do trabalhador, cálculos rescisórios, horas extras, assédio moral e acidentes de trabalho.",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    title: "Direito Civil", 
    desc: "Elaboração e revisão de contratos, ações de indenização, responsabilidade civil e cobranças judiciais.",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  { 
    title: "Direito Previdenciário", 
    desc: "Aposentadorias, auxílio-doença, revisões de benefícios e planejamento previdenciário completo.",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
];

export default function Services() {
  return (
    <section className="py-20 px-6 md:px-12 bg-zinc-50 text-zinc-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-4">
            Áreas de Atuação
          </h2>
          <div className="h-1 w-20 bg-amber-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl border border-zinc-100 border-t-4 border-t-amber-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default shadow-sm group flex flex-col items-start"
            >
              {/* O Ícone agora aparece aqui no topo do card */}
              <div className="bg-amber-50 p-3 rounded-lg mb-5 group-hover:bg-amber-100 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-800 transition-colors duration-300 group-hover:text-amber-700">
                {service.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}