import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: lightblue;
    border: none;
    border-radius: 5px;
    padding: .5rem;
    font-weight: bold;
    margin-right: .5rem;
    cursor: pointer;
`

const Button = ({ text, id, onClick }) => {
    return (
        <StyledButton id={id} onClick={onClick}>{text}</StyledButton>
    )
}

export default Button
