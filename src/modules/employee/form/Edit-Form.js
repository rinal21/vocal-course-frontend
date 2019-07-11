import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import moment from "moment";
import DatePicker from "react-datepicker";

export default class classEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            birthDate: new Date('2000-01-01'),
            selectedGender: '',
            name: '',
            address: '',
            noHp: '',
            email: '',
            isLoaded: false
        };
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
    }

    onChangeGender = changeEvent => {
        this.setState({ selectedGender: changeEvent.target.value })
    }

    onChangeBirthDate(date) {
        this.setState({
            birthDate: date
        });
    }

    componentDidMount = () => {
        // ajax call
        this.fetchDatas()
      }

    fetchDatas = () => {
        const { employeeId } = this.props
        fetch('http://localhost:8000/api/employee/' + employeeId)
          .then(response => response.json())
          .then((json) => {
            json.map((data, index) => {
              this.setState({
                name: data.employee_name,
                selectedGender: data.gender,
                address: data.address,
                noHp: data.no_hp,
                email: data.email,
                address: data.address,
                birthDate: data.birthdate,
              })
            })
            this.setState({isLoaded: true})
          })
      }

    render() {
        const { redirect, name, selectedGender, address, noHp, email, isLoaded } = this.state;
        const { employeeId } = this.props
        if (redirect) {
            return <Redirect to='/employee' />;
        }

        const EmployeeSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            address: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            noHp: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email')
                .required('Required')
        });
        return (
            <div>
                {isLoaded && (
                    <Formik
                        initialValues={{
                            name: name,
                            address: address,
                            noHp: noHp,
                            email: email,
                            gender: selectedGender,
                        }}
                        validationSchema={EmployeeSchema}
                        onSubmit={values => {
                            const obj = {
                                name: values.name,
                                gender: this.state.selectedGender,
                                email: values.email,
                                noHp: values.noHp,
                                address: values.address,
                                birthdate: moment(this.state.birthDate).format("YYYY-MM-DD")
                            };

                            axios.patch('http://localhost:8000/api/employee/' + employeeId, obj)
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
                                            <label for="gender" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                                                Gender
                                        </label>
                                            <label>: &nbsp;</label>
                                            <label class="radio-inline mr-2">
                                                <input type="radio" name="optgender" value="F"
                                                    checked={this.state.selectedGender === "F"}
                                                    onChange={this.onChangeGender} />Female
                                        </label>
                                            <label style={{ marginRight: 10 }}>/</label>
                                            <label class="radio-inline"><input type="radio" name="optgender" value="M"
                                                checked={this.state.selectedGender === "M"}
                                                onChange={this.onChangeGender} />Male
                                        </label>
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
                                                No HP
                                        </label>
                                            <label>: &nbsp;</label>
                                            <Field type="text" class="form-control mr-sm-2 w-25" name="noHp" value={values.noHp} />
                                            {errors.noHp && touched.noHp ? (
                                                <div style={{ color: 'red' }}>{errors.noHp}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-inline mb-2">
                                            <label for="email" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                                                Email
                                        </label>
                                            <label>: &nbsp;</label>
                                            <Field type="text" class="form-control mr-sm-2 w-25" name="email" value={values.email} />
                                            {errors.email && touched.email ? (
                                                <div style={{ color: 'red' }}>{errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-inline mb-2">
                                            <label for="birthdate" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                                                Birth date
                                        </label>
                                            <label>: &nbsp;</label>
                                            <DatePicker
                                                selected={this.state.birthDate}
                                                onChange={this.onChangeBirthDate}
                                                dateFormat="d-MM-yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                className="form-control"
                                            />
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
                )}
            </div>
        )
    }
}

