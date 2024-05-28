import React, {useState} from "react";
import {Alert} from "react-bootstrap";
import AuthLayout from "../../layouts/auth/AuthLayout";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {userLogin} from "../../../store/authSlice";
import {loginSchema} from "../../../schemas/validationSchemas";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [notificationData, setNotificationData] = useState({});

    return (
        <>
            <AuthLayout>
                <div className="hold-transition login-page">
                    <div className="login-box">
                        <div className="login-logo">
                            <a href={process.env.REACT_APP_BASE_URL}><span className="text-uppercase fw-bolder">{process.env.REACT_APP_NAME}</span>&nbsp;|&nbsp;<span className="text-capitalize">login</span></a>
                        </div>
                        {(notificationData && notificationData.show === true) ? (
                            <Alert className="col-12" variant={notificationData.variant} show={notificationData.show}>{notificationData.message}</Alert>
                        ) : ""}
                        <div className="card">
                            <div className="card-body login-card-body">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <Formik
                                    initialValues={{
                                        email: 'patelsujal2021@gmail.com',
                                        password: 123456789
                                    }}
                                    validationSchema={loginSchema}
                                    onSubmit={async (values) => {
                                        dispatch(userLogin(values)).then(res => {
                                            if (res.payload.data.success) {
                                                navigate('/dashboard');
                                            } else {
                                                setNotificationData({
                                                    variant: 'danger',
                                                    message: res.payload.data.message,
                                                    show: true
                                                });
                                                setValidationErrors(res.payload.data.data);
                                                setTimeout(() => {
                                                    setNotificationData({variant: "", message: "", show: false});
                                                }, process.env.REACT_APP_NOTIFICATION_TIME);
                                            }
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                    }}
                                >
                                    {({errors, touched}) => (
                                        <Form method="post">
                                            <div className="input-group mt-3">
                                                <Field type="email" name="email" className="form-control" id="email" placeholder="Email"/>
                                                <div className="input-group-append">
                                                    <div className="input-group-text">
                                                        <span className="fas fa-envelope"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.email && touched.email ? (<span className="text-danger">{errors.email}</span>) : null}
                                            {(!!validationErrors && validationErrors.email) ? (<span className="text-danger">{validationErrors.email}</span>) : null}
                                            <div className="input-group mt-3">
                                                <Field type="password" name="password" className="form-control"
                                                       id="password" placeholder="Password"/>
                                                <div className="input-group-append">
                                                    <div className="input-group-text">
                                                        <span className="fas fa-lock"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.password && touched.password ? (<span className="text-danger">{errors.password}</span>) : null}
                                            {(!!validationErrors && validationErrors.password) ? (<span className="text-danger">{validationErrors.password}</span>) : null}
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <p className="mb-0">
                                    <a href={process.env.REACT_APP_REGISTRATION_URL}>I forgot my password</a>
                                </p>
                                <p className="mb-0">
                                    <a href={process.env.REACT_APP_REGISTRATION_URL} className="text-center">Register a new membership</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default Login;