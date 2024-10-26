"use client";

import './globals.css';
import CarouselBr from "./carrossel-br";
import CarouselEua from "./carrossel-eua";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { Montserrat, Playfair_Display } from 'next/font/google';
import '../next-i18next.config.js';


import { FaGithub, FaInstagram, FaRegCopyright, FaWhatsapp } from "react-icons/fa6";
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

          <div className='w-full bg-customwhite flex flex-col'>
            {/* Botão do menu hambúrguer */}
            <div className="flex justify-around items-center bg-customblue text-customwhite">
              <div className="flex flex-col justify-center md:flex-row md:justify-between">
                {/* Botão para dispositivos móveis */}
                <button
                  className="md:hidden block z-50"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <IoMenu
                    className={`text-3xl md:text-6xl ${isMenuOpen ? "text-customPurple" : "text-customRose"}`}
                  />
                </button>

                {/* Menu */}
                <div
                  className={`${isMenuOpen && window.innerWidth < 768
                    ? "flex w-full h-screen fixed top-0 left-0 gap-5 bg-customblue text-white justify-center items-center"
                    : "hidden"
                    } md:flex flex-col md:gap-10 md:flex-row md:justify-between md:items-center text-sm w-full z-[20] h-8`}
                >
                  {["home", "mentoring", "consulting", "setup", "pikup", "rent", "contact"].map((item, index) => (
                    <a
                      href={item.toLowerCase() === "home" ? "/" : item.toLowerCase() === "contact" ? "#contact" : `/${item}`}
                      key={index}
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className={`hover:bg-customgold hover:bg-opacity-50 transition-all duration-300 p-2 rounded-md text-center`}
                    >
                      {t(item)}
                    </a>
                  ))}
                </div>

              </div>

              {/* Div imagem e links sociais */}
              <div className=''>
                <div className="flex gap-6 py-8 justify-center md:gap-16">
                  <a href='https://www.instagram.com/ruthalmeida.mesaposta/' target='_blank' rel="noopener noreferrer">
                    <FaInstagram className='text-2xl hover:text-customgold transition-all duration-300' />
                  </a>
                  <a href='https://api.whatsapp.com/send?phone=14435381087' target='_blank' rel="noopener noreferrer">
                    <FaWhatsapp className='text-2xl hover:text-customgold transition-all duration-300' />
                  </a>
                </div>
              </div>

              {/* Seletor de idioma */}
              <div className={`${playfairDisplay.className}`}>
                <div className="">
                  <button
                    className="flex items-center bg-transparent hover:cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <Image src={language === 'br' ? '/images/br.png' : '/images/eua.png'}
                      alt={language === 'br' ? 'BR' : 'EUA'}
                      width={30}
                      height={30}
                      className="rounded-full" />
                  </button>
                  {isOpen && (
                    <ul className="absolute right-0 top-8 rounded-lg bg-slate-700/70 z-10 text-emerald-50">
                      <li className="flex items-center p-2 hover:bg-gray-200 cursor-pointer rounded-t-lg"
                        onClick={() => handleLanguageChange('br')}>
                        <Image
                          src="/images/br.png"
                          width={20}
                          height={20}
                          alt="BR"
                        />
                        <span className="ml-1 text-xs p-2 mr-4">BR</span>
                      </li>
                      <li className="flex items-center p-2 hover:bg-gray-200 rounded-b-lg cursor-pointer"
                        onClick={() => handleLanguageChange('eua')}>
                        <Image
                          src="/images/eua.png"
                          width={20}
                          height={20}
                          alt="EUA"
                        />
                        <span className="ml-1 text-xs p-2">EUA</span>
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
              {/* Ruth Almeida */}
              <div className='flex flex-col items-center justify-center w-full mt-5 p-1 text-customwhite text-6xl text-center'>
                <h1>RUTH ALMEIDA</h1>
                <p className={`${playfairDisplay.className} text-2xl`}>{t("subtitle")}</p>
              </div>
            </div>

            {/* Div descrição */}
            <div className='flex flex-col md:flex-row justify-center items-center gap-10 w-full text-sm animate-fade-in-up pt-24  p-5 md:p-10' style={{
              backgroundImage: "url('images/about-me.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <div className='w-full md:w-1/2'>
                <h2 className='text-4xl mb-6'>{t("about-me")}</h2>
                <p className='text-sm md:text-md mb-4 leading-relaxed'>
                  {t("description-pt1")}
                </p>
                <p className='text-sm md:text-md mb-2 leading-relaxed'>
                  {t("description-pt2")}
                </p>
                <p className='text-sm md:text-md leading-relaxed'>
                  {t("description-pt3")}
                </p>
              </div>
              <div className='w-full md:w-auto flex justify-center items-center py-5'>
                <Image src="/images/ruth-main.jpg" alt="Ruth Main" width={240} height={360} className='w-60 h-auto rounded-md shadow-custom' />
              </div>
            </div>



            {/* div serviços */}
            <div className='text-center max-w-full lg:min-h-screen bg-customblue p-12 md:pb-10 flex flex-col justify-center items-center' id="services-section"

            >
              <h2 className={`text-3xl font-semibold text-center mb-10 md:text-4xl text-customwhite ${playfairDisplay.className}`}>
                {t("my-services")}
              </h2>

              {language === 'br' ? <CarouselBr /> : <CarouselEua />}

            </div>

            {/* div ebook */}
            <div className='text-center p-12'>
              <div className='shadow-lg  p-12'>
                <div className="flex flex-col md:flex-row justify-around items-center gap-8 text-center md:text-left md:min-h-screen bg-customwhite" id="ebook">
                  <div className="md:w-auto flex justify-center items-start md:justify-center">
                    <img src="/images/ebook.png" alt="E-book sobre Mesa Posta" className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg" />
                  </div>

                  <div className="md:w-1/2 space-y-6">
                    <h2 className={`text-3xl md:text-4xl font-semibold ${playfairDisplay.className} text-customblue`}>
                      {t("ebook-title")}
                    </h2>

                    <p className="text-lg text-customblack font-light">
                      <strong>{t("ebook-1")}</strong>
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-left mx-auto text-customblack ml-5">
                      <li>{t("ebook-2")}</li>
                      <li>{t("ebook-3")}</li>
                      <li>{t("ebook-4")}</li>
                    </ul>

                    <p className="text-lg font-light text-customblack">
                      {t("ebook-5")}
                    </p>

                    <h3 className="text-xl font-semibold text-customblue">{t("ebook-6")}</h3>

                    <p className="text-lg text-customblack font-light">
                      {t("desc-ebook-1")} <strong>{t("ebook-free")}</strong> {t("desc-ebook-2")} <strong>{t("table-setting")}</strong> {t("desc-ebook-3")}
                    </p>
                  </div>



                </div>
                <div className="my-10">
                  <a href="https://ruthalmeida1247.systeme.io/ebookruthalmeida" className="px-8 py-3 text-lg font-semibold text-customwhite bg-customgold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                    {t("download-ebook")}
                  </a>
                </div>
              </div>

              {/* Divisão com sombra entre seções */}
              <div className="mt-16" />

              {/* Nova seção para o livro "Projeto Mulheres Extraordinárias" */}
              <div className='shadow-lg  p-12'>
                <div className="flex flex-col md:flex-row justify-around items-center gap-8 mt-6 bg-customwhite rounded-lg ">
                  <div className="md:w-1/3 flex justify-center">
                    <img src="/images/book.jpg" alt="Projeto Mulheres Extraordinárias" className="w-full max-w-xs rounded-lg shadow-lg" />
                  </div>

                  <div className="md:w-2/3 space-y-4 text-left">
                    <h2 className="text-2xl font-semibold text-customblue">{t('extra-project-title')}</h2>
                    <p className="text-lg text-customblack font-light">
                      <strong>{t('extra-project-empower')}</strong>
                    </p>
                    <p className="text-lg text-customblack font-light">
                      {t('extra-project-description')}
                    </p>
                    <p className="text-lg text-customblack font-light">
                      {t('extra-project-collection')}
                    </p>
                    <p className="text-lg text-customblack font-light">
                      <strong>{t('extra-project-why-read')}</strong>
                    </p>
                    <ul className="list-inside list-disc ml-5 text-lg text-customblack font-light">
                      <li>{t('extra-project-inspiration')}</li>
                      <li>{t('extra-project-empowerment')}</li>
                      <li>{t('extra-project-connection')}</li>
                    </ul>
                    <p className="text-lg text-customblack font-light">
                      {t('extra-project-join')}
                    </p>
                    {/* Botão do livro com margens adequadas */}
                  </div>

                </div>
                <div className="my-10">
                  <a href="https://p.eduzz.com/2355119?a=607065028" className="px-8 py-3 mt-10 text-lg font-semibold text-customwhite bg-customgold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300" target='_blank'>
                    {t('extra-project-button')}
                  </a>
                </div>
              </div>
            </div>








            <div id='contact' className='flex flex-col md:flex-row items-center justify-center w-full gap-12 p-12 bg-customblue text-customwhite md:min-h-screen'>
              {/* Título da seção */}
              <div className='w-full md:w-1/3'>
                <h2 className={`text-3xl font-semibold text-center mb-4 md:text-4xl ${playfairDisplay.className}`}>
                  {t("contact-me")}
                </h2>
                {/* Subtítulo explicativo */}
                <p className='text-lg text-center mb-8 max-w-2xl'>
                  {t("text-contact")}
                </p>
              </div>

              {/* Formulário de contato */}
              <form className="flex flex-col items-center gap-6 w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg text-customblue" onSubmit={handleSubmit}>
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
            <footer className={`bg-gray-100 w-screen text-customblue p-8 flex flex-col items-center justify-center`}>
              <p className='flex items-center text-center text-sm'><strong>RUTH ALMEIDA</strong></p>
              <p className='flex items-center text-center text-sm'>Copyright 2024. <FaRegCopyright className='mx-1' /> {t('copy')}.</p>
            </footer>
          </div>
        </section >


      ) : (
        <p className='h-screen w-screen flex justify-center items-center bg-customblue text-white'>Loading...</p> // Exibe isso enquanto o idioma não estiver carregado
      )
      }
    </>
  );
} 
