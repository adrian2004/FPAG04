import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from "../../assets/components/InputField";
import Checkbox from '../../assets/components/Checkbox';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../../assets/css/index.css';

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
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/');
            } else {
                let responseJson = await response.json();
                if (responseJson.status === 'logged') {
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
                                    const res = await fetch('http://localhost:5000/login', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ email, password, token: responseJson.token }),
                                        credentials: 'include'
                                    });                                    
                                    if (res.ok) navigate('/'); 
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
        <div className="flex h-screen w-full items-center justify-between px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg mr-auto lg:ml-60">
                <h4 className="mb-4 text-4xl font-bold text-[#2d2d2d] text-left">
                    Entrar
                </h4>
                <p className="mb-6 text-left text-[#b1b1b1]">
                    Digite seu e-mail e senha para entrar!
                </p>
                {error && (
                    <div
                        className="mt-1 p-2 text-sm text-red-500 bg-red-100 rounded-md"
                        role="alert"
                    >
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email"
                        placeholder="admin@interfocus.com.br"
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Senha"
                        placeholder="Senha"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Checkbox />
                            <p className="ml-2 text-sm font-medium text-navy-700">
                                Lembre-me
                            </p>
                        </div>
                        <a
                            href="#"
                            className="text-sm font-medium text-brand-500 hover:text-brand-600 hover:text-[#0c53a2] transition duration-200"
                        >
                            Esqueceu a senha?
                        </a>
                    </div>

                    <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base bg-[#0c53a2] font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700">
                    Sign In
                </button>
                </form>
            </div>

            <div className="absolute right-0 h-full min-h-screen w-full md:w-[50%] lg:w-[49vw] 2xl:w-[44vw]">
                <div
                    className="bg-image flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                />
            </div>
        </div>
    );
};

export default LoginPage;