import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {employeeList, deleteEmployeeById} from "../../../store/employeeSlice";
import MasterLayout from "../../layouts/master";
import {Link, NavLink} from "react-router-dom";

const EmployeeList = () => {

    const dispatch = useDispatch();
    const [params,setParams] = useState({ search:"", page:1, limit:10, total_pages:0 });
    const employees = useSelector((state) => state.employee.employees);
    const [previousPage,setPreviousPage] = useState(true);
    const [nextPage,setNextPage] = useState(true);
    const [notificationData,setNotificationData] = useState();

    const getEmployeeList = useCallback((current_page = 1) => {
        const updatedParams = { ...params, page: current_page };
        dispatch(employeeList(updatedParams)).then((res) => {
            if(res.payload.data.success) {
                let totalPages = Math.ceil(res.payload.data.data.total_records / updatedParams.limit);
                params.total_pages = totalPages;
                setNextPage(updatedParams.page >= totalPages);
                setPreviousPage(updatedParams.page <= 1);
            }
        }).catch((err) => {
            console.log(err);
        });
    },[dispatch,params]);

    const currentPage = useCallback((current_page) => {
        getEmployeeList(current_page);
    },[getEmployeeList]);

    const searchData = useCallback((event) => {
        if (event.keyCode === 13) {
            getEmployeeList();
        }
    },[getEmployeeList]);

    const deleteEmployee = useCallback((id) => {
        dispatch(deleteEmployeeById(id)).then((res) => {
            getEmployeeList();
            setNotificationData({variant: 'success', message: res.payload.data.message, show: true});
            setTimeout( ()=>{
                setNotificationData({
                    variant: "",
                    message: "",
                    show: false,
                });
            },process.env.REACT_APP_NOTIFICATION_TIME);
        }).catch((err) =>{
            console.log(err);
        });
    },[dispatch,getEmployeeList]);


    useEffect(() => {
        getEmployeeList();
    },[getEmployeeList]);

    return (
        <>
            <MasterLayout notificationData={notificationData}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <NavLink className="btn btn-success btn-sm" to="/employee/new">
                                            <i className="fas fa-plus"></i>
                                        </NavLink>
                                    </h3>
                                    <div className="card-tools w-25">
                                        <div className="input-group input-group-sm p-1">
                                            <input type="text" name="search" className="form-control float-right" placeholder="Search" value={params.search} onChange={(e) => setParams({...params, search: e.target.value })} onKeyDown={searchData}/>
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-info">
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr className="text-capitalize">
                                                <th width="5%">#</th>
                                                <th width="10%">id proof</th>
                                                <th width="15%">first name</th>
                                                <th width="15%">last name</th>
                                                <th width="15%">email</th>
                                                <th width="10%">mobile</th>
                                                <th width="10%">role</th>
                                                <th width="20%">actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(employees.length > 0) ? employees.map((e,index) => (
                                                <tr key={index}>
                                                    <th>{index+1}</th>
                                                    <td>
                                                        <img className="img-thumbnail" src={`${process.env.REACT_APP_URL}/storage/proofs/` + e.id_proof} width="100" height="100" alt={e.id_proof}/>
                                                    </td>
                                                    <td>{e.first_name}</td>
                                                    <td>{e.last_name}</td>
                                                    <td>{e.email}</td>
                                                    <td>{e.mobile}</td>
                                                    <td>{e.role.name}</td>
                                                    <td>
                                                        <Link className="btn btn-info rounded-5 mr-2" to={`/employee/edit/${e.id}`}>Edit</Link>
                                                        <button onClick={()=> {deleteEmployee(e.id)}} className="btn btn-danger rounded-5">Delete</button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="10">No Data</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {employees.length > 0 && (
                                    <div className="card-footer clearfix">
                                        <ul className="pagination pagination-sm m-0 float-right">
                                            <li className="page-item">
                                                <button type="button" onClick={() => currentPage(params.page-1)} disabled={previousPage} className="page-link">&laquo;</button>
                                            </li>
                                            {(() => {
                                                const arr = [];
                                                for (let i = 1; i <= params.total_pages; i++) {
                                                    arr.push(<li className="page-item" key={i}> <button disabled={params.page === i} className={(params.page === i ? 'page-link disabled' : 'page-link')} onClick={() => currentPage(i)}>{i}</button></li>);
                                                }
                                                return arr;
                                            })()}
                                            <li className="page-item">
                                                <button type="button" onClick={() => currentPage(params.page+1)} disabled={nextPage} className="page-link">&raquo;</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    );
};

export default EmployeeList;