import React, { Component } from 'react';
import { Formik } from 'formik';
import DatePicker from "react-datepicker";

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
                  <div className="form-group mb-2">
                    <label for="username" class="mr-sm-2 text-left d-block" >
                      Username
                    </label>
                    <input type="text" class="form-control mr-sm-2 w-25" id="username" />
                  </div>
                  <div className="form-group mb-2">
                    <label for="email" class="mr-sm-2 text-left d-block" >
                      Email
                    </label>
                    <input type="text" class="form-control mr-sm-2 w-25" id="email" />
                  </div>
                  <div className="form-group mb-2">
                    <label for="password" class="mr-sm-2 text-left d-block" >
                      Password
                    </label>
                    <input type="text" class="form-control mr-sm-2 w-25" id="password" />
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

