import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";
import MasterLayout from '../../layouts/master';
import {equipmentById} from "../../../store/equipmentSlice";
import moment from "moment";

const View = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [equipment, setEquipment] = useState({});

    const getEquipmentDetail = useCallback((equipmentId) => {
        dispatch(equipmentById(equipmentId)).then(res => {
            if (res.payload.data.success) {
                setEquipment(res.payload.data.data);
            }
        }).catch((err) =>{
            console.log(err);
        });

        // try {
        //     const res = await dispatch(equipmentById(equipmentId));
        //     if (res.payload.data.success) {
        //         setEquipment(res.payload.data.data);
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    },[dispatch])

    useEffect(() => {
        getEquipmentDetail(id)
    }, [id,getEquipmentDetail]);

    return (
        <>
            <MasterLayout>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Equipment Details</h3>
                            </div>
                            <div className="card-body">
                                {equipment.image && (
                                    <div className="form-group">
                                        <img className="img-thumbnail" src={`${process.env.REACT_APP_URL}/storage/equipments/` + equipment.image} width="150" height="150" alt={equipment.image}/>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="equipment-category">Category</label>
                                    <div className="form-control" id="equipment-category">{equipment?.category?.name}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="equipment-name">Equipment Name</label>
                                    <div className="form-control" id="equipment-name">{equipment.name}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="equipment-description">Equipment Description</label>
                                    <div className="form-control" id="equipment-description">{equipment.description}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="purchase-date">Purchase Date</label>
                                    <div className="form-control" id="purchase-date">{moment(equipment.purchase_date).format('DD/MM/YYYY')}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="warranty-expiry-date">Warranty Expiry Date</label>
                                    <div className="form-control" id="warranty-expiry-date">{moment(equipment.warranty_expiry_date).format('DD/MM/YYYY')}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="equipment-status">Status</label>
                                    <div id="equipment-status">
                                        {(equipment.status === 0) ? <div className="badge badge-danger text-capitalize p-2 rounded-5">inactive</div> : <div className="badge badge-success text-capitalize p-2 rounded-5">active</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <NavLink className="btn btn-secondary" to="/equipment">Back</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Maintenance Logs</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr className="text-capitalize">
                                        <th width="5%">#</th>
                                        <th width="10%">scheduled date</th>
                                        <th width="10%">remark</th>
                                        <th width="10%">created date</th>
                                        <th width="10%">status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {equipment?.maintenances?.length > 0 ? (equipment.maintenances.map((em,index) => (
                                        <tr key={index}>
                                            <th>{index+1}</th>
                                            <td>{moment(em.scheduled_date).format('DD/MM/YYYY')}</td>
                                            <td>{em.remark ?? '-'}</td>
                                            <td>{moment(em.created_at).format('DD/MM/YYYY')}</td>
                                            <td>
                                                {(em.status === 1) ? <div className="badge badge-warning text-capitalize p-2 rounded-5">scheduled</div> : (em.status === 2) ? <div className="badge badge-success text-capitalize p-2 rounded-5">completed</div> : <div className="badge badge-danger text-capitalize p-2 rounded-5">canceled</div>}
                                            </td>
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <td colSpan="5">No Data</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    );
};

export default View;