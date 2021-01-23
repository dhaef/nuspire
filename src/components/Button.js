import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: lightblue;
    border: none;
    border-radius: 5px;
    padding: .5rem;
    font-weight: bold;
    margin: .5rem .5rem 0 0;
    cursor: pointer;
`

const Button = ({ text, id, onClick }) => {
    return (
        <StyledButton id={id} onClick={onClick}>{text}</StyledButton>
    )
}

export default Button
