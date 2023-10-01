import ReactDom from 'react-dom'

const Backdrop = () => {
  return <div id='overlay'></div>
}

const Modal = () => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {ReactDom.createPortal(
        <div id='modal'>
          <h1>modal</h1>
          <p>contents</p>
        </div>,
        document.getElementById('modal-root'),
      )}
    </>
  )
}

export default Modal
