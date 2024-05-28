import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import MasterLayout from '../../layouts/master';
import {storeCustomer} from "../../../store/customerSlice";
import {createCustomerSchema} from "../../../schemas/validationSchemas";
import {getAllPlans} from "../../../store/planSlice";

const Add = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notificationData, setNotificationData] = useState({});
    const [plans, setPlans] = useState([]);

    const getAllPlanList = useCallback(async () => {
        dispatch(getAllPlans()).then((res) => {
            if(res.payload.data.success) {
                setPlans(res.payload.data.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    },[dispatch])

    useEffect(() => {
        getAllPlanList();
    }, [getAllPlanList]);

    return (
        <>
            <MasterLayout notificationData={notificationData}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Add New Customer</h3>
                            </div>
                            <Formik
                                initialValues={{
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    mobile: '',
                                    id_proof_image: '',
                                    address: '',
                                    note: '',
                                    plan_id: ''
                                }}
                                validationSchema={createCustomerSchema}
                                onSubmit={async (values,{ setSubmitting, setErrors }) => {
                                    const formData = new FormData();
                                    formData.append('first_name',values.first_name);
                                    formData.append('last_name',values.last_name);
                                    formData.append('email',values.email);
                                    formData.append('mobile',values.mobile);
                                    formData.append('address',values.address);
                                    formData.append('note',values.note);
                                    formData.append('plan_id',values.plan_id);
                                    if (values.id_proof_image instanceof File) {
                                        formData.append('id_proof_image', values.id_proof_image);
                                    }

                                    try {
                                        const res = await dispatch(storeCustomer(formData));
                                        if (res.payload.data.success) {
                                            navigate('/customer');
                                        } else {
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
                            >
                                {({errors, touched, setFieldValue}) => (
                                    <Form method="post">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="first-name">First Name</label>
                                                <Field type="text" name="first_name" className="form-control" id="first-name" placeholder="Enter First Name" />
                                                {errors.first_name && touched.first_name ? (<span className="text-danger">{errors.first_name}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="last-name">Last Name</label>
                                                <Field type="text" name="last_name" className="form-control" id="last-name" placeholder="Enter Last Name" />
                                                {errors.last_name && touched.last_name ? (<span className="text-danger">{errors.last_name}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field type="email" name="email" className="form-control" id="email" placeholder="Enter Email" />
                                                {errors.email && touched.email ? (<span className="text-danger">{errors.email}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="mobile">Mobile</label>
                                                <Field type="number" name="mobile" className="form-control" id="mobile" placeholder="Enter Mobile" />
                                                {errors.mobile && touched.mobile ? (<span className="text-danger">{errors.mobile}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address">Address</label>
                                                <Field type="text" name="address" className="form-control" id="address" placeholder="Enter Address" />
                                                {errors.address && touched.address ? (<span className="text-danger">{errors.address}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="id_proof">Id Proof</label>
                                                <input type="file" name="id_proof" className="form-control" id="id_proof" onChange={(event) => { setFieldValue("id_proof_image", event.currentTarget.files[0]); }} />
                                                {errors.id_proof_image && touched.id_proof_image ? (<span className="text-danger">{errors.id_proof_image}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="plan_id">Plan</label>
                                                <Field as="select" name="plan_id" className="form-control" id="plan_id">
                                                    <option value="">select</option>
                                                    {(plans.length > 0) ? plans.map((p,index) => (
                                                        <option key={index} value={p.id}>{p.name}</option>
                                                    )) : ""}
                                                </Field>
                                                {errors.plan_id && touched.plan_id ? (<span className="text-danger">{errors.plan_id}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="note">Note</label>
                                                <Field type="text" name="note" className="form-control" id="note" placeholder="Enter Note" />
                                                {errors.note && touched.note ? (<span className="text-danger">{errors.note}</span>) : null}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary mr-5">Submit</button>
                                            <NavLink className="btn btn-secondary" to="/customer">Cancel</NavLink>
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

export default Add;