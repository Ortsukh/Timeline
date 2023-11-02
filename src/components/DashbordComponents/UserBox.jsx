import React, { useEffect, useState } from "react";
import moment from "moment";
import { getRentCompanies, getUserInfo } from "../../Api/DashboardApi";
import UserAccountDashBoard from "./UserAccountDashBoard";

export default function UserBox() {
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
                <h5 className="description-header">{userInfo.marketPlaces}</h5>
                <span className="description-text">Пространства</span>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">{userInfo.lesseeCompanies}</h5>
                <span className="description-text">Компании-арендаторы</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">{userInfo.kitchens}</h5>
                <span className="description-text">Кухонь всего</span>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">{userInfo.equipmentFree}</h5>
                <span className="description-text">Кухонь свободно</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">{userInfo.equipment}</h5>
                <span className="description-text">Оборудования всего</span>
              </div>
            </div>
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">{userInfo.equipmentFree}</h5>
                <span className="description-text">Оборудования свободно</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-8 cont-check">
          <UserAccountDashBoard />
        </div>
    </div>
  );
}
