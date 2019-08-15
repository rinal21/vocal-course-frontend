import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class classAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/class' />;
        }

        const ClassSchema = Yup.object().shape({
            NameClass: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required')
        });

        return (
            <div>
                <Formik
                    initialValues={{ NameClass: "" }}
                    validationSchema={ClassSchema}
                    onSubmit={values => {
                        const obj = {
                            name: values.NameClass,
                        };
                        axios.post('localhost:8000/api/class', obj)
                            .then(res => console.log(res.data))
                            .then(() => this.setState({ redirect: true }));

                    }}
                >
                    {({
                        errors,
                        touched,
                    }) => (
                            <div>
                                <Form >
                                    <div className="form-group mb-2">
                                        <label for="name" class="mr-sm-2 text-left d-block">
                                            Name
                                        </label>
                                        <Field type="text" class="form-control mr-sm-2 w-25" name="NameClass" />
                                        {errors.NameClass && touched.NameClass ? (
                                            <div style={{ color: 'red' }}>{errors.NameClass}</div>
                                        ) : null}
                                    </div>

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

