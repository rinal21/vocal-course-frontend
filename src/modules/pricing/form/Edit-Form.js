import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

export default class pricingEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeMeetup = this.onChangeMeetup.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeParticipant = this.onChangeParticipant.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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
      selectedClass: null,
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onChangeClass = (selectedClass) =>  {
    this.setState({ selectedClass });
    this.setState({ classId: selectedClass.value})
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })  
  }
  onChangeMeetup(e) {
    this.setState({
      meetup: e.target.value
    })
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
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
    console.log(this.state.datas)

    const { teacher, difficulty, participant } = this.state

    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/pricing' />;
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
                    <input type="text" class="form-control mr-sm-2" id="price" 
                    value={this.state.price}
                    onChange={this.onChangePrice}/>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="totalMeetup" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Total Meetup
                </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="totalMeetup" 
                    value={this.state.meetup}
                    onChange={this.onChangeMeetup}/>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="duration" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Duration
                </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="duration" 
                    value={this.state.duration}
                    onChange={this.onChangeDuration}/>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="difficulty" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Type by difficulty
                    </label>
                    <label>: &nbsp;</label>
                    <select class="form-control" onChange={this.onChangeDifficulty} value={difficulty}>
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
                    <select class="form-control" onChange={this.onChangeTeacher} value={teacher}>
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
                    <select class="form-control" onChange={this.onChangeParticipant} value={participant}>
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
                </form>
              </div>
            )}
        </Formik>
      </div>
    )
  }
}

