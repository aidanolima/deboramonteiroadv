import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import Services from "../src/components/Services";
import About from "../src/components/About";
import Testimonials from "../src/components/Testimonials";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    // scroll-smooth para navegação suave, e flex flex-col para responsividade
    <main className="flex min-h-screen flex-col font-sans scroll-smooth">
      <Header /> 
      
      {/* O Hero agora é a seção 'Premium Golden Smoky' */}
      <div id="hero">
        <Hero />
      </div>
      
      {/* O restante do corpo é LUMINOSO (bg-white ou bg-zinc-50) */}
      <div id="servicos">
        <Services />
      </div>
      
      <div id="sobre">
        <About />
      </div>
      
      <div id="depoimentos">
        <Testimonials />
      </div>
      
      <Footer />
    </main>
  );
}