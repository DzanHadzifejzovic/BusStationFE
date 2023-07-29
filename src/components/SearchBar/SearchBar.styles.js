import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    background-color: #f2f2f2;
`;

export const Content= styled.div`
    position: relative;
    width: 50%;
    max-width: 60%;
    height: 55px;
    background: lightgray;
    margin: 0 auto;
    border-radius: 40px;
    
    .image{
        position: absolute;
        left: 15px;
        top: 20px;
        width: 30px;
    }

    input{
        font-size:1.5rem;
        position: absolute;
        left: 0;
        margin: 8px 0;
        padding: 0 0 0 60px;
        border: 0;
        width: 95%;
        background: transparent;
        height: 40px;
        
        :focus{
            outline: none;
        }
    }
`;