import React from "react";
import "./style.css";

export default function ButtonBoxComponent({
  setIsBookingMenu,
  restoreEditItems,
  restoreAndCloseEditMode,
  editOrder,
  blockCreateButton,
  changeMode,
  clearAndChangeMode,
  sendNewOrder,
  isEditMode,
  isCreateMode,
}) {
      
    const createBook = () => {
      setIsBookingMenu(true)
    }

  return (
    <div className="sort-box_item">
      <div>
        <button className="reserved-btn" onClick={createBook}>
          Добавить новый
        </button>
      </div>
    </div>
    // <div className="sort-box_item">
    //   {/* <CountOrderFilter /> */}
    //   {!isEditMode ? (
    //     isCreateMode ? (
    //       <div>
    //         <button
    //           disabled={blockCreateButton}
    //           className={
    //             blockCreateButton ? "reserved-btn-locked" : "reserved-btn"
    //           }
    //           onClick={() => sendNewOrder()}
    //         >
    //           Забронировать
    //         </button>
    //         <button
    //           className="reserved-btn"
    //           onClick={() => clearAndChangeMode()}
    //         >
    //           Сбросить и Закрыть
    //         </button>
    //       </div>
    //     ) : (
    //       <div>
    //         <button className="reserved-btn" onClick={() => changeMode()}>
    //           Добавить новый
    //         </button>
    //       </div>
    //     )
    //   ) : (
    //     <div>
    //       <button
    //         disabled={blockCreateButton}
    //         className={
    //           blockCreateButton ? "reserved-btn-locked" : "reserved-btn"
    //         }
    //         onClick={() => editOrder()}
    //       >
    //         Применить
    //       </button>
    //       <button className="reserved-btn" onClick={() => restoreEditItems()}>
    //         Отменить
    //       </button>
    //       <button
    //         className="reserved-btn"
    //         onClick={() => restoreAndCloseEditMode()}
    //       >
    //         Отменить и закрыть
    //       </button>
    //     </div>
    //   )}
    // </div>
  );
}
