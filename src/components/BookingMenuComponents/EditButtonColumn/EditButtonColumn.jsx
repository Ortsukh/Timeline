import style from "./EditButtonColumn.module.css"

export const EditButtonColumn = ({setIsBookingMenu}) => {

  const back = "< Назад"

  const createBook = () => {
    setIsBookingMenu(false)
  }

  return (
    <>
      <div className={style.containerEditMenu}>

        <div className={style.backButtonBlock}>
          <button className={style.backButton} onClick={createBook}>&lt; Назад</button>
        </div>

        <div className={style.editButtons}>
          <div className={style.editButtonColumn}>
            <p>Button</p>
          </div>
      
          <div className={style.bookingDateColumn}>
            <p>Date</p>
          </div>
        </div>
      

      </div>
    </>
  )
}