import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: #ffba00;
    border: none;
    border-radius: 5px;
    padding: .5rem;
    font-weight: bold;
    margin: .5rem .5rem 0 0;
    cursor: pointer;
    &:hover {
        background-color: #ffe18f;
    }
    &:focus {
        outline: none;
    }
`

const Button = ({ text, id, onClick, loading }) => {
    return (
        <StyledButton id={id} onClick={onClick} disabled={loading} className={`${loading && 'disabled'}`}>{text}</StyledButton>
    )
}

export default Button
