import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${({ theme }) => theme.bg};
`;

export const Form = styled.form`
    background-color: ${({ theme }) => theme.card};
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    border-radius: 4px;
    background-color: transparent;
    color: ${({ theme }) => theme.text_primary};
`;

export const Button = styled.button`
    width: 100%;
    padding: 0.8rem;
    margin: 1rem 0;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.primary};
    color: white;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.primary + 'dd'};
    }
`;

export const Title = styled.h1`
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 1.5rem;
    text-align: center;
`;

export const Error = styled.p`
    color: red;
    margin: 0.5rem 0;
    text-align: center;
`;

export const DashboardContainer = styled.div`
    padding: 2rem;
    background-color: ${({ theme }) => theme.bg};
    min-height: 100vh;
`;

export const ProjectList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
`;

export const ProjectCard = styled.div`
    background-color: ${({ theme }) => theme.card};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    h3 {
        color: ${({ theme }) => theme.text_primary};
        margin-bottom: 0.5rem;
    }

    p {
        color: ${({ theme }) => theme.text_secondary};
        margin-bottom: 1rem;
    }

    div {
        display: flex;
        gap: 0.5rem;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`; 