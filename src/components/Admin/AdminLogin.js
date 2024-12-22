import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Input, Button, Title, Error } from './styles';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to login');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Admin Login</Title>
                {error && <Error>{error}</Error>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Login</Button>
            </Form>
        </Container>
    );
};

export default AdminLogin; 