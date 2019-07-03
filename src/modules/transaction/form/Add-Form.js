import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import moment from "moment";
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class transactionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDate: new Date(),
      teachers: [],
      teacherId: '',
      selectedTeacher: '',
      students: [],
      studentId: '',
      selectedStudent: '',
      transactionsType: [],
      transactionTypeId: '',
      selectedTransactionType: '',
      pricings: [],
      pricingId: '',
      selectedPricing: '',
      cost: '',
      royalty: '',
      receiptNumber: '',
      note: '',
      selectedPaymentMethod: '0',
      level: ''
    };
    this.onChangeTransactionType = this.onChangeTransactionType.bind(this);
    this.onChangePaymentDate = this.onChangePaymentDate.bind(this);
    this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
    this.onChangeStudents = this.onChangeStudents.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeReceiptNumber = this.onChangeReceiptNumber.bind(this);
    this.onChangePricing = this.onChangePricing.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangePaymentDate(date) {
    this.setState({
      paymentDate: date
    });
  }

  onChangePaymentMethod = changeEvent => {
    this.setState({selectedPaymentMethod: changeEvent.target.value})  
  }

  onChangeStudents = (selectedStudent) =>  {
    this.setState({ selectedStudent });
    this.setState({ studentId: selectedStudent.value})

    fetch('http://localhost:8000/api/student/' + selectedStudent.value)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          selectedTeacher : {
            value: json[0].teacher_id,
            label: json[0].teacher_name
          },
          teacherId: json[0].teacher_id
        })
      })
  }
  onChangeTransactionType = (selectedTransactionType) =>  {
    this.setState({ selectedTransactionType });
    this.setState({ transactionTypeId: selectedTransactionType.value})
  }
  onChangeTeacher = (selectedTeacher) =>  {
    this.setState({ selectedTeacher });
    this.setState({ teacherId: selectedTeacher.value})
  }
  onChangePricing = (selectedPricing) =>  {
    this.setState({ selectedPricing });
    this.setState({ pricingId: selectedPricing.value})

    this.fetchPrice(selectedPricing.value)
  }
  onChangeReceiptNumber(e) {
    this.setState({receiptNumber: e.target.value})  
  }
  onChangeNote(e) {
    this.setState({note: e.target.value})  
  }

  componentDidMount = () => {
    // ajax call
    this.fetchTeachers()
    this.fetchStudents()
    this.fetchPricings()
    this.fetchTransactionsType()
    this.props.studentId && this.fetchDatas()
  }

  fetchDatas = () => {
    const { studentId, studentName, teacherId, teacherName } = this.props

    this.setState({
      selectedTeacher: {
        value: teacherId,
        label: teacherName
      },
      teacherId: teacherId,
      selectedStudent: {
        value: studentId,
        label: studentName
      },
      studentId: studentId
    })
  }

  fetchTeachers = () => {
    fetch('http://localhost:8000/api/teachers')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          teachers: json.data
        })
      })
  }
  
  fetchStudents = () => {
    fetch('http://localhost:8000/api/students?status=3')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchTransactionsType = () => {
    fetch('http://localhost:8000/api/transactions_type')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          transactionsType: json.data
        })
      })
  }

  fetchPricings = () => {
    fetch('http://localhost:8000/api/pricings/list')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          pricings: json
        })
      })
  }

  fetchPrice = (id) => {
    fetch('http://localhost:8000/api/pricing/price/' + id)
      .then(response => response.json())
      .then((json) => {
        json.map((data) => {
          this.setState({
            cost: data.price,
            royalty: data.price*0.1
          })
        })
      })
  }

  dataStudents = (students) => {
    return (
      function () {
        let rowData = []
        students.map((student) => {
          Array.isArray(student) && student.map((data) => {
            rowData.push({
              value: data.id,
              label: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            })
          })
        })
        return rowData
      }()
    )
  }

  dataTeachers = (teachers) => {
    return (
      function () {
        let rowData = []
        teachers.map((data) => {
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })
        return rowData
      }()
    )
  }

  dataTransactionsType = (transactionsType) => {
    return (
      function () {
        let rowData = []
        transactionsType.map((data) => {
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })
        return rowData
      }()
    )
  }

  dataPricings = (pricings) => {
    return (
      function () {
        let rowData = []
        pricings.map((data) => {
          if(data.type_by_difficulty == 1){
            data.type_by_difficulty = 'Basic'
          }else if(data.type_by_difficulty == 2){
            data.type_by_difficulty = 'Intermediate'
          }else if(data.type_by_participant == 3){
            data.type_by_difficulty = 'Pre adv & adv'
          }

          if(data.type_by_teacher == 1){
            data.type_by_teacher = 'Regular teacher class'
          }else if(data.type_by_participant == 2){
            data.type_by_teacher = 'Senior teacher class'
          }

          if(data.type_by_participant == 1){
            data.type_by_participant = 'Private'
          }else if(data.type_by_participant == 2){
            data.type_by_participant = 'Semi Private'
          }else if(data.type_by_participant == 3){
            data.type_by_participant = 'Group'
          }
          rowData.push({
            value: data.id,
            label: data.name + ' - ' + data.type_by_difficulty + ' - ' + data.type_by_participant,
          })
        })
        return rowData
      }()
    )
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      teacher: this.state.teacherId,
      student: this.state.studentId,
      payment_date: moment(this.state.paymentDate).format("YYYY-MM-DD hh:mm:ss"),
      receipt_number: this.state.receiptNumber,
      cost: this.state.cost,
      pricing: this.state.pricingId,
      transaction_type: this.state.transactionTypeId,
      royalty: this.state.royalty,
      note: this.state.note,
      status: this.state.selectedPaymentMethod,  
    };
    console.log(obj)
    axios.post('http://localhost:8000/api/transaction', obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }));
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/transaction' />;
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
                      Student Name
                  </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 223.2 }}>
                      <Select
                        value={this.state.selectedStudent}
                        onChange={this.onChangeStudents}
                        options={this.dataStudents(this.state.students)}
                      />
                    </div>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Teacher Name
                  </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 223.2 }}>
                      <Select
                        value={this.state.selectedTeacher}
                        onChange={this.onChangeTeacher}
                        options={this.dataTeachers(this.state.teachers)}
                      />
                    </div>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Class
                  </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 290 }}>
                      <Select
                        value={this.state.selectedPricing}
                        onChange={this.onChangePricing}
                        options={this.dataPricings(this.state.pricings)}
                      />
                    </div>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Transaction Type
                  </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 290 }}>
                      <Select
                        value={this.state.selectedTransactionType}
                        onChange={this.onChangeTransactionType}
                        options={this.dataTransactionsType(this.state.transactionsType)}
                      />
                    </div>
                  </div>
                  
                  {/* <div className="form-inline mb-2">
                    <label for="level" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Level
                    </label>
                    <label>: &nbsp;</label>
                    <select class="form-control" onChange={this.onChangeLevel} style={{width: 223.2}}>
                      <option value="">Choose One ..</option>
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
                  </div> */}
                  <div className="form-inline mb-2">
                    <label for="date" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Payment Date
                    </label>
                    <label>: &nbsp;</label>
                    <DatePicker
                        selected={this.state.paymentDate}
                        onChange={this.onChangePaymentDate}
                        dateFormat="d-MM-yyyy"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="form-control"
                      />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="receipt" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Receipt Number
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="receipt" 
                    value={this.state.receiptNumber}
                    onChange={this.onChangeReceiptNumber}/>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="cost" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Cost
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="cost" value={this.state.cost} disabled />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="royalty" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Royalty
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="royalty" value={this.state.royalty} disabled />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="note" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Note
                    </label>
                    <label>: &nbsp;</label>
                    <textarea class="form-control mr-sm-2" id="note" 
                    value={this.state.note}
                    onChange={this.onChangeNote}/>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Payment Method
                  </label>
                    <label>: &nbsp;</label>
                    <label class="radio-inline mr-2">
                      <input type="radio" name="optPayment" value="0"
                        checked={this.state.selectedPaymentMethod === "0"}
                        onChange={this.onChangePaymentMethod} />Pending
                          </label>
                    <label style={{ marginRight: 10 }}>/</label>
                    <label class="radio-inline"><input type="radio" name="optPayment" value="1"
                      checked={this.state.selectedPaymentMethod === "1"}
                      onChange={this.onChangePaymentMethod} />Cash
                          </label>
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

