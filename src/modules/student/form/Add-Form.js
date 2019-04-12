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
              //     <form onSubmit={handleSubmit}>
              //     <div className="form-group">
              //     <label>First Name</label>
              //       <input
              //         type="email"
              //         name="email"
              //         onChange={handleChange}
              //         onBlur={handleBlur}
              //         value={values.email}
              //       />
              //       {errors.email && touched.email && errors.email}
              //     </div>
              //     <div className="form-group">
              //       <input
              //         type="password"
              //         name="password"
              //         onChange={handleChange}
              //         onBlur={handleBlur}
              //         value={values.password}
              //       />
              //       {errors.password && touched.password && errors.password}
              //     </div>
              //     <div className="form-group">
              //     <button type="submit" disabled={isSubmitting}>
              //       Submit
              //     </button>
              //     </div>

              //   </form>

              <div>
                <h5>Student Information</h5>
                <hr />
                <form action="/action_page.php">
                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="first" class="mr-sm-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="first"
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="middle" class="mr-sm-2">
                            Middle
                        </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="middle"
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="last" class="mr-sm-2">
                            Last
                          </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="last"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="address" class="mr-sm-2">
                        Street Address
                      </label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="address" />
                    </div>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="school" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                            School
                          </label>
                          <input type="text" class="form-control mb-2 mr-sm-2" id="school" />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="email" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                            Email
                          </label>
                          <input type="email" class="form-control mb-2 mr-sm-2" id="email" />
                        </div>
                      </div>
                    </div>                                           
                    <div class="row">
                      <div class="col-sm">
                      <div className="form-group">
                      <label for="birthdate" class="mr-sm-2 text-left d-block">
                        Birth date
                      </label>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="form-control"
                      />
                      {/* <input type="text" class="form-control mb-2 mr-sm-2" id="birthdate" /> */}
                    </div>
                      </div>
                      <div class="col-sm">
                      <div className="form-group">
                      <label for="age" class="mr-sm-2 text-left d-block">
                        Age
                      </label>
                      <input type="text" class="form-control mt-2 mb-2 mr-sm-2" id="age" />
                    </div>
                      </div>
                      <div class="col-sm">
                      <div className="form-group mb-2">
                      <label for="sex" class="mr-sm-2 text-left d-block">
                        Sex
                      </label>
                      <label class="radio-inline mr-2"><input type="radio" name="optradio" checked />Female</label>
                      <label style={{marginRight: 10}}>/</label>
                      <label class="radio-inline"><input type="radio" name="optradio" />Male</label>
                      {/* <input type="text" class="form-control mb-2 mr-sm-2" id="sex" /> */}
                    </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="cellphone" class="mr-sm-2 text-left d-block">
                            Cell Phone
                          </label>
                          <input type="text" class="form-control mb-2 mr-sm-2" id="cellphone" />
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group">
                          <label for="homephone" class="mr-sm-2 text-left d-block">
                            Home Phone No
                          </label>
                          <input type="text" class="form-control mb-2 mr-sm-2" id="homephone" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 class="mt-4">Parents Information</h5>
                  <hr />
                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div className="form-group">
                      <label for="school" class="mr-sm-2 text-left d-block" style={{ width: 180 }}>
                        Person responsible for bill
                    </label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="school" />
                    </div>
                    <div className="form-group mb-2">
                      <label for="sex" class="mr-sm-2 text-left d-block" style={{ width: 180 }}>
                          Choose KBL because
                      </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optradio" checked />Friends</label>
                      <label class="radio-inline mr-3"><input type="radio" name="optradio" />Event</label>
                      <label class="radio-inline mr-3"><input type="radio" name="optradio" />Newspaper</label>
                      <label class="radio-inline mr-3"><input type="radio" name="optradio" />Close to home/work</label>
                      <label class="radio-inline mr-3"><input type="radio" name="optradio" />internet</label>
                      <label class="radio-inline mr-3"><input type="radio" name="optradio" />Brocures</label>
                      <label class="radio-inline mr-3"><input type="radio" name="optradio" />Others</label>
                    </div>
                  </div>
                  <h5 class="mt-4">Audition Information</h5>
                  <hr />
                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div className="form-group">
                      <label for="homephone" class="mr-sm-2 text-left d-block" style={{ width: 182 }}>
                        Instructor Audition
                      </label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="homephone" />
                    </div>

                    <div className="form-group mb-2">
                      <label for="homephone" class="mr-sm-2 text-left d-block" style={{ width: 182 }}>
                        Indicate audition results
                      </label>
                      <select class="form-control">
                        <option value="Basic 1">Basic 1</option>
                        <option value="Basic 2">Basic 2</option>
                        <option value="Middle 1">Middle 1</option>
                        <option value="Middle 2">Middle 2</option>
                        <option value="Pre Advance">Pre Advance</option>
                        <option value="Advance 1">Advance 1</option>
                        <option value="Advance 2">Advance 2</option>
                        <option value="Executive">Executive</option>
                        <option value="Group">Group</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group mb-2">
                      <label for="homephone" class="mr-sm-2 text-left d-block" style={{ width: 182 }}>
                        The course will be followed
                      </label>
                      <select class="form-control">
                        <option value="Vocal">Vocal</option>
                        <option value="Piano">Piano</option>
                        <option value="Guitar Acoustic">Guitar Acoustic</option>
                        <option value="Keyboard">Keyboard</option>
                        <option value="Dance / Stage Act">Dance / Stage Act</option>
                        <option value="Drum">Drum</option>
                        <option value="Guitar Electric">Guitar Electric</option>
                        <option value="Bass">Bass</option>
                      </select>
                    </div>
                  </div>

                  <h5 class="mt-4">Result</h5>
                  <hr />

                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="first" class="mr-sm-2">
                            Name of instructor
                        </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="first"
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="middle" class="mr-sm-2">
                            Days
                        </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="middle"
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="last" class="mr-sm-2">
                            Hours
                        </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="last"
                          />
                        </div>
                      </div>

                    </div>

                      <div className="form-group">
                        
                        
                        
                      </div>
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

