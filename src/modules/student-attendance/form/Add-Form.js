import React, { Component } from 'react';
import { Formik } from 'formik';
import DatePicker from "react-datepicker";
import ReactAutocomplete from 'react-autocomplete'

import "react-datepicker/dist/react-datepicker.css";


export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      value: '',
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
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        peekNextMonth
                        dropdownMode="select"
                        className="form-control"
                      />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Student Name
                  </label>
                    <label>: &nbsp;</label>
                    <ReactAutocomplete
                      items={[
                        { id: '1', label: 'Andi' },
                        { id: '2', label: 'Budi' },
                        { id: '3', label: 'Charly' },
                      ]}
                      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.label}
                      renderInput={props => <input {...props} className='form-control'/>}
                      renderItem={(item, highlighted) =>
                        <div
                          key={item.id}
                          style={{ backgroundColor: highlighted ? '#ddd' : 'transparent' }}
                        >
                          {item.label}
                        </div>
                      }
                      value={this.state.value}
                      onChange={e => this.setState({ value: e.target.value })}
                      onSelect={value => this.setState({ value })}
                    />
                  </div>
                  {/* <div className="form-inline mb-2">
                    <label for="absent" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Is Attend
                  </label>
                    <label>: &nbsp;</label>
                    <input type="checkbox" name="vehicle1" value="Bike" /> I have a bike<br />
                    <input type="checkbox" name="vehicle2" value="Car" /> I have a car<br />
                    <input type="checkbox" name="vehicle3" value="Boat" checked /> I have a boat<br />
                  </div> */}
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

