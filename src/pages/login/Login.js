import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({email, password})
            });

            if (response.ok) {
                navigate('/');
            } else {
                setError('Usuário ou senha inválidos');
            }
        } catch (error) {
            setError('Ocorreu um erro ao tentar fazer login');
        }
    };

    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="h-10 absolute" src="/logo_interfocus.jpg" alt=""/>
            <div className="max-w-lg w-full content-center">
                <div
                    className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                >
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
                                        className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                                        type="checkbox"
                                        name="remember-me"
                                        id="remember-me"
                                    />
                                    <label className="ml-2 block text-sm text-gray-400" htmlFor="remember-me"
                                    >Lembre-me</label
                                    >
                                </div>

                                <div className="text-sm">
                                    <a
                                        className="font-medium text-indigo-500 hover:text-indigo-400"
                                        href="#"
                                    >
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    type="submit"
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-gray-700 text-center">
                        <span className="text-gray-400">Não possuí uma conta?</span>
                        <a className="font-medium text-indigo-500 hover:text-indigo-400" href="#"
                        > Cadastre-se</a
                        >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;