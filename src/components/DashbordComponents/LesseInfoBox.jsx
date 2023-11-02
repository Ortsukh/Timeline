import React, { useEffect, useState } from "react";
import moment from "moment";
import { getUserInfo } from "../../Api/DashboardApi";

export default function LesseeInfoBox() {
  const [userInfo, setUserInfo] = useState({});
  const today = moment().format("DD MMM YYYY");
  useEffect(() => {
    getUserInfo().then((response) => {
      console.log(response);
      setUserInfo(response);
    });
  }, []);
  return (
    <div className="containerUserBox">
      <div className="box box-widget widget-user">

        <div className="widget-user-header bg-aqua-active">
          <h3 className="widget-user-username">{today}</h3>
          <h4 className="widget-user-desc">ФРАНЧАЙЗИ КОМПАНИЯ</h4>
          <h5 className="widget-user-desc">{userInfo.name}</h5>
        </div>

        <div className="box-footer" style={{ height: 263 }}>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <span className="description-text">Пространство:</span>
                <h5 className="description-header">Минск</h5>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <span className="description-text">Арендные зоны</span>
                <h5 className="description-header">1</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <span className="description-text">Арендованое оборудование</span>
                <h5 className="description-header">12</h5>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <span className="description-text">Кухонь свободно</span>
                <h5 className="description-header">{userInfo.equipmentFree}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
