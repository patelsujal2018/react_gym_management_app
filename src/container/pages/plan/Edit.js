import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import MasterLayout from '../../layouts/master';
import {planById,updatePlan} from "../../../store/planSlice";
import {planSchema} from "../../../schemas/validationSchemas";


const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notificationData, setNotificationData] = useState({});
    const {id} = useParams();
    const [plan, setPlan] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
    });

    const getPlanDetail = useCallback(async (planId) => {
        try {
            const res = await dispatch(planById(planId));
            if (res.payload.data.success) {
                setPlan(res.payload.data.data);
            }
        } catch(err) {
            console.log(err);
        }
    },[dispatch]);

    useEffect(() => {
        getPlanDetail(id)
    }, [id,getPlanDetail]);

    return (
        <>
            <MasterLayout notificationData={notificationData}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Edit Plan</h3>
                            </div>
                            <Formik
                                initialValues={plan}
                                enableReinitialize
                                validationSchema={planSchema}
                                onSubmit={async (values,{ setSubmitting, setErrors }) => {
                                    const formData = new FormData();
                                    formData.append('id',values.id);
                                    formData.append('_method','PUT');
                                    formData.append('name',values.name);
                                    formData.append('price',values.price);
                                    formData.append('description',values.description);

                                    try {
                                        const res = await dispatch(updatePlan(formData));
                                        if (res.payload.success) {
                                            navigate('/plan');
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
                                {({errors, touched}) => (
                                    <Form method="post">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="plan-name">Plan Name</label>
                                                <Field type="text" name="name" className="form-control" id="plan-name" placeholder="Enter Plan Name" />
                                                {errors.name && touched.name ? (<span className="text-danger">{errors.name}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="plan-price">Plan Price</label>
                                                <Field type="number" name="price" className="form-control" id="plan-price" placeholder="Enter Plan Price" />
                                                {errors.price && touched.price ? (<span className="text-danger">{errors.price}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="plan-description">Plan Description</label>
                                                <Field type="text" name="description" className="form-control" id="plan-description" placeholder="Enter Plan Description" />
                                                {errors.description && touched.description ? (<span className="text-danger">{errors.description}</span>) : null}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary mr-5">Submit</button>
                                            <NavLink className="btn btn-secondary" to="/plan">Cancel</NavLink>
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