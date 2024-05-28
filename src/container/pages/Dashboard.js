import React from "react";
import MasterLayout from "../layouts/master";

const Dashboard = () => {
    return (
        <>
            <MasterLayout>
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>0</h3>
                                <p>Total Customers</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-users"></i>
                            </div>
                            <a href="{#}" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    )
}

export default Dashboard;
