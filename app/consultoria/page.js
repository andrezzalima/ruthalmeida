"use client";

import '.././globals.css';
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { Montserrat, Playfair_Display } from 'next/font/google';
import '../../next-i18next.config.js';

import { FaGithub, FaInstagram, FaRegCopyright, FaWhatsapp } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const montserrat = Montserrat({
    weight: ['300', '400', '500', '700', '900'],
    subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const Consultoria = () => {
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
        <section className={`flex flex-col md:min-h-screen md:w-screen w-screen text-customblue ${montserrat.className}`}>
            <div className='w-full bg-customwhite flex flex-col '>
                {/* Botão do menu hambúrguer */}
                <div className="flex justify-around items-center bg-customblue text-customwhite">
                    <div className="flex flex-col justify-center md:flex-row md:justify-between ">
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
            </div>

            <section className="bg-customwhite text-customblack pt-12">
                <div className="container mx-auto px-6">
                    <div className='flex justify-center items-center gap-32 mb-10 py-12'>
                        <div>
                            <h2 className={`text-3xl font-bold text-customblue mb-6 text-center ${playfairDisplay.className}`}>
                                Consultoria Especializada para Sua Mesa Posta
                            </h2>

                            <p className="text-lg text-center text-gray-700 mb-10 max-w-2xl mx-auto">
                                Se você precisa de orientação imediata sobre mesa posta ou etiqueta americana, nossa consultoria é ideal. Com a expertise da Ruth Almeida, você encontrará soluções práticas e rápidas para suas dúvidas e necessidades específicas.
                            </p>
                        </div>

                        <div className="flex justify-center items-center">
                            <Image
                                src="/images/consultoria.png" // Adicione a imagem da consultoria
                                alt="Consultoria em Ação"
                                width={200}
                                height={200}
                                className="rounded-lg shadow-custom"
                                quality={80}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-customwhite p-6 rounded-lg shadow-lg hover:shadow-custom transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-customgold mb-4">Atendimento Personalizado</h3>
                            <p className="text-gray-600">
                                Focamos nas suas necessidades específicas, proporcionando um atendimento exclusivo e direcionado para resolver suas dúvidas.
                            </p>
                        </div>

                        <div className="bg-customwhite p-6 rounded-lg shadow-lg hover:shadow-custom transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-customgold mb-4">Soluções Práticas</h3>
                            <p className="text-gray-600">
                                Nossas orientações são claras e práticas, ideais para que você aplique imediatamente em sua mesa posta.
                            </p>
                        </div>

                        <div className="bg-customwhite p-6 rounded-lg shadow-lg hover:shadow-custom transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-customgold mb-4">Apoio em Etiqueta Americana</h3>
                            <p className="text-gray-600">
                                Se você está iniciando ou deseja aprimorar suas habilidades em etiqueta à mesa, estamos aqui para ajudar.
                            </p>
                        </div>

                        <div className="bg-customwhite p-6 rounded-lg shadow-lg hover:shadow-custom transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-customgold mb-4">Orientação Rápida</h3>
                            <p className="text-gray-600">
                                Com nossa consultoria, você receberá orientações rápidas que podem ser aplicadas de imediato.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 py-12">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl font-bold text-center text-customblue mb-8">Entre em Contato</h2>
                        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-semibold mb-2">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-semibold mb-2">Mensagem</label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="border border-gray-300 p-2 rounded w-full h-32"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-customgold text-white p-2 rounded hover:bg-customrose transition-all duration-300"
                            >
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Rodapé */}
            <footer className={`bg-gray-100 w-screen text-customblue p-8 flex flex-col items-center justify-center gap-5`}>
                <div className='flex'>
                    <p className='flex items-center text-center text-sm'>Copyright 2024. <FaRegCopyright className='mx-1' /> {t('copy')}.</p>
                </div>
            </footer>
        </section>
    );
};

export default Consultoria;
