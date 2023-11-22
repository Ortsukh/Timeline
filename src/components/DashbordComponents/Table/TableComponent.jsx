import React from "react";
import "../style.css";

export default function TableComponent({
  title, headers, rows,
}) {
  const handleLinkToLessee = (id) => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=lessee_dashboard&id=${id}`);
  };

  const handleLinkToCategory = (categoryId) => {
    const { origin } = window.location;
    const { pathname } = window.location;
    const lessee = window.location.search.substring(1).split("&").find((query) => query.startsWith("id"))?.split("=")[1];

    window.location.replace(`${origin}${pathname}?page=category_dashboard&category=${categoryId}${lessee ? `&id=${lessee}` : ""}`);
  };

  const handleEditOrder = (id) => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=booking_menu&order_id=${id}`);
  };

  return (
    <div className="containerChart last-orders">
      {/* {isBtnTimeline
        ? (
          <div className="orderTableHeader">
            <h4 className="title-table">{title}</h4>
            <button
              type="button"
              className="lesseeCell btn btn-info "
              onClick={handleLinkToTimeLine}
            >
              Timeline 🡆
            </button>
          </div>
        ) */}
      <h4 className="title-table">{title}</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            {headers.map((header) => (
              <th key={header.value} className={`centerCell ${header?.class}`} style={header?.style}>{header.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const result = row.date.map((cell, index) => (
              <td
                // eslint-disable-next-line
                key={row.key + index}
                className={cell?.class}
                style={cell?.style}
                onClick={() => {
                  if (cell?.idCompany) handleLinkToLessee(cell.idCompany);
                  if (cell?.idOrder) handleEditOrder(cell.idOrder);
                }}
              >
                {cell.value}
              </td>
            ));
            return <tr key={row.key} className="tableRow">{result}</tr>;
          })}
        </tbody>
      </table>
      {/* <Link rel="stylesheet" href="#s"> */}
      {/*  Посмотеть все заказы */}
      {/* </Link> */}
    </div>
  );
}
