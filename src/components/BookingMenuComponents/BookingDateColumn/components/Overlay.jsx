import React, { useEffect, useCallback } from "react";

export default function Overlay({ openOverLay, isAddNewItem }) {
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      openOverLay(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return function cleanup() {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <div
      role="presentation"
      className="timeLineOverlay"
    >
      {isAddNewItem && <button type="button" onClick={() => openOverLay(false)} className="closeOverlayButton">x</button>}
    </div>
  );
}
