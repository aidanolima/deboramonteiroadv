export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-zinc-900 p-6">
      <div className="text-center max-w-2xl">
        {/* Espaço para a Logo no futuro */}
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 bg-zinc-300 rounded-full flex items-center justify-center shadow-sm">
             <span className="text-xl font-serif text-zinc-500">DM</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-zinc-800">
          Debora Monteiro Advogados
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-600 mb-8">
          Nossa página está em construção. Em breve um novo espaço para atender você com excelência e segurança jurídica.
        </p>
        
        {/* Barras de carregamento animadas */}
        <div className="animate-pulse flex space-x-4 justify-center mt-10">
          <div className="h-1.5 w-16 bg-amber-600 rounded"></div>
          <div className="h-1.5 w-16 bg-amber-600 rounded"></div>
          <div className="h-1.5 w-16 bg-amber-600 rounded"></div>
        </div>
        
        <div className="mt-12 text-sm text-zinc-500">
          <p>Para contatos urgentes, por favor procure-nos em nossos canais habituais.</p>
        </div>
      </div>
    </main>
  );
}