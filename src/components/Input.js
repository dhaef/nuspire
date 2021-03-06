import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
    padding: .4rem 4px;
    display: block;
    margin-top: .5rem;
    border-radius: 5px;
    border: 1px solid black;
    width: 190px;
    &:focus {
        outline: none;
        border: 1px solid #ffba00;
    }
`

const Input = ({ value, name, placeholder, onChange, type }) => {
    return (
        <StyledInput value={value} name={name} placeholder={placeholder} onChange={onChange} type={type} />
    )
}

export default Input
