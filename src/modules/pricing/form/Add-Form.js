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
                    <label for="class" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Class
                    </label>
                    <label>: &nbsp;</label>
                    <select class="form-control">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="price" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Price
                </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="price" />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="totalMeetup" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Total Meetup
                </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="totalMeetup" />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="duration" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Duration
                </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="duration" />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="difficulty" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Type by difficulty
                    </label>
                    <label>: &nbsp;</label>
                    <select class="form-control">
                      <option value="1">Basic</option>
                      <option value="2">Intermediate</option>
                      <option value="3">Pre adv & adv</option>
                    </select>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="teacher" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Type by teacher
                    </label>
                    <label>: &nbsp;</label>
                    <select class="form-control">
                      <option value="1">Regular teacher class</option>
                      <option value="2">Senior teacher class</option>
                    </select>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="participant" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Type by participant
                    </label>
                    <label>: &nbsp;</label>
                    <select class="form-control">
                      <option value="1">Private</option>
                      <option value="2">Semi Private</option>
                      <option value="3">Group</option>
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

