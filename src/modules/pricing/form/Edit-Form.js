import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

export default class pricingEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeParticipant = this.onChangeParticipant.bind(this);

    this.state = {
      startDate: new Date(),
      classes: [],
      datas: [],
      classId: '',
      price: '',
      meetup: '',
      duration: '',
      difficulty: '',
      teacher: '',
      participant: '',
      difficultySelected: '',
      teacherSelected: '',
      participantSelected: '',
      isLoaded: false,
      selectedClass: null,
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onChangeClass = (selectedClass) =>  {
    this.setState({ selectedClass });
    this.setState({ classId: selectedClass.value})
  }
  onChangeDifficulty(e) {
    this.setState({
      difficulty: e.target.value
    })  
  }
  onChangeTeacher(e) {
    this.setState({
      teacher: e.target.value
    })
  }
  onChangeParticipant(e) {
    this.setState({
      participant: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      classId: this.state.classId,
      price: this.state.price,
      meetup: this.state.meetup,
      duration: this.state.duration,
      difficulty: this.state.difficulty,
      teacher: this.state.teacher,
      participant: this.state.participant
    };
    axios.patch('http://localhost:8000/api/pricing/'+this.props.pricingId, obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }));
  }

  componentDidMount = () => {
    // ajax call
    this.fetchClasses()
    this.fetchData()
  }

  fetchData = () => {
    const { pricingId } = this.props
    fetch('http://localhost:8000/api/pricing/' + pricingId)
      .then(response => response.json())
      .then((json) => {
        json.map((data, index) => {
          this.setState({
            selectedClass: [{
              value: data.class_id,
              label: data.class_name
            }],
            classId: data.class_id,
            price: data.price,
            meetup: data.total_meetup,
            duration: data.duration,
            difficulty: data.type_by_difficulty,
            teacher: data.type_by_teacher,
            participant: data.type_by_participant,
          })
        })
        this.setState({
          datas: json
        })
        this.setState({
          isLoaded: true
        })
      })
  }

  fetchClasses = () => {
    fetch('http://localhost:8000/api/classes')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          classes: json.data
        })
      })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  data = (classes) => {
    return (
      function () {
        let rowData = []

        classes.map((data, index) => {
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })

        return rowData
      }()
    )
  };
  render() {
    const { teacher, difficulty, participant } = this.state

    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/pricing' />;
    }const PricingSchema = Yup.object().shape({
      price: Yup.number()
        .min(100000, 'Too Few!')
        .max(1000000, 'Too Much!')
        .required('Required'),
      meetup: Yup.number()
        .min(1, 'Too Few!')
        .max(10, 'Too Much!')
        .required('Required'),
      duration: Yup.number()
        .min(20, 'Too Short!')
        .max(1000, 'Too Long!')
        .required('Required'),

    });

    return (
      <div>
        {this.state.isLoaded && (
          <Formik
            initialValues={{
              classId: '',
              price: this.state.price,
              meetup: this.state.meetup,
              duration: this.state.duration,
              difficulty: '',
              teacher: '',
              participant: ''
            }}
            validationSchema={PricingSchema}
            onSubmit={values => {
              const obj = {
                classId: this.state.classId,
                price: values.price,
                meetup: values.meetup,
                duration: values.duration,
                difficulty: this.state.difficulty,
                teacher: this.state.teacher,
                participant: this.state.participant
              };
              axios.patch('http://localhost:8000/api/pricing/' + this.props.pricingId, obj)
                .then(res => console.log(res.data))
                .then(() => this.setState({ redirect: true }));

            }}
          >
            {({
              errors,
              touched,
              values,
            }) => (
                <div>
                  <Form>
                    <div className="form-inline mb-2">
                      <label for="class" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                        Class
                    </label>
                      <label>: &nbsp;</label>
                      <div style={{ display: 'inline-block', width: 223.2 }}>
                        <Select
                          value={this.state.selectedClass}
                          onChange={this.onChangeClass}
                          options={this.data(this.state.classes)}
                        />
                      </div>

                    </div>
                    <div className="form-inline mb-2">
                      <label for="price" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                        Price
                </label>
                      <label>: &nbsp;</label>
                      <Field type="text" class="form-control mr-sm-2 w-25" name="price" value={(/^\d+$/.test(values.price) || values.price == '') ? values.price : ''} />
                      {errors.price && touched.price ? (
                        <div style={{ color: 'red' }}>{errors.price}</div>
                      ) : null}
                    </div>
                    <div className="form-inline mb-2">
                      <label for="totalMeetup" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                        Total Meetup
                </label>
                      <label>: &nbsp;</label>
                      <Field type="text" class="form-control mr-sm-2 w-25" name="meetup" value={(/^\d+$/.test(values.meetup) || values.meetup == '') ? values.meetup : ''} />
                      {errors.meetup && touched.meetup ? (
                        <div style={{ color: 'red' }}>{errors.meetup}</div>
                      ) : null}
                    </div>
                    <div className="form-inline mb-2">
                      <label for="duration" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                        Duration
                </label>
                      <label>: &nbsp;</label>
                      <Field type="text" class="form-control mr-sm-2 w-25" name="duration" value={(/^\d+$/.test(values.duration) || values.duration == '') ? values.duration : ''} />
                      {errors.duration && touched.duration ? (
                        <div style={{ color: 'red' }}>{errors.duration}</div>
                      ) : null}
                    </div>
                    <div className="form-inline mb-2">
                      <label for="difficulty" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                        Type by difficulty
                    </label>
                      <label>: &nbsp;</label>
                      <select class="form-control" onChange={this.onChangeDifficulty} style={{ width: 192 }} value={difficulty}>
                        <option>Choose one..</option>
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
                      <select class="form-control" onChange={this.onChangeTeacher} style={{ width: 192 }} value={teacher}>
                        <option>Choose one..</option>
                        <option value="1">Regular teacher class</option>
                        <option value="2">Senior teacher class</option>
                      </select>
                    </div>
                    <div className="form-inline mb-2">
                      <label for="participant" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                        Type by participant
                    </label>
                      <label>: &nbsp;</label>
                      <select class="form-control" onChange={this.onChangeParticipant} style={{ width: 192 }} value={participant}>
                        <option>Choose one..</option>
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
                  </Form>
                </div>
              )}
          </Formik>
        )}
      </div>
    )
  }
}