import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class classEdit extends Component {
    constructor(props) {
        const { name } = props
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: name,
            redirect: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
        };
        axios.patch('http://localhost:8000/api/class/' + this.props.classId, obj)
            .then(res => console.log(res.data))
            .then(() => this.setState({ redirect: true }));
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/class' />;
        }

        return (
            <div>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = "Required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = "Invalid email address";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                        /* and other goodies */
                    }) => (
                            <div>
                                <form  onSubmit={this.onSubmit} >
                                    <div className="form-group mb-2">
                                        <label for="name" class="mr-sm-2 text-left d-block">
                                            Name
                                        </label>
                                        <input type="text" class="form-control mr-sm-2 w-25" id="name" 
                                        value={this.state.name}
                                        onChange={this.onChangeName}/>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" class="btn btn-primary mb-2">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                </Formik>
            </div>
        )
    }
}

