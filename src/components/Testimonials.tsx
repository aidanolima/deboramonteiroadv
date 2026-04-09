import React from 'react';

const testimonialsList = [
  {
    name: "Carlos Eduardo Silva",
    role: "Empresário",
    text: "A Dra. Débora foi fundamental em uma causa cível da minha empresa. Profissionalismo ímpar, sempre me mantendo informado de cada passo do processo. O resultado foi além do esperado.",
  },
  {
    name: "Ana Lúcia Ferreira",
    role: "Cliente de Direito de Família",
    text: "Passei por um divórcio muito conturbado e encontrei no escritório o acolhimento e a firmeza necessários. A humanidade no atendimento fez toda a diferença na fase mais difícil da minha vida.",
  },
  {
    name: "Roberto Mendes",
    role: "Cliente Trabalhista",
    text: "Excelente escritório! Conseguiram resolver meu problema trabalhista que se arrastava há anos com a antiga empresa. Competência, honestidade e agilidade. Recomendo de olhos fechados.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-zinc-100 text-zinc-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold tracking-wider text-sm uppercase">Prova Social</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mt-2 mb-4">
            O que dizem nossos clientes
          </h2>
          <div className="h-1 w-20 bg-amber-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsList.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Ícone de Aspas decorativo Claro */}
              <svg className="w-10 h-10 text-zinc-200 absolute top-6 right-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              {/* Estrelas */}
              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-zinc-700 italic mb-8 relative z-10 leading-relaxed">
                "{item.text}"
              </p>

              <div className="border-t border-zinc-100 pt-6 mt-auto">
                <p className="font-bold text-zinc-900">{item.name}</p>
                <p className="text-sm text-amber-700 font-medium">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}