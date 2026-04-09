"use client";

import React, { useState, useEffect } from 'react';

const menuItems = [
  { name: 'Áreas de Atuação', href: '#servicos' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Depoimentos', href: '#depoimentos' },
  { name: 'Contato', href: '#contato' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-100 py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LADO ESQUERDO: Logo e Nome */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Logo Débora Monteiro" 
            className={`h-11 w-11 rounded-full object-cover shadow-sm transition-all duration-300 ${isScrolled ? 'border border-zinc-200' : 'border-2 border-amber-500/50'}`}
          />
          <span className={`text-xl font-serif font-bold transition-all duration-300 hidden sm:block ${isScrolled || isMobileMenuOpen ? 'text-zinc-900' : 'text-white'}`}>
            Débora Monteiro Advogada
          </span>
        </div>

        {/* NAVEGAÇÃO DESKTOP */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-sm font-medium transition-all duration-300 ${isScrolled ? 'text-zinc-900 hover:text-amber-700' : 'text-zinc-100 hover:text-amber-400'}`}
              >
                {item.name}
              </a>
            ))}
            <span className={`text-sm font-semibold transition-all duration-300 whitespace-nowrap ${isScrolled ? 'text-amber-700' : 'text-amber-500'}`}>
              (65) 99113-3336
            </span>
          </nav>

          <a
            href="https://wa.me/5565991133336"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold py-2.5 px-5 rounded transition shadow-md whitespace-nowrap"
          >
            Agendar Consulta
          </a>

          {/* BOTÃO MOBILE */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className={`w-6 h-6 ${isScrolled || isMobileMenuOpen ? 'text-zinc-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE EXPANDIDO */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-100 mt-3 absolute w-full left-0 px-6 py-4 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)} // FECHA AO CLICAR
                className="text-base font-medium text-zinc-800 hover:text-amber-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="h-px bg-zinc-100 my-2"></div>
            <a
              href="https://wa.me/5565991133336"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-orange-600 text-center text-white text-base font-bold py-3 px-5 rounded shadow-md"
            >
              Agendar Consulta - (65) 99113-3336
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}