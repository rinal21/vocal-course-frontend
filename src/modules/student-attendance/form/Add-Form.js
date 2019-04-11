import React, { Component } from 'react';
import { Formik } from 'formik';

import "react-datepicker/dist/react-datepicker.css";

export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  render() {
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
                <form action="/action_page.php">
                  <div className="form-inline mb-2">
                    <label for="date" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Date
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="date" value="11/04/2019" disabled />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Student Name
                  </label>
                    <label>: &nbsp;</label>
                    <select class="form-control">
                      <option value="1">Andi</option>
                      <option value="2">Budi</option>
                      <option value="3">Charly</option>
                    </select>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="absent" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Is Absent
                  </label>
                    <label>: &nbsp;</label>
                    <select class="form-control">
                      <option value="">Choose one</option>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="permission" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Is With Permission
                  </label>
                    <label>: &nbsp;</label>
                    <select class="form-control">
                      <option value="">Choose one</option>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
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

