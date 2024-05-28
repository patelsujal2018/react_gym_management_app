import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import MasterLayout from '../../layouts/master';
import {equipmentById, updateEquipment} from "../../../store/equipmentSlice";
import {equipmentCategoryList} from "../../../store/equipmentCategorySlice";
import {equipmentSchema} from "../../../schemas/validationSchemas";

const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [equipment, setEquipment] = useState({
        id: '',
        category_id: '',
        image: '',
        name: '',
        description: '',
        purchase_date: '',
        warranty_expiry_date: '',
        status: ''
    });
    const [categories, setCategories] = useState([]);
    const [notificationData, setNotificationData] = useState({});

    const getEquipmentDetail = useCallback(async (equipmentId) => {
        try {
            const res = await dispatch(equipmentById(equipmentId));
            if (res.payload.data.success) {
                setEquipment(res.payload.data.data);
            }
        } catch(err) {
            console.log(err);
        }
    },[dispatch]);

    const getCategories = useCallback(async () => {
        try {
            const res = await dispatch(equipmentCategoryList());
            if (res.payload.data.success) {
                setCategories(res.payload.data.data);
            }
        } catch(err) {
            console.log(err);
        }
    },[dispatch]);

    useEffect(() => {
        getCategories();
        getEquipmentDetail(id)
    }, [getCategories,getEquipmentDetail,id]);

    return (
        <>
            <MasterLayout notificationData={notificationData}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Edit Equipment</h3>
                            </div>
                            <Formik
                                initialValues={equipment}
                                enableReinitialize
                                validationSchema={equipmentSchema}
                                onSubmit={async (values,{ setSubmitting, setErrors }) => {
                                    const formData = new FormData();
                                    formData.append('id',values.id);
                                    formData.append('_method','PUT');
                                    formData.append('category_id',values.category_id);
                                    formData.append('name',values.name);
                                    formData.append('description',values.description);
                                    formData.append('purchase_date',values.purchase_date);
                                    formData.append('warranty_expiry_date',values.warranty_expiry_date);
                                    formData.append('status',values.status);

                                    if (values.image instanceof File) {
                                        formData.append('image', values.image);
                                    }

                                    try {
                                        const res = await dispatch(updateEquipment(formData));
                                        if (res.payload.success) {
                                            navigate('/equipment');
                                        } else {
                                            setNotificationData({
                                                variant: 'danger',
                                                message: res.payload.message,
                                                show: true
                                            });
                                            setErrors(res.payload.data);
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
                            >
                                {({errors, touched, setFieldValue}) => (
                                    <Form method="post">
                                        <div className="card-body">
                                            {equipment.image && (
                                                <div className="form-group">
                                                    <img className="img-thumbnail" src={`${process.env.REACT_APP_URL}/storage/equipments/` + equipment.image} width="150" height="150" alt={equipment.image} />
                                                </div>
                                            )}
                                            <div className="form-group">
                                                <label htmlFor="equipment-category">Category</label>
                                                <Field as="select" name="category_id" className="form-control" id="equipment-category">
                                                    <option value="">select</option>
                                                    {categories.length > 0 && categories.map((c,index) => (
                                                        <option key={index} value={c.id}>{c.name}</option>
                                                    ))}
                                                </Field>
                                                {errors.category_id && touched.category_id ? (<span className="text-danger">{errors.category_id}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="equipment-name">Equipment Name</label>
                                                <Field type="text" name="name" className="form-control" id="equipment-name" placeholder="Enter Equipment Name" />
                                                {errors.name && touched.name ? (<span className="text-danger">{errors.name}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="equipment-description">Equipment Description</label>
                                                <Field type="text" name="description" className="form-control" id="equipment-description" placeholder="Enter Equipment Description" />
                                                {errors.description && touched.description ? (<span className="text-danger">{errors.description}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="purchase-date">Purchase Date</label>
                                                <Field type="date" name="purchase_date" className="form-control" id="purchase-date" placeholder="Enter Purchase Date" />
                                                {errors.purchase_date && touched.purchase_date ? (<span className="text-danger">{errors.purchase_date}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="warranty-expiry-date">Warranty Expiry Date</label>
                                                <Field type="date" name="warranty_expiry_date" className="form-control" id="warranty-expiry-date" placeholder="Enter Warranty Expiry Date" disabled />
                                                {errors.warranty_expiry_date && touched.warranty_expiry_date ? (<span className="text-danger">{errors.warranty_expiry_date}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="image">Image</label>
                                                <input type="file" name="image" className="form-control" id="image" onChange={(event) => { setFieldValue("image", event.currentTarget.files[0]); }} />
                                                {errors.image && touched.image ? (<span className="text-danger">{errors.image}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="equipment-status">Status</label>
                                                <div id="equipment-status">
                                                    <div className="form-check">
                                                        <label className="form-check-label"><Field className="form-check-input" type="radio" name="status" value="0" checked={equipment.status === 0} onChange={(e) => setEquipment({...equipment, status: e.target.value })} />Inactive</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label"><Field className="form-check-input" type="radio" name="status" value="1" checked={equipment.status === 1} onChange={(e) => setEquipment({...equipment, status: e.target.value })} />Active</label>
                                                    </div>
                                                </div>
                                                {errors.status && touched.status ? (<span className="text-danger">{errors.status}</span>) : null}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary mr-5">Submit</button>
                                            <NavLink className="btn btn-secondary" to="/equipment">Cancel</NavLink>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    )
}

export default Edit;