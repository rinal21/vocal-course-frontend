import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import moment from "moment";
import DatePicker from "react-datepicker";

export default class classAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            birthDate: new Date('2000-01-01'),
            selectedGender: ''

        };
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/branch' />;
        }

        const BranchSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            address: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            noPhone: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            // email: Yup.string()
            //     .email('Invalid email')
            //     .required('Required')
        });

        return (
            <div>
                <Formik
                    initialValues={{ 
                        name: '',
                        address: '',
                        noPhone: '',
                        // email: '',
                    }}
                    validationSchema={BranchSchema}
                    onSubmit={values => {
                        const obj = {
                            name: values.name,
                            // email: values.email,
                            noPhone: values.noPhone,
                            address: values.address
                        };
                        
                        axios.post('http://localhost:8000/api/branch', obj)
                            .then(res => console.log(res.data))
                            .then(() => this.setState({ redirect: true }));
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                    }) => (
                            <div>
                                <Form >
                                    <div className="form-inline mb-2">
                                        <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                                            Name
                                        </label>
                                        <label>: &nbsp;</label>
                                        <Field type="text" class="form-control mr-sm-2 w-25" name="name" value={values.name} />
                                        {errors.name && touched.name ? (
                                            <div style={{ color: 'red' }}>{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-inline mb-2">
                                        <label for="address" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                                            Address
                                        </label>
                                        <label>: &nbsp;</label>
                                        <Field type="text" class="form-control mr-sm-2 w-25" name="address" value={values.address} />
                                        {errors.address && touched.address ? (
                                            <div style={{ color: 'red' }}>{errors.address}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-inline mb-2">
                                        <label for="noHp" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                                            No Phone
                                        </label>
                                        <label>: &nbsp;</label>
                                        <Field type="text" class="form-control mr-sm-2 w-25" name="noPhone" value={values.noPhone} />
                                        {errors.noPhone && touched.noPhone ? (
                                            <div style={{ color: 'red' }}>{errors.noPhone}</div>
                                        ) : null}
                                    </div>
                                    {/* <div className="form-inline mb-2">
                                        <label for="email" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                                            Email
                                        </label>
                                        <label>: &nbsp;</label>
                                        <Field type="text" class="form-control mr-sm-2 w-25" name="email" value={values.email} />
                                        {errors.email && touched.email ? (
                                            <div style={{ color: 'red' }}>{errors.email}</div>
                                        ) : null}
                                    </div> */}

                                    <div className="form-group">
                                        <button type="submit" class="btn btn-primary mb-2">
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        )}
                </Formik>
            </div>
        )
    }
}

