import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import MasterLayout from '../../layouts/master';
import {customerById, updateCustomer} from "../../../store/customerSlice";
import {updateCustomerSchema} from "../../../schemas/validationSchemas";

const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [customer, setCustomer] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        id_proof_image: '',
        address: '',
        note: ''
    });
    const [notificationData, setNotificationData] = useState({});

    const getCustomerDetail = useCallback(async (customerId) => {
        dispatch(customerById(customerId)).then((res) => {
            if(res.payload.data.success) {
                const sanitizedInitialValues = Object.fromEntries(Object.entries(res.payload.data.data).map(([key, value]) => [key, value !== null ? value : '']))
                setCustomer(sanitizedInitialValues);
            }
        }).catch((err) => {
            console.log(err);
        });
    },[dispatch])

    useEffect(() => {
        getCustomerDetail(id)
    }, [id,getCustomerDetail]);

    return (
        <>
            <MasterLayout notificationData={notificationData}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Edit Customer</h3>
                            </div>
                            <Formik
                                initialValues={customer}
                                enableReinitialize
                                validationSchema={updateCustomerSchema}
                                onSubmit={async (values,{ setSubmitting, setErrors }) => {
                                    const formData = new FormData();
                                    formData.append('id',values.id);
                                    formData.append('_method','PUT');
                                    formData.append('first_name',values.first_name);
                                    formData.append('last_name',values.last_name);
                                    formData.append('email',values.email);
                                    formData.append('mobile',values.mobile);
                                    formData.append('address',values.address);
                                    formData.append('note',values.note);
                                    if (values.id_proof_image instanceof File) {
                                        formData.append('id_proof_image', values.id_proof_image);
                                    }

                                    try {
                                        const res = await dispatch(updateCustomer(formData));
                                        if (res.payload.success) {
                                            navigate('/customer');
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
                                            {customer.id_proof_image && (
                                                <div className="form-group">
                                                    <img className="img-thumbnail" src={`${process.env.REACT_APP_URL}/storage/customers/` + customer.id_proof_image} width="150" height="150" alt="ID Proof" />
                                                </div>
                                            )}
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

export default Edit;