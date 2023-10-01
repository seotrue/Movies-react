import styled, { css } from 'styled-components'

const inputStyle = css`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid #adc6ea;
  transition:
    border 80ms ease-out,
    box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0;
  height: 36px;
  color: #444444;
  padding: 8px 20px 7px;
  font-size: 16px;
  line-height: 1.33333333;

  &:focus {
    outline: none;
    color: #444444;
    border: 1px solid #253798;
  }

  &::placeholder {
    color: #8ca9d7;
    font-size: 14px;
  }

  &:disabled {
    color: #8ca9d7;
    background: #ffffff;
  }
`
export const Input = styled.input`
  ${inputStyle};
  color: ${props => props.color};
  width: ${props => props.width};
  padding: 9px 20px 9px;
`
