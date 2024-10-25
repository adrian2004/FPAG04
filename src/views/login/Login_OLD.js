import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                navigate('/');
            } else {
                let responseJson = await response.json();
                if (responseJson.status == 'logged') {
                    const showSwal = () => {
                        withReactContent(Swal).fire({
                            title: 'Usuário já logado, deseja substituir a sessão?',
                            icon: 'warning',
                            confirmButtonText: 'Confirmar',
                            reverseButtons: true,
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            preConfirm: async () => {
                                try {
                                    let req = await fetch('http://localhost:5000/login', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ email, password, token: responseJson.token })
                                    });
                                } catch (error) {
                                    console.log('NOTOK');
                                }
                            },
                        })
                    }
                    showSwal()
                }
                else {
                    document.querySelector('div[role="alert"]').classList.remove('hidden');
                    document.querySelector('div[role="alert"]').classList.add('flex');

                    setError(responseJson.message);
                }
            }
        } catch (error) {
            console.log(error);

            setError('Ocorreu um erro ao tentar fazer login');
        }
    };

    return (
        <div className="flex justify-center h-screen w-screen bg-cover bg-center" style={{ backgroundImage: "url(/images/bckg.jpg)" }}>
            <div className="max-w-lg w-full content-center">
                <div class="space-y-2 p-4">
                    <div
                        role="alert"
                        class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 
                p-2 rounded-lg hidden items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
                    >
                        <svg
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            fill="none"
                            class="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke-width="2"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                            ></path>
                        </svg>
                        <p class="text-xs font-semibold">{error}</p>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden" >
                    <div className="p-8">
                        <h2 className="text-center text-3xl font-extrabold text-white">
                            Bem-vindo de volta!
                        </h2>
                        <p className="mt-4 text-center text-gray-400">Entre para continuar</p>
                        <form onSubmit={handleLogin} className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <label className="sr-only" htmlFor="email">E-mail</label>
                                    <input
                                        placeholder="E-mail"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="sr-only" htmlFor="password">Senha</label>
                                    <input
                                        placeholder="Senha"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="current-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 text-blue-700 focus:ring-indigo-400 border-gray-600 rounded"
                                        type="checkbox"
                                        name="remember-me"
                                        id="remember-me"
                                    />
                                    <label className="ml-2 block text-sm text-white" htmlFor="remember-me"
                                    >Lembre-me</label
                                    >
                                </div>

                                <div className="text-sm">
                                    <a
                                        className="font-medium text-white hover:text-[#057cac] transition duration-200 ease-in-out"
                                        href="#"
                                    >
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-200 ease-in-out bg-[#057cac] hover:bg-[#0464a4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    type="submit"
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-gray-700 text-center">
                        <span className="text-gray-400">Não possuí uma conta?</span>
                        <a className="font-medium text-white hover:text-[#057cac] transition duration-200 ease-in-out" href="#"
                        > Cadastre-se</a
                        >
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;