import React from 'react';
import styled from 'styled-components';


const EditPassword = ({setIsChangePassword}) => {

    return(    
        <Wrapper>
            <Container >
               <span onClick = {() => setIsChangePassword(true)}>비밀번호 변경</span>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1.4rem;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    `
export default EditPassword;
