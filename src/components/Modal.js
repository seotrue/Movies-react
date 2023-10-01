import ReactDom from 'react-dom'

const Backdrop = () => {
  return <div id='overlay'></div>
}

const Modal = ({ close, handler, params }) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {ReactDom.createPortal(
        <div id='modal'>
          <h1>modal</h1>
          <div>
            <button onClick={() => close}>취소</button>
            <button onClick={() => handler(params)}>{params ? '즐겨찾기 제거' : '즐겨찾기'}</button>
          </div>
        </div>,
        document.getElementById('modal-root'),
      )}
    </>
  )
}

export default Modal
