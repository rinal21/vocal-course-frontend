import React, { Component } from 'react';
import { Formik } from 'formik';
import ReactAutocomplete from 'react-autocomplete'

import "react-datepicker/dist/react-datepicker.css";

export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      value1: '',
      value2: ''
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
                      Teacher Name
                  </label>
                    <label>: &nbsp;</label>
                    <ReactAutocomplete
                      items={[
                        { id: '1', label: 'Pak Andi' },
                        { id: '2', label: 'Pak Budi' },
                        { id: '3', label: 'Pak Charly' },
                      ]}
                      shouldItemRender={(item, value1) => item.label.toLowerCase().indexOf(value1.toLowerCase()) > -1}
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
                      value={this.state.value1}
                      onChange={e => this.setState({ value1: e.target.value })}
                      onSelect={value1 => this.setState({ value1 })}
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
                      shouldItemRender={(item, value2) => item.label.toLowerCase().indexOf(value2.toLowerCase()) > -1}
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
                      value={this.state.value2}
                      onChange={e => this.setState({ value2: e.target.value })}
                      onSelect={value2 => this.setState({ value2 })}
                    />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="level" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Level
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="level" />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="date" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Payment Date
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="date" />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="receipt" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Receipt Number
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="receipt" />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="cost" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Cost
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="cost" value="2.500.000" disabled />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="royalty" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Royalty
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="royalty" value="2.500.000" disabled />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="note" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Note
                    </label>
                    <label>: &nbsp;</label>
                    <textarea class="form-control mr-sm-2" id="note" />
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

