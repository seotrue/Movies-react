import ReactDom from 'react-dom'
import { ModalBackdrop, ModalWrap } from './styledComponents'

const Backdrop = () => {
  return <ModalBackdrop id='overlay' />
}

const Modal = ({ open, close, onFavoriteToggle }) => {
  const closeModal = () => {
    close()
  }

  const favoriteToggle = () => {
    console.log(open, 'open')
    //open.favorite = !open.favorite
    onFavoriteToggle(open)
  }

  return (
    <>
      {ReactDom.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {ReactDom.createPortal(
        <ModalWrap id='modal'>
          <div>
            <button onClick={closeModal}>취소</button>
            <button onClick={favoriteToggle}>{open.favorite ? '즐겨찾기 제거' : '즐겨찾기'}</button>
          </div>
        </ModalWrap>,
        document.getElementById('modal-root'),
      )}
    </>
  )
}

export default Modal
