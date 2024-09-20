import React, { useState } from 'react';
import Login, { Email, Password, Welcome, Banner, Submit, Title, Logo, ButtonAfter } from '@react-login-page/page3';
import LogoInterfocus from './logo_interfocus.jpg';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento

const LoginPage = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                navigate('/home'); // Redirecionar para a home
            } else {
                setError('Usuário ou senha inválidos');
            }
        } catch (error) {
            setError('Ocorreu um erro ao tentar fazer login');
        }
    };

    return (
        <Login style={{ height: 902 }}>
            <Banner style={{ backgroundImage: `url(${LogoInterfocus })`}} />
            <Logo visible={false}></Logo>
            <Title>Login</Title>
            <Welcome>Bem-vindo de volta!</Welcome>

            <Email
                name="userUserName"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Password
                placeholder="Senha"
                label="Senha:"
                name="userPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <Submit onClick={handleLogin}>Entrar</Submit>

            <ButtonAfter visible={false}></ButtonAfter>
        </Login>
    );
};

export default LoginPage;
