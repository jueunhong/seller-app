import React from "react";
import { useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseExports from '../firebase';
import styled from 'styled-components';


const ChangePassword = ({setIsChangePassword}) => {
    const { db } = firebaseExports;
    const [id, setId] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (setter) => (e) => {
      setter(e.target.value);
      setError("");
      setSuccess("");
      setLoading(false);
    };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsChangePassword(false);
    }
  }

  const handleChangePassword = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    if(!id || !oldPassword || !newPassword || !confirmPassword){ 
      setError("모든 항목을 입력해주세요.");
      return
    }
    if(newPassword !== confirmPassword){
      setError("새 비밀번호가 일치하지 않습니다.")
      return
    }
    try{
      const docRef = doc(db, "seller", id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const data = docSnap.data();
        if(data.password === oldPassword){
          await updateDoc(docRef, {password: newPassword});
          setSuccess("비밀번호가 성공적으로 변경되었습니다.");
          setId("");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setLoading(false);

        }else{
          setError("기존 비밀번호가 일치하지 않습니다.");
        }
      }else{
        setError("아이디가 존재하지 않습니다.");
      }
    } catch(e){
      console.error(e);
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  }
    return(
        <>
        <ModalBackdrop onClick={handleBackdropClick}>
          <ChangePasswordContainer>
            <h2>비밀번호 변경</h2>
            <input type="text" placeholder="아이디" value={id} onChange={handleInputChange(setId)} />
            <input type="password" placeholder="기존 비밀번호" value={oldPassword} onChange={handleInputChange(setOldPassword)} />
            <input type="password" placeholder="새 비밀번호" value={newPassword} onChange={handleInputChange(setNewPassword)} />
            <input type="password" placeholder="새 비밀번호 확인" value={confirmPassword} onChange={handleInputChange(setConfirmPassword)} />
            <button onClick={handleChangePassword} disabled={loading}>{loading ? "변경 중..." : "비밀번호 변경"}</button>
            {error && <div>{error}</div>}
            {success && <div>{success}</div>}
            
          </ChangePasswordContainer>
        </ModalBackdrop>
        </>
    )
}

export default ChangePassword;

const ChangePasswordContainer = styled.div`
background: white;
padding: 20px;
border-radius: 8px;
width: 300px;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  width: 100%;
}

button {
  padding: 0.5rem;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 100%;
}

div {
  font-size: 1rem;
  margin-top: 1rem;
}
`;
    const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Dim background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;