import React from "react";
import {useLocation} from "react-router-dom";
import logo from "../../../themes/images/logo.png";
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";
import {pathString} from "../../../utilities/helper";
import {Alert} from "react-bootstrap";

const MasterLayout = ({children, notificationData}) => {
    const location = useLocation();
    const pathName = pathString(location.pathname);

    return (
        <>
            <div className="wrapper">
                <NavigationBar/>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href={process.env.REACT_APP_BASE_URL+'/dashboard'} className="brand-link">
                        <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3"/>
                        <span className="brand-text font-weight-light">{process.env.REACT_APP_NAME}</span>
                    </a>
                    <SideBar/>
                </aside>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="text-capitalize">{pathName}</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item text-capitalize active">{pathName}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        {(notificationData && notificationData.show === true) ? (
                            <Alert className="col-12" variant={notificationData.variant} show={notificationData.show}>{notificationData.message}</Alert>
                        ) : ""}
                        {children}
                    </section>
                </div>
                <footer className="main-footer">
                    <div className="float-right d-none d-sm-block"><b>Version</b>&nbsp;3.2.0</div>
                    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
                </footer>
            </div>
        </>
    )
}

export default MasterLayout;