"use client";

import './globals.css';
import Carousel from "./carrossel";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { Montserrat, Playfair_Display } from 'next/font/google';
import '../next-i18next.config.js';


import { FaGithub, FaInstagram, FaRegCopyright } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});


export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Mensagem enviada com sucesso');
        alert('Mensagem enviada com sucesso!');
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.error('Erro ao enviar a mensagem');
        alert('Erro ao enviar a mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      alert('Erro ao enviar a mensagem');
    }
  };


  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('br');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(language, () => {
      setIsLanguageLoaded(true);
    });
  }, [i18n, language]);

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setIsLanguageLoaded(false);
    i18n.changeLanguage(value, () => {
      setIsLanguageLoaded(true);
    });
    setIsOpen(false);
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>

      {isLanguageLoaded ? (
        <section className={`flex flex-col md:min-h-screen md:max-w-screen max-w-scren text-customblue ${montserrat.className}`}>

          <div className='w-full bg-customwhite flex flex-col '>
            {/* Botão do menu hambúrguer */}
            <div className="flex justify-around items-center bg-customblue text-customwhite">
              <div className="flex flex-col justify-center md:flex-row md:justify-beetween ">
                {/* Botão para dispositivos móveis */}
                <button
                  className="md:hidden block z-50"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <IoMenu
                    className={`text-3xl md:text-6xl ${isMenuOpen ? "text-customPurple" : "text-customRose"
                      }`}
                  />
                </button>

                {/* Menu */}
                <div
                  className={`${isMenuOpen && window.innerWidth < 768
                    ? "flex w-full h-screen fixed top-0 left-0 gap-5 bg-customRose"
                    : "hidden"
                    } md:flex flex-col md:gap-10 md:flex-row md:justify-between md:items-center text-sm w-full z-[20] h-8`}
                >
                  <a
                    href="/"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:text-customgold transition-all duration-300"
                  >
                    {t("about-me")}
                  </a>
                  <a href="/mentoria"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:text-customgold transition-all duration-300"
                  >
                    Mentoria
                  </a>
                  <a
                    href="/consultoria"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:text-customgold transition-all duration-300"
                  >
                    Consultoria
                  </a>
                  <a
                    href="/montagem"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:text-customgold transition-all duration-300"
                  >
                    Montagem
                  </a>
                  <a
                    href="/pegueemonte"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:text-customgold transition-all duration-300"
                  >
                    Pegue e Monte
                  </a>
                  <a
                    href="/aluguel"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:text-customgold transition-all duration-300"
                  >
                    Aluguel
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:text-customgold transition-all duration-300"
                  >
                    Contatos
                  </a>
                </div>
              </div>


              {/* Div imagem e links sociais */}
              <div className=''>
                <div className="flex gap-6 py-8 justify-center md:gap-16">
                  <a href='' target='_blank' rel="noopener noreferrer">
                    <FaGithub className='text-2xl' />
                  </a>
                  <a href='' target='_blank' rel="noopener noreferrer">
                    <FaInstagram className='text-2xl' />
                  </a>

                </div>
              </div>
              <div className={`${playfairDisplay.className}`}>
                <div className="">
                  <button
                    className="flex items-center bg-transparent hover:cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <Image src={language === 'br' ? '/images/brasil.png' : '/images/eua.png'}
                      alt={language === 'br' ? 'BR' : 'EUA'}
                      width={30}
                      height={30}
                      className="rounded" />
                  </button>
                  {isOpen && (
                    <ul className="absolute right-0 top-8 rounded-lg bg-slate-700/70 z-10 text-emerald-50 ">
                      <li className="flex items-center p-2 hover:bg-gray-200 cursor-pointer rounded-t-lg "
                        onClick={() => handleLanguageChange('br')}>
                        <Image
                          src="/images/brasil.png"
                          width={20}
                          height={20}
                          alt="BR"
                        />
                        <span className="ml-1 text-xs p-2 mr-4">PT</span>
                      </li>
                      <li className="flex items-center p-2 hover:bg-gray-200 rounded-b-lg cursor-pointer "
                        onClick={() => handleLanguageChange('eua')} >
                        <Image
                          src="/images/eua.png"
                          width={20}
                          height={20}
                          alt="EUA"
                        />
                        <span className="ml-1 text-xs p-2">EN</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>


            {/* Sobre mim */}
            <div id="about" className='flex flex-col items-center justify-center md:h-full px-10 md:px-20 w-full min-h-60 bg-customGray' style={{
              backgroundImage: "url('images/background-home2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              {/* ruth almeida */}
              <div className='flex flex-col items-center justify-center w-full mt-5 p-1 text-customwhite text-6xl text-center'>
                <h1>RUTH ALMEIDA </h1>
                <p className={`${playfairDisplay.className} text-2xl`}>Mesa posta, etiqueta na América e reconexão familiar</p>
              </div>

            </div>
            {/* div descrição */}
            <div className='flex justify-center items-center gap-20 w-full md:w-full text-sm animate-fade-in-up h-screen'
              style={{
                backgroundImage: "url('images/about-me.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              <div className='w-1/2 py-12 '>
                <h2 className='text-4xl mb-6'>Sobre mim:</h2>
                <p className='text-sm md:text-md md:mb-2 mb-4 leading-relaxed'>
                  Sou apaixonada por criar momentos especiais à mesa e acredito que a conexão familiar começa nos pequenos detalhes. Como especialista em Mesa Posta e etiqueta, meu objetivo é ajudar famílias a se reconectarem, valorizando o tempo e o cuidado ao preparar uma refeição. Através da etiqueta à mesa e de ensinamentos sobre as tradições da cultura americana, ofereço uma abordagem que mistura elegância e funcionalidade, tornando o dia a dia mais especial.
                </p>
                <p className='text-sm md:text-md mb-2 leading-relaxed'>
                  Combinando tradição e modernidade, ensino como transformar refeições em experiências significativas, fortalecendo laços familiares e criando memórias ao redor da mesa. Quer seja um jantar formal ou um encontro casual, acredito que o ato de reunir a família, com atenção aos detalhes e às boas maneiras, é o primeiro passo para uma convivência mais harmoniosa.
                </p>
                <p className='text-sm md:text-md leading-relaxed'>
                  Venha comigo nessa jornada para redescobrir o prazer de estar à mesa com quem você ama!
                </p>
              </div>
              <div className='w-auto flex justify-center items-center py-12'>
                <img src="images/ruth-main.jpg" className=' w-60 h-auto rounded-md shadow-custom'></img>
              </div>
            </div>



            {/* div serviços */}
            <div className='text-center max-w-full min-h-screen bg-customblue p-12 pb-10'

            >
              <h2 className={`text-3xl font-semibold text-center mb-10 md:text-4xl text-customwhite ${playfairDisplay.className}`}>
                Meus Serviços
              </h2>

              {<Carousel />}

            </div>

            {/* div ebook */}
            <div className='text-center p-12'>
              <div className=" flex flex-col md:flex-row md: justify-around items-center gap-8 text-center md:text-left md:min-h-screen bg-customwhite" id="ebook-section">
                <div className="md:w-auto flex justify-center items-start md:justify-center">
                  <img src="/images/ebook.png" alt="E-book sobre Mesa Posta" className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg" />
                </div>

                <div className="md:w-1/2 space-y-6">
                  <h2 className={`text-3xl md:text-4xl font-semibold ${playfairDisplay.className} text-customblue`}>
                    Descubra como reconectar sua família e criar momentos inesquecíveis com a Mesa Posta
                  </h2>

                  <p className="text-lg text-customblack font-light">
                    <strong>Você já sentiu que...</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-left mx-auto text-customblack ml-5">
                    <li>A conexão familiar se perdeu e os momentos à mesa praticamente desapareceram?</li>
                    <li>Não sabe como montar uma mesa posta elegante e funcional?</li>
                    <li>Se sente insegura ao participar de eventos em que a maioria das pessoas segue as regras de etiqueta americanas?</li>
                  </ul>

                  <p className="text-lg font-light text-customblack">
                    Eu já passei por isso também, e foi essa experiência que me motivou a criar algo especial para você.
                  </p>

                  <h3 className="text-xl font-semibold text-customblue">Quero te dar um presente!</h3>

                  <p className="text-lg text-customblack font-light">
                    Baixe agora meu <strong>eBook gratuito</strong> e aprenda tudo sobre <strong>Mesa Posta</strong> e como ela pode ajudar a trazer de volta aqueles momentos valiosos com sua família. Esse manual simples e prático vai te guiar no processo de transformar suas refeições em verdadeiros encontros memoráveis.
                  </p>

                  <div className="flex justify-center md:justify-start">
                  </div>
                </div>
              </div>
              <button className="px-8 py-3 text-lg font-semibold text-customwhite bg-customgold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300">
                Baixar E-Book
              </button>
            </div>



            <div id='contact' className='flex items-center justify-center w-full gap-20 p-12 bg-customblue text-customwhite md:min-h-screen'>
              {/* Título da seção */}
              <div className='w-1/3'>
                <h2 className={`text-3xl font-semibold text-center mb-4 md:text-4xl ${playfairDisplay.className}`}>
                  Fale comigo
                </h2>
                {/* Subtítulo explicativo */}
                <p className='text-lg text-center mb-8 max-w-2xl'>
                  Caso deseje esclarecer dúvidas, agendar uma mentoria ou discutir como posso ajudar a reconectar sua família através da Mesa Posta, preencha o formulário abaixo. Responderei o mais breve possível.
                </p></div>

              {/* Formulário de contato */}
              <form className="flex flex-col items-center gap-6 w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
                <input
                  className='p-3 w-full rounded-lg border border-transparent focus:border-customgold focus:ring focus:ring-customgold focus:outline-none transition-all duration-300 ease-in-out'
                  type="text" placeholder="Seu nome" name="name" required value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className='p-3 w-full rounded-lg border border-transparent focus:border-customgold focus:ring focus:ring-customgold focus:outline-none transition-all duration-300 ease-in-out'
                  type="email" placeholder="Seu email" name="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  className='p-3 w-full h-32 rounded-lg border border-transparent focus:border-customgold focus:ring focus:ring-customgold focus:outline-none transition-all duration-300 ease-in-out'
                  placeholder="Sua mensagem" name="message" required value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <input
                  type="submit"
                  value="Enviar mensagem"
                  className='w-full md:w-1/2 p-3 text-customwhite bg-customgold hover:bg-opacity-90 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer'
                />
              </form>
            </div>


            {/* Rodapé */}
            <footer className={` w-screen text-customblue p-8 flex flex-col items-center justify-center gap-5`}>
              <div className='flex'>
                <p className='flex items-center text-center text-sm'>Copyright 2024. <FaRegCopyright className='mx-1' /> {t('copy')}.</p>
              </div>
            </footer>
          </div>
        </section>


      ) : (
        <p className='h-screen w-screen flex justify-center items-center bg-customblue text-white'>Loading...</p> // Exibe isso enquanto o idioma não estiver carregado
      )}
    </>
  );
} 
