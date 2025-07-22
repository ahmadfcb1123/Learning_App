function Card({item, id, number,gameId, handleClick}){
  const itemClass = item.stat ? " active " + item.stat : ""

  return (
      <div className={"card" + itemClass} onClick={() => handleClick(id)}>
          <img src={`http://127.0.0.1:8000/api/getGameImages/${gameId}/${number}`} alt=""/>
      </div>
  )
}

export default Card