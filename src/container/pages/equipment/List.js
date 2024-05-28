import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {Field, Formik, Form} from "formik";
import MasterLayout from "../../layouts/master";
import {Link, NavLink} from "react-router-dom";
import moment from "moment";
import {currentDate} from "../../../utilities/helper";
import {equipmentMaintenanceSchema,removeEquipmentMaintenanceSchema} from "../../../schemas/validationSchemas";
import {equipmentList, deleteEquipmentById, equipmentMaintenanceById, removeEquipmentMaintenanceById} from "../../../store/equipmentSlice";

const EquipmentList = () => {

    const dispatch = useDispatch();
    const [params,setParams] = useState({ search:"", page:1, limit:10, total_pages:0 });
    const equipments = useSelector((state) => state.equipment.equipments);
    const [previousPage,setPreviousPage] = useState(true);
    const [nextPage,setNextPage] = useState(true);
    const [notificationData,setNotificationData] = useState();

    const getEquipmentList = useCallback((current_page = 1) => {
        const updatedParams = { ...params, page: current_page };
        dispatch(equipmentList(updatedParams)).then((res) => {
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
        getEquipmentList(current_page);
    },[getEquipmentList]);

    const searchData = useCallback( (event) => {
        if (event.keyCode === 13) {
            getEquipmentList();
        }
    },[getEquipmentList]);

    const deleteEquipment = useCallback((id) => {
        dispatch(deleteEquipmentById(id)).then(res => {
            getEquipmentList();
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
    },[dispatch,getEquipmentList]);

    const [showMaintenanceEquipmentModal, setShowMaintenanceEquipmentModal] = useState(false);
    const [maintenanceEquipment,setMaintenanceEquipment] = useState({});
    const handleMaintenanceEquipmentModalClose = () => setShowMaintenanceEquipmentModal(false);
    const handleMaintenanceEquipment = (equipment) => {
        setShowMaintenanceEquipmentModal(true);
        setMaintenanceEquipment({ ...equipment, schedule_date: currentDate() });
    }

    const [showAlreadyInMaintenanceEquipmentModal, setShowAlreadyInMaintenanceEquipmentModal] = useState(false);
    const [alreadyMaintenanceEquipment,setAlreadyMaintenanceEquipment] = useState({});
    const handleAlreadyMaintenanceEquipmentModalClose = () => setShowAlreadyInMaintenanceEquipmentModal(false);
    const handleAlreadyInMaintenanceEquipment = (equipment) => {
        setShowAlreadyInMaintenanceEquipmentModal(true);
        setAlreadyMaintenanceEquipment({...equipment, remark: ""});
    }

    useEffect(() => {
        getEquipmentList();
    }, [getEquipmentList]);

    return (
        <>
            <MasterLayout notificationData={notificationData}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <NavLink className="btn btn-success btn-sm" to="/equipment/new">
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
                                                <th width="10%">image</th>
                                                <th width="10%">name</th>
                                                <th width="10%">description</th>
                                                <th width="10%">purchase date</th>
                                                <th width="10%">warranty expiry date</th>
                                                <th width="10%">category</th>
                                                <th width="10%">status</th>
                                                <th width="25%">actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {(equipments.length > 0) ? equipments.map((e,index) => {
                                            return (
                                                <tr key={index}>
                                                    <th>{index+1}</th>
                                                    <td><img className="img-thumbnail" src={`${process.env.REACT_APP_URL}/storage/equipments/` + e.image} width="100" height="100" alt={e.image}/></td>
                                                    <td>{e.name}</td>
                                                    <td>{e.description}</td>
                                                    <td>{moment(e.purchase_date).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(e.warranty_expiry_date).format('DD/MM/YYYY')}</td>
                                                    <td>{e.category.name}</td>
                                                    <td>{(e.status === 0) ? <div className="badge badge-danger text-capitalize p-2 rounded-5">inactive</div> : <div className="badge badge-success text-capitalize p-2 rounded-5">active</div>}</td>
                                                    <td>
                                                        <Link className="btn btn-primary text-capitalize rounded-5 mr-2" to={`/equipment/edit/${e.id}`}>edit</Link>
                                                        <button onClick={()=> {deleteEquipment(e.id)}} className="btn btn-danger text-capitalize rounded-5 mr-2">delete</button>
                                                        {(!e.maintenance) ? <button onClick={()=> {handleMaintenanceEquipment(e)}} className="btn btn-warning text-capitalize rounded-5 mr-2">maintenance</button> : <button onClick={()=> {handleAlreadyInMaintenanceEquipment(e)}} className="btn btn-warning text-capitalize rounded-5">already in maintenance</button> }
                                                        <Link className="btn btn-info text-capitalize rounded-5" to={`/equipment/show/${e.id}`}>view</Link>
                                                    </td>
                                                </tr>
                                            )
                                        }) : (
                                            <tr>
                                                <td colSpan="10">No Data</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                                {(equipments.length > 0) ? (
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
                                ) : ""}
                            </div>
                        </div>
                    </div>
                </div>

                <Modal size="lg" centered show={showMaintenanceEquipmentModal} onHide={handleMaintenanceEquipmentModalClose}>
                    <Formik
                        initialValues={maintenanceEquipment}
                        enableReinitialize
                        validationSchema={equipmentMaintenanceSchema}
                        onSubmit={async (values,{ setSubmitting, setErrors }) => {
                            try {
                                const res = await dispatch(equipmentMaintenanceById(values));
                                if (res.payload.data.success) {
                                    setShowMaintenanceEquipmentModal(false);
                                    getEquipmentList();
                                } else {
                                    setShowMaintenanceEquipmentModal(false);
                                    setNotificationData({
                                        variant: 'danger',
                                        message: res.payload.data.message,
                                        show: true
                                    });
                                    setErrors(res.payload.data.data);
                                    setTimeout(() => {
                                        setNotificationData({variant: "", message: "", show: false});
                                    }, process.env.REACT_APP_NOTIFICATION_TIME);
                                }
                            } catch (err) {
                                console.log(err);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >{({errors, touched}) => (
                        <Form method="post">
                            <Modal.Header closeButton>
                                <Modal.Title>Equipment Maintenance</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group mb-3">
                                    <label htmlFor="schedule-date">Schedule date</label>
                                    <Field type="date" name="schedule_date" className="form-control" id="schedule-date" placeholder="Enter Schedule Date" />
                                    {errors.schedule_date && touched.schedule_date ? (<span className="text-danger">{errors.schedule_date}</span>) : null}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="submit" className="btn btn-primary">Add Maintenance</button>
                                <button type="button" className="btn btn-secondary" onClick={handleMaintenanceEquipmentModalClose}>Close</button>
                            </Modal.Footer>
                        </Form>
                        )}
                    </Formik>
                </Modal>

                <Modal size="lg" centered show={showAlreadyInMaintenanceEquipmentModal} onHide={handleAlreadyMaintenanceEquipmentModalClose}>
                    <Formik
                        initialValues={alreadyMaintenanceEquipment}
                        enableReinitialize
                        validationSchema={removeEquipmentMaintenanceSchema}
                        onSubmit={async (values,{ setSubmitting, setErrors }) => {
                            try {
                                const res = await dispatch(removeEquipmentMaintenanceById(values));
                                if (res.payload.data.success) {
                                    setShowAlreadyInMaintenanceEquipmentModal(false);
                                    getEquipmentList();
                                } else {
                                    setShowAlreadyInMaintenanceEquipmentModal(false);
                                    setNotificationData({
                                        variant: 'danger',
                                        message: res.payload.data.message,
                                        show: true
                                    });
                                    setErrors(res.payload.data.data);
                                    setTimeout(() => {
                                        setNotificationData({variant: "", message: "", show: false});
                                    }, process.env.REACT_APP_NOTIFICATION_TIME);
                                }
                            } catch (err) {
                                console.log(err);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >{({errors, touched}) => (
                        <Form method="post">
                            <Modal.Header closeButton>
                                <Modal.Title>Already Equipment Maintenance</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group mb-3">
                                    <label htmlFor="schedule-date">Schedule date</label>
                                    <div className="form-control" id="schedule-date">{alreadyMaintenanceEquipment.maintenance.scheduled_date}</div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="remark">Remark</label>
                                    <Field type="text" name="remark" className="form-control" id="remark" placeholder="Enter Remark" />
                                    {errors.remark && touched.remark ? (<span className="text-danger">{errors.remark}</span>) : null}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="submit" className="btn btn-primary">Remove From Maintenance</button>
                                <button type="button" className="btn btn-secondary" onClick={handleAlreadyMaintenanceEquipmentModalClose}>Close</button>
                            </Modal.Footer>
                        </Form>
                    )}
                    </Formik>
                </Modal>
            </MasterLayout>
        </>
    )
}

export default EquipmentList;