"use client";

import '.././globals.css';
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { Montserrat, Playfair_Display } from 'next/font/google';
import '../../next-i18next.config.js';

import { FaInstagram, FaRegCopyright, FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const montserrat = Montserrat({
    weight: ['300', '400', '500', '700', '900'],
    subsets: ['latin'],
})

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
});


const Mentoria = () => {
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
    const [isLoading, setIsLoading] = useState(true);
    const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const loadLanguage = async () => {
            await i18n.changeLanguage(language);
            setIsLoading(false);
        };
        loadLanguage();
    }, [language, i18n]);

    const handleLanguageChange = (value) => {
        setLanguage(value);
        setIsLoading(true);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className={`flex flex-col md:min-h-screen md:w-screen w-scren text-customblue ${montserrat.className}`}>

            <div className='w-full bg-customwhite flex flex-col '>
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
                            <a href='' target='_blank' rel="noopener noreferrer">
                                <FaInstagram className='text-2xl' />
                            </a>
                            <a href='' target='_blank' rel="noopener noreferrer">
                                <FaWhatsapp className='text-2xl' />
                            </a>
                            <a href='' target='_blank' rel="noopener noreferrer">
                                <FaFacebook className='text-2xl hover:text-customgold transition-all duration-300' />
                            </a>
                        </div>
                    </div>
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
                                <ul className="absolute right-0 top-8 rounded-lg bg-slate-700/70 z-10 text-emerald-50 ">
                                    <li className="flex items-center p-2 hover:bg-gray-200 cursor-pointer rounded-t-lg "
                                        onClick={() => handleLanguageChange('br')}>
                                        <Image
                                            src="/images/br.png"
                                            width={20}
                                            height={20}
                                            alt="BR"
                                        />
                                        <span className="ml-1 text-xs p-2 mr-4">BR</span>
                                    </li>
                                    <li className="flex items-center p-2 hover:bg-gray-200 rounded-b-lg cursor-pointer "
                                        onClick={() => handleLanguageChange('eua')} >
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
            </div>

            <section class="bg-customwhite text-customblack pt-12">

                <div class="container mx-auto px-6">
                    <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-10 py-12'>
                        <div className="flex justify-center items-center mb-6 md:mb-0">
                            <Image
                                src="/images/mentoria.png"
                                alt="Mentoria em Ação"
                                width={200}
                                height={200}
                                className="rounded-lg shadow-custom"
                                quality={80}
                            />
                        </div>
                        <div className="text-center">
                            <h2 className={`text-3xl font-bold text-customblue mb-6 ${playfairDisplay.className}`}>
                                {t("mentoring-title")}
                            </h2>
                            <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                                {t("mentoring-desc")}
                            </p>
                            <a href="" className="mt-4 bg-customgold text-white px-4 py-2 rounded hover:bg-customrose transition-all duration-300" target='_blank'>
                                {t("mentoring-button")}
                            </a>
                        </div>
                    </div>


                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div class="bg-customwhite p-6 rounded-lg shadow-lg hover:shadow-custom transition-shadow duration-300">
                            <h3 class="text-xl font-semibold text-customgold mb-4">{t("mentoring-session")}</h3>
                            <p class="text-gray-600">
                                {t("mentoring-session-desc")}
                            </p>
                        </div>


                        <div className="bg-customwhite p-6 rounded-lg shadow-lg hover:shadow-custom transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-customgold mb-4">{t("project-development")}</h3>
                            <p className="text-gray-600">
                                {t("project-development-desc")}
                            </p>

                        </div>

                    </div>
                </div>
                <div className="bg-gray-100 min-h-screen flex items-center justify-center" id="contact">
                    <div className="  md:w-1/2 container mx-auto px-6">
                        <h2 className="text-2xl font-bold text-center text-customblue mb-8">{t("contact-me")}</h2>
                        <form className="flex flex-col items-center gap-6 w-full bg-white p-8 rounded-xl shadow-lg text-customblue" onSubmit={handleSubmit}>
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
                </div>
            </section>


            <footer className={`bg-gray-100 w-screen text-customblue p-8 flex flex-col items-center justify-center`}>
                <p className='flex items-center text-center text-sm'><strong>RUTH ALMEIDA</strong></p>
                <p className='flex items-center text-center text-sm'>Copyright 2024. <FaRegCopyright className='mx-1' /> {t('copy')}.</p>
            </footer>


        </section >
    );
};

export default Mentoria;
