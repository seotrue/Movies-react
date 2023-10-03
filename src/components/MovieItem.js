const MovieItem = ({ refTarget, item, onOpenFavoriteModal }) => {
  return (
    <div className={'card'} onClick={() => onOpenFavoriteModal(item)} ref={refTarget}>
      <img src={item.Poster} alt='img' />
      {item.favorite && <p className={'fav-icon'}>즐겨찾기</p>}
      <p>{item.Title}</p>
      <p>{item.Year}</p>
      <p>{item.Type}</p>
    </div>
  )
}

export default MovieItem
