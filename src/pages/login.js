import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleIdChange = (e) => {
        setId(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
    
    }

    return (
        <Wrapper>
            <Container>
                <Input placeholder="아이디" value={id} onChange={handleIdChange}/>
                <Input placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
                <Button onClick={handleLogin}>로그인</Button>
            </Container>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10%;
    max-width: 25rem;
`;

const Input = styled.input`
    width: 100%;
    height: 2.5rem;
    margin-bottom: 10px;
    padding:0.45rem;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem;
    width: 100%;
    height:40px;
    background-color: black;
    color: white;
    border: none;
    font-size: 1rem;


`;

export default Login;