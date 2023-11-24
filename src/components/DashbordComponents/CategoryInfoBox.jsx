import React from "react";
import moment from "moment";

export default function CategoryInfoBox({ categoryInfoData }) {
  const today = moment().format("DD MMM YYYY");
  console.log(categoryInfoData);
  return (
    <div className="containerUserBox">
      <div className="box box-widget widget-user">

        <div className="widget-user-header bg-aqua-active">
          <h3 className="widget-user-username">{today}</h3>
          <h4 className="widget-user-desc">{categoryInfoData[0].name}</h4>
          <h5 className="widget-user-desc">Категория</h5>
        </div>

        <div className="box-footer" style={{ height: 263 }}>
          <div className="row">
            <div className="col-xs-6 border-right">
              <div className="description-block">
                <h5 className="description-header">{categoryInfoData[0].kitchenEquipment.length}</h5>
                <span className="description-text">Всего оборудования</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-lg-3 col-md-8 cont-check"> */}
      {/*  <UserAccountDashBoard id={id} lesseeCompanies={lesseeCompanies} /> */}
      {/* </div> */}
    </div>
  );
}
