import ReactDom from 'react-dom'
import { ModalBackdrop, ModalWrap } from './styledComponents'
import { useEffect } from 'react'

const Backdrop = () => {
  return <ModalBackdrop id='overlay' />
}

const Modal = ({ open, close, onFavoriteToggle }) => {
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          width: 100%;`
    return () => {
      document.body.style.cssText = ''
    }
  }, [])

  const closeModal = () => {
    close()
  }

  const favoriteToggle = () => {
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
