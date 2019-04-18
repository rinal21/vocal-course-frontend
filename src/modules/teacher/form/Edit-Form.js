import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class teacherEdit extends Component {
  constructor(props) {
    super(props);
    const { name, salary } = props;
    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: name,
      salary: salary,
      redirect: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      salary: this.state.salary
    };
    axios.patch('http://localhost:8000/api/teacher/'+this.props.teacherId, obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }));
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/teacher' />;
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
                <form onSubmit={this.onSubmit}>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Name
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="name" 
                    value={this.state.name}
                    onChange={this.onChangeName}/>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="salary" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Salary
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="salary"
                    value={this.state.salary}
                    onChange={this.onChangeSalary} />
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

