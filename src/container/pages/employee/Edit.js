import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import MasterLayout from '../../layouts/master';
import {employeeById, updateEmployee} from "../../../store/employeeSlice";
import {employeeRoleList} from "../../../store/employeeRoleSlice";
import {employeeSchema} from "../../../schemas/validationSchemas";

const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [employee, setEmployee] = useState({
        id: '',
        employee_role_id: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        salary: '',
        id_proof: ''
    });
    const [roles, setRoles] = useState([]);
    const [notificationData, setNotificationData] = useState({});

    const getEmployeeDetail = useCallback(async (employeeId) => {
        try {
            const res = await dispatch(employeeById(employeeId));
            if (res.payload.data.success) {
                setEmployee(res.payload.data.data);
            }
        } catch(err) {
            console.log(err);
        }
    },[dispatch]);

    const getRoles = useCallback(async () => {
        try {
            const res = await dispatch(employeeRoleList());
            if (res.payload.data.success) {
                setRoles(res.payload.data.data);
            }
        } catch(err) {
            console.log(err);
        }
    },[dispatch]);

    useEffect(() => {
        getRoles();
        getEmployeeDetail(id)
    }, [getRoles,getEmployeeDetail,id]);

    return (
        <>
            <MasterLayout notificationData={notificationData}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Edit Employee</h3>
                            </div>
                            <Formik
                                initialValues={employee}
                                enableReinitialize
                                validationSchema={employeeSchema}
                                onSubmit={async (values,{ setSubmitting, setErrors }) => {
                                    const formData = new FormData();
                                    formData.append('id',values.id);
                                    formData.append('_method','PUT');
                                    formData.append('employee_role_id',values.employee_role_id);
                                    formData.append('first_name',values.first_name);
                                    formData.append('last_name',values.last_name);
                                    formData.append('email',values.email);
                                    formData.append('mobile',values.mobile);
                                    formData.append('salary',values.salary);
                                    if (values.id_proof instanceof File) {
                                        formData.append('id_proof', values.id_proof);
                                    }

                                    try {
                                        const res = await dispatch(updateEmployee(formData));
                                        if (res.payload.success) {
                                            navigate('/employee');
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
                                            {employee.id_proof && (
                                                <div className="form-group">
                                                    <img className="img-thumbnail" src={`${process.env.REACT_APP_URL}/storage/proofs/` + employee.id_proof} width="150" height="150" alt="ID Proof" />
                                                </div>
                                            )}
                                            <div className="form-group">
                                                <label htmlFor="employee-role">Role</label>
                                                <Field as="select" name="employee_role_id" className="form-control" id="employee-role">
                                                    <option value="">select</option>
                                                    {roles.length > 0 && roles.map((r,index) => (
                                                        <option key={r.id} value={r.id}>{r.name}</option>
                                                    ))}
                                                </Field>
                                                {errors.employee_role_id && touched.employee_role_id ? (<span className="text-danger">{errors.employee_role_id}</span>) : null}
                                            </div>
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
                                                <label htmlFor="salary">Salary</label>
                                                <Field type="number" name="salary" className="form-control" id="salary" placeholder="Enter Salary" />
                                                {errors.salary && touched.salary ? (<span className="text-danger">{errors.salary}</span>) : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="id_proof">Id Proof</label>
                                                <input type="file" name="id_proof" className="form-control" id="id_proof" onChange={(event) => { setFieldValue("id_proof", event.currentTarget.files[0]); }} />
                                                {errors.id_proof && touched.id_proof ? (<span className="text-danger">{errors.id_proof}</span>) : null}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary mr-5">Submit</button>
                                            <NavLink className="btn btn-secondary" to="/employee">Cancel</NavLink>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    );
};

export default Edit;