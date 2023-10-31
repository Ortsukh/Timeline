import React from "react";
import moment from "moment";

export default function UserBox() {
  const today = moment().format("DD MMM YYYY");

  return (
    <div className="containerUserBox">
      <div className="box box-widget widget-user">

        <div className="widget-user-header bg-aqua-active">
          <h3 className="widget-user-username">{today}</h3>
          <h4 className="widget-user-desc">ФРАНЧАЙЗИ КОМПАНИЯ</h4>
          <h5 className="widget-user-desc">Франчайзи</h5>
        </div>

        <div className="box-footer" style={{ height: 263 }}>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">8</h5>
                <span className="description-text">Пространства</span>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">3</h5>
                <span className="description-text">Компании-арендаторы</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">10</h5>
                <span className="description-text">Кухонь всего</span>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">2</h5>
                <span className="description-text">Кузонь свободно</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">7</h5>
                <span className="description-text">Оборудования всего</span>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">2</h5>
                <span className="description-text">Оборудования свободно</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
