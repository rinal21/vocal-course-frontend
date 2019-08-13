import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class teacherEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/teacher' />;
    }
    const TeacherSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      salary: Yup.number()
        .min(100000, 'Too Few!')
        .max(1000000000, 'Too Much!')
        .required('Required')
    });

    const { name, salary, teacherId } = this.props;
    return (
      <div>
        <Formik
          initialValues={{
            name: name,
            salary: salary,
          }}
          validationSchema={TeacherSchema}
          onSubmit={values => {
            const obj = {
              name: values.name,
              salary: values.salary
            };
            axios.patch('http://103.30.247.147:8000/api/teacher/' + teacherId, obj)
              .then(res => console.log(res.data))
              .then(() => this.setState({ redirect: true }));

          }}>
          {({
            errors,
            touched,
            values
          }) => (
              <div>
                <Form>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Name
                    </label>
                    <label>: &nbsp;</label>
                    <Field type="text" class="form-control mr-sm-2 w-25" name="name" />
                    {errors.name && touched.name ? (
                      <div style={{ color: 'red' }}>{errors.name}</div>
                    ) : null}
                  </div>
                  <div className="form-inline mb-2">
                    <label for="salary" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Salary
                    </label>
                    <label>: &nbsp;</label>
                    <Field type="text" class="form-control mr-sm-2 w-25" name="salary" value={(/^\d+$/.test(values.salary) || values.salary == '') ? values.salary : ''} />
                    {errors.salary && touched.salary ? (
                      <div style={{ color: 'red' }}>{errors.salary}</div>
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

