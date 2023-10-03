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

export const SearBar = styled.div`
  position: fixed;
  width: 90%;
  top: 20px;
  background: #fff;
  display: flex;
`
export const FootTab = styled.div`
  position: fixed;
  width: 100%;
  overflow: hidden;
  bottom: 0;
  left: 0;

  .nav {
    float: left;
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-decoration: none;
    text-align: center;
    background: #565685;
    color: aliceblue;

    &.active {
      background: black;
      font-weight: bold;
    }
  }
`
export const Input = styled.input`
  ${inputStyle};
  color: ${props => props.color};
  width: 100%;
  padding: 9px 20px 9px;
`

export const CardView = styled.div`
  display: flex;
  padding-top: 100px;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  .card {
    width: 45%;
    img {
      width: 100%;
    }
    .fav-icon {
      background: coral;
      color: #fff;
    }
  }
`
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`
export const ModalWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  padding: 100px 25px;
  transform: translate(-50%, -50%);
  background: #fff;
  button {
    float: left;
  }
`
