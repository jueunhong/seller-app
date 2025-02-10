import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {doc, getDoc} from "firebase/firestore";
import firebaseExports from "../firebase.js";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../images/logo.svg";

const {db} = firebaseExports;

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleIdChange = (e) => {
        setId(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try{
            const docRef = doc(db, "seller", id);
            const docSnap = await getDoc(docRef);
                
            if(docSnap.exists()){
                const data = docSnap.data();
                if(data.password === password){

                    navigate('/admin', {state: {sellerId: data.seller_id}});
                }else{
                    console.log(password);
                    setError("비밀번호가 일치하지 않습니다.");
                }
            }else{
                setError("아이디가 존재하지 않습니다.");
            }
        } catch(e){
            console.error(e);
            setError("로그인 중 오류가 발생했습니다.");
        } finally{
        setLoading(false);}
    }
    
    

    return (
        <Main>
        <TabContainer>
          <LogoBox>
            <LogoImg src={Logo} alt="logo" />
            <div>seller</div>
          </LogoBox>
            <FormContainer>
              <FormGroup>
                <Label htmlFor="email">아이디</Label>
                <Input id="seller_id" type="string" placeholder="아이디를 입력해주세요"
                value={id} onChange={handleIdChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">비밀번호</Label>
                <Input id="seller_password" type="string" placeholder="비밀번호를 입력해주세요"
                value={password} onChange={handlePasswordChange}/>
              </FormGroup>
              {error && <ErrorMessage>{error}</ErrorMessage>} {/* Show error message if any */}
              <SubmitButton onClick={handleLogin} disabled={loading}>
                        {loading ? "로그인 중..." : "로그인"}
                    </SubmitButton>
            </FormContainer>
          
        </TabContainer>
      </Main>
        
    );}

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  height: 100vh;
  justify-content: center;
`

export const TabContainer = styled.div`
  width: 100%;
  max-width: 400px;
`

export const TabList = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

export const TabButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "black" : "transparent")};
  color: ${(props) => (props.active ? "black" : "#666")};
  cursor: pointer;
`
export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  gap: 1rem;
  align-items: center;
`
export const LogoImg = styled.img`
  width: 14rem;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
`

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`

export const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`
export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`

export default Login;