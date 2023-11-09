import React from "react";
import "../style.css";

export default function TableComponent({
  title, headers, rows, isBtnTimeline,
}) {
  const handleLinkToTimeLine = () => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=timeline`);
  };

  const handleLinkToLessee = (id) => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=lessee_dashboard&id=${id}`);
  };

  return (
    <div className="containerChart last-orders">
      {isBtnTimeline
        ? (
          <div className="orderTableHeader">
            <h4 className="title-table">{title}</h4>
            <button
              type="button"
              className="lesseeCell btn btn-info"
              onClick={handleLinkToTimeLine}
            >
              {"Timeline->"}
            </button>
          </div>
        )
        : <h4 className="title-table">{title}</h4>}

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            {headers.map((header) => (
              <th className={`centerCell ${header?.class}`} style={header?.style}>{header.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const result = row.date.map((cell) => (
              <td
                className={cell?.class}
                style={cell?.style}
                onClick={() => {
                  if (cell?.idCompany) handleLinkToLessee(cell.idCompany);
                }}
              >
                {cell.value}
              </td>
            ));
            return <tr key={row.key}>{result}</tr>;
          })}
        </tbody>
      </table>
      {/* <Link rel="stylesheet" href="#s"> */}
      {/*  Посмотеть все заказы */}
      {/* </Link> */}
    </div>
  );
}
