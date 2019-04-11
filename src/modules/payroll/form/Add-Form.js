import React, { Component } from 'react';
import { Formik } from 'formik';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class studentAdd extends Component {
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
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                  Date
                </label>
                <label>: &nbsp;</label>
                <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
              </div>

              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                  Teacher Name
                </label>
                <label>: &nbsp;</label>
                <select class="form-control">
                      <option value="1">Andi</option>
                      <option value="2">Budi</option>
                      <option value="3">Charly</option>
                    </select>
              </div>
              <div className="form-inline mb-2">
                <label for="count" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                  Student Count
                </label>
                <label>: &nbsp;</label>
                <input type="text" class="form-control mr-sm-2" id="count" disabled />
              </div>
              <div className="form-inline mb-2">
                <label for="salary" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                  Total Salary
                </label>
                <label>: &nbsp;</label>
                <input type="text" class="form-control mr-sm-2" id="salary" disabled />
              </div>
              <div className="form-inline mb-2">
                <label for="vacation" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                  Total Vacation
                </label>
                <label>: &nbsp;</label>
                <input type="text" class="form-control mr-sm-2" id="vacation" disabled />
              </div>
              <div className="form-inline mb-2">
                <label for="absent" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                  Total Absent
                </label>
                <label>: &nbsp;</label>
                <input type="text" class="form-control mr-sm-2" id="absent" disabled />
              </div>
              <div className="form-inline mb-2">
                <label for="total" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                  Total
                </label>
                <label>: &nbsp;</label>
                <input type="text" class="form-control mr-sm-2" id="total" disabled />
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

