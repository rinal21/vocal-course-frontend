import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import ReactToPrint from "react-to-print";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";
import { array } from "prop-types";

export default class studentListPaid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      filterDate: new Date(),
      studentId: '',
      classes: [],
      classId: '',
      selectedClass: null,
      branches: [],
      branchId: '',
      selectedBranch: null,
      detailStudent: false,
      detailStudentInfo: [],
      deleteConfirm: false,
      grouping: 'no',
      layoutPrint: '',
      transactions: [],
      deleteId : '',
      balance: 0,
      editBalance: false
    }
    this.delete = this.delete.bind(this);
    this.onChangeFilterDate = this.onChangeFilterDate.bind(this);
    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeBalance = this.onChangeBalance.bind(this);
    this.onChangeGroupingOption = this.onChangeGroupingOption.bind(this);
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
    this.fetchClasses()
    this.fetchBranches()
  }

  onChangeBalance(e) {
    this.setState({
      balance: e.target.value
    });
  }

  onChangeGroupingOption(e) {
    this.setState({
      grouping: e.target.value
    });

    fetch('localhost:8000/api/students/groupingClass?grouping=' + e.target.value + '&status=3')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  onChangeClass = (selectedClass) =>  {
    this.setState({ selectedClass });
    this.setState({ 
      classId: selectedClass.value
    })
    this.fetchStudentsByClass(selectedClass.value)
  }

  onChangeBranch = (selectedBranch) =>  {
    this.setState({ selectedBranch });
    this.setState({ 
      branchId: selectedBranch.value
    })
    this.fetchStudentsByBranch(selectedBranch.value)
  }

  fetchStudentsByClass = (id) => {
    fetch('localhost:8000/api/students/filterClass?status=3&classId=' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchStudentsByBranch = (id) => {
    fetch('localhost:8000/api/students/filterBranch?status=3&branchId=' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchBranches = () => {
    fetch('localhost:8000/api/branches')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          branches: json.data
        })
      })
  }

  dataBranches = (branches) => {
    return (
      function () {
        let rowData = []

        branches.map((data, index) => {
          if (index == 0) {
            rowData.push({
              value: 0,
              label: 'All',
            })
          }
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })
        return rowData
      }()
    )
  };

  fetchClasses = () => {
    fetch('localhost:8000/api/classes')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          classes: json.data
        })
      })
  }

  dataClasses = (classes) => {
    return (
      function () {
        let rowData = []

        classes.map((data, index) => {
          if (index == 0) {
            rowData.push({
              value: 0,
              label: 'All',
            })
          }
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })
        return rowData
      }()
    )
  };

  delete(id) {
    axios.delete('localhost:8000/api/student/' + id)
      .then(console.log('Deleted'))
      .then(() => this.setState({deleteConfirm: !this.state.deleteConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  toggleDeleteConfirmation = (id) => {
    if (id) {
      this.setState({
        deleteConfirm: !this.state.deleteConfirm,
        deleteId: id
      });
    }
    else {
      this.setState({
        deleteConfirm: false
      });
    }
  }

  toggleDetailStudent = (id) => {
    if (id) {
      fetch('localhost:8000/api/student/' + id)
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        this.setState({
          detailStudentInfo: json,
          balance: json[0] && json[0].balance,
          detailStudent: !this.state.detailStudent
        })
      })

      fetch('localhost:8000/api/student_transaction/' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          transactions: json
        })
      })
    }
    else {
      this.setState({
        detailStudent: false
      })
    }
  }

  _handleKeyDownBalance = (e, id) => {
    if (e.key === 'Enter') {
      const obj = {
        balance: e.target.value,
      };
      console.log(obj)
      axios.patch('localhost:8000/api/user_balance/'+id, obj)
          .then(res => console.log(res.data))
          .then(() => this.setState({ redirect: true }));
      this.setState({
        editBalance: false
      })
    }
  }

  showDetailStudent = () => {
    const { detailStudentInfo, balance, editBalance } = this.state
    let data = detailStudentInfo[0]

    if (data) {
      return (
        <>
          <div class="row">
            <div class="col-sm">
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Name
            </label>
                <label>: &nbsp;</label>
                <label>{data.first_name + ' ' + data.middle_name + ' ' + data.last_name}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Birth Date
            </label>
                <label>: &nbsp;</label>
                <label>{data.birth_date}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Age
            </label>
                <label>: &nbsp;</label>
                <label>{data.age}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Sex
            </label>
                <label>: &nbsp;</label>
                <label>{data.sex}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Address
            </label>
                <label>: &nbsp;</label>
                <label>{data.street_address}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Cellphone No
            </label>
                <label>: &nbsp;</label>
                <label>{data.cell_phone}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Homephone No
            </label>
                <label>: &nbsp;</label>
                <label>{data.home_phone_no}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Email
            </label>
                <label>: &nbsp;</label>
                <label>{data.email}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  School
            </label>
                <label>: &nbsp;</label>
                <label>{data.school}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Person Responsible for Bill
            </label>
                <label>: &nbsp;</label>
                <label>{data.person_responsible_for_bill}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Class
            </label>
                <label>: &nbsp;</label>
                <label>{data.class_name}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Teacher's Name
            </label>
                <label>: &nbsp;</label>
                <label>{data.teacher_name}</label>
              </div>
              <div className="form-inline mb-2">
                <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                  Registration Date
            </label>
                <label>: &nbsp;</label>
                <label>{data.date}</label>
              </div>
            </div>
            <div class="col-sm" style={{marginRight: 25}}>
              {editBalance ? (<p class="float-right">Balance : <input type="number" name="balance" step="0" style={{width: 50}} onChange={this.onChangeBalance} value={balance} onKeyDown={(e) => this._handleKeyDownBalance(e, data.user_id)}/></p>) :
              (<p class="float-right">Balance : {balance} <i className="fa fa-pencil" onClick={() => this.setState({editBalance: true})}/></p>)}
            </div>
          </div>
          
        </>
      )
    }
  }

  createYearPicker = (index) => {
    const { grouping } = this.state
    let opt = []

    for (var i = 2019; i <= 2025; i++) {
      opt.push(<option value={i}>{i}</option>)
    }

    return (
      <select class="form-control" style={{ width: 105, position:'absolute', top: grouping == 'yes' ? index < 1 ? 140 : 104 : 107, right: grouping == 'yes' ? 225 : 285, zIndex: 1 }} id="year-picker" onChange={this.onChangeFilterDate}>
        {opt}
      </select>
    )
  }

  onChangeFilterDate(e) {
    this.setState({
      filterDate: e.target.value
    });

    this.filterData(e.target.value)
  }

  filterData = (filterDate) => {
    fetch('localhost:8000/api/students/filterYear?status=3&date=' + filterDate)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchData = () => {
    fetch('localhost:8000/api/students?status=3')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  dataTransaction = (transactions) => {
    return ({
      columns: [
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Receipt Number',
          field: 'receipt',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Status',
          field: 'status',
          width: 10
        },
        {
          label: 'Cost',
          field: 'cost',
          width: 10
        },
        {
          label: 'Transaction Type',
          field: 'transaction',
          width: 10
        }
        // {
        //   label: 'School',
        //   field: 'school',
        //   width: 10
        // },
        // {
        //   label: 'Email',
        //   field: 'email',
        //   width: 10
        // },
        // {
        //   label: 'Action',
        //   field: 'action',
        //   sort: 'disabled',
        //   width: 1000
        // }
      ],
      rows: (function () {
        let rowData = []
        transactions.map((data, index) => {
          rowData.push({
            date: data.payment_date,
            receipt: data.receipt_number,
            status: data.status,
            cost: data.cost,
            transaction: data.transaction_type
          })
        })
        return rowData
      }())
    })
  }

  tableHistoryTransactions = () => {
    const { transactions } = this.state

    if (transactions.length > 0) {
      return (
        <MDBDataTable
          striped
          bordered
          hover
          data={this.dataTransaction(transactions)}
          btn
        />
      )
    }
  }

  data = (students) => {
    const deleteConfirm = this.toggleDeleteConfirmation
    const detailStudent = this.toggleDetailStudent

    return ({
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Age',
          field: 'age',
          sort: 'desc',
          width: 100
        },
        {
          label: 'Sex',
          field: 'sex',
          width: 100
        },
        {
          label: 'Address',
          field: 'address',
          width: 10
        },
        // {
        //   label: 'Cell Phone',
        //   field: 'cellPhone',
        //   width: 10
        // },
        {
          label: 'Class',
          field: 'class',
          width: 10
        },
        {
          label: 'School',
          field: 'school',
          width: 10
        },
        {
          label: 'Email',
          field: 'email',
          width: 10
        },
        {
          label: 'Branch',
          field: 'branch',
          width: 10
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'disabled',
          width: 1000
        }
      ],
      rows: (function () {
        let rowData = []

        Array.isArray(students) && students.map((data, index) => {
          rowData.push({
            name: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            age: data.age,
            sex: data.sex,
            address: data.street_address,
            // cellPhone: data.cell_phone,
            class: data.class_name,
            school: data.school,
            email: data.email,
            branch: data.branch_name,
            action: 
              <div>
                <button onClick={() => detailStudent(data.id)} className="btn btn-default" >Detail</button>
                <NavLink
                  to={{
                    pathname: 'student/edit',
                    state: {
                      studentId: data.id,
                      status: 4
                    }
                  }}
                  className="btn btn-primary" style={{ position: "relative", left: 5 }}>Edit</NavLink>
                <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger" style={{ position: "relative", left: 10 }}>Delete</button>
              </div>
          })
        })
        return rowData
      }())
    })
  };

  tableStudentsGroup = (students) => {
    const { grouping } = this.state
    let table = []
    let i = 0

    if(this.state.grouping == 'yes') {
      students.forEach((student, index) => {
        Array.isArray(student) &&
          table.push(
            <section className="content-header">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="content">
                      {i < 1 && (
                        <h4>Students - Paid</h4>
                      )}
                      <h5>Class : {student[0].class_name ? student[0].class_name : 'None'}</h5>
                          <div class="row">
                            <div class="col-sm-12 col-md-6">
                              <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
                            </div>
                          {/* <div style={{ position: 'absolute', width: 223.2, top: i < 1 ? 116 : 80, left: 278, zIndex: 1 }}>
                        <label style={{marginBottom: 0}}>Class</label>
                            <Select
                              value={this.state.selectedClass}
                              onChange={this.onChangeClass}
                              options={this.dataClasses(this.state.classes)}
                            />
                          </div> */}
    
                      </div>
                      <select class="form-control" style={{ width: 105, position: 'absolute', top: i < 1 ? 140 : 104, right: 340, zIndex: 1 }} id="group-option" onChange={this.onChangeGroupingOption} value={this.state.grouping}>
                        <option value='no' >All</option>
                        <option value='yes' >By Class</option>
                      </select>
                      {this.createYearPicker(i)}
                      <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.data(student)}
                        btn
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>) && i++
      })
    }
    else {
      table.push(
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="content">
                      <h4>Students - Paid</h4>
                      <div class="row">
                        <div class="col-sm-12 col-md-6">
                          <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
                        </div>
                      <div style={{ position: 'absolute', width: 223.2, top: 83, left: 460, zIndex: 1 }}>
                    <label style={{marginBottom: 0}}>Class</label>
                        <Select
                          value={this.state.selectedClass}
                          onChange={this.onChangeClass}
                          options={this.dataClasses(this.state.classes)}
                        />
                      </div>

                      <div style={{ position: 'absolute', width: 223.2, top: 83, left: 200, zIndex: 1 }}>
                    <label style={{marginBottom: 0}}>Branch</label>
                        <Select
                          value={this.state.selectedBranch}
                          onChange={this.onChangeBranch}
                          options={this.dataClasses(this.state.branches)}
                        />
                      </div>

                  </div>
                  <select class="form-control" style={{ width: 105, position: 'absolute', top: 107, right: 430, zIndex: 1 }} id="group-option" onChange={this.onChangeGroupingOption} value={this.state.grouping}>
                      <option value='no' >All</option>
                      <option value='yes' >By Class</option>
                  </select>
                  {this.createYearPicker()}
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    data={this.data(students)}
                    btn
                  />
                </div>
              </div>
            </div>
          </div>
        </section>)
    }

      

    
        
          // <section className="content-header">
          //   <div className="row">
          //     <div className="col-md-12">
          //       <div className="box">
          //         <div className="content">
          //           <h4>Students - Paid</h4>
          //           {/* <h5>Class : {student[0].class_name ? student[0].class_name : 'None'}</h5> */}
          //           <div class="row">
          //             <div class="col-sm-12 col-md-6">
          //               <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
          //             </div>
          //             <div class="col-sm-12 col-md-6">
          //               <div style={{ display: 'inline-block', width: 223.2 }}>
          //                 <Select
          //                   value={this.state.selectedClass}
          //                   onChange={this.onChangeClass}
          //                   options={this.dataClasses(this.state.classes)}
          //                 />
          //               </div>

          //             </div>
          //           </div>
          //           {this.createYearPicker()}
          //           <MDBDataTable
          //             responsive
          //             striped
          //             bordered
          //             hover
          //             data={this.data(students)}
          //             btn
          //           />
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </section>
      
      // : table.push(
      //   <section className="content-header">
      //       <div className="row">
      //         <div className="col-md-12">
      //           <div className="box">
      //             <div className="content">
      //               {index < 1 && (
      //                 <>
      //                   <NavLink to="/student/add" class="btn btn-success" style={{marginBottom: 10}}><i class="fa fa-plus"></i> Add Student</NavLink>
      //                   <div class="float-right">
      //                     {this.createYearPicker()}
      //                   </div>
      //                 </>
      //               )}
      //               <h5>Class : {student}</h5>
      //               <MDBDataTable
      //                 striped
      //                 bordered
      //                 hover
      //                 data={this.data(student)}
      //                 btn
      //               />
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </section>
      // )
    return(
      table
    )
  }

  render() {
    const { students } = this.state
    // console.log('coba', students)
    return (
      <>
      {students && this.tableStudentsGroup(students)}

      {/* <section className="content-header">
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="content">
                        <h4>Students - Paid</h4> */}
                    {/* <h5>Class : {student[0].class_name ? student[0].class_name : 'None'}</h5> */}
                        {/* <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
                          </div>
                        <div style={{ position: 'absolute', width: 223.2, top: 83, left: 278, zIndex: 1 }}>
                      <label style={{marginBottom: 0}}>Class</label>
                          <Select
                            value={this.state.selectedClass}
                            onChange={this.onChangeClass}
                            options={this.dataClasses(this.state.classes)}
                          />
                        </div>

                    </div> */}
                    {/* {this.createYearPicker()} */}
                    {/* <MDBDataTable
                      striped
                      bordered
                      hover
                      data={this.data(students)}
                      btn
                    />
                  </div>
                </div>
              </div>
            </div>
          </section> */}

        <MDBContainer>
          <MDBModal isOpen={this.state.deleteConfirm} toggle={this.toggleDeleteConfirmation} size="sm" centered>
            <MDBModalHeader toggle={this.toggleDeleteConfirmation}>Delete</MDBModalHeader>
              <MDBModalBody>
                Are you sure you want to delete it ?
              </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggleDeleteConfirmation}>Cancel</MDBBtn>
              <MDBBtn color="danger" onClick={() => this.delete(this.state.deleteId)}>Delete</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>

        <MDBContainer>
          <MDBModal isOpen={this.state.detailStudent} toggle={this.toggleDetailStudent} size="lg" centered>
            <MDBModalHeader toggle={this.toggleDetailStudent}>Detail Student</MDBModalHeader>
              <MDBModalBody>
                {this.state.detailStudent && this.showDetailStudent()}
                {this.tableHistoryTransactions()}
              </MDBModalBody>
            <MDBModalFooter>
            <ReactToPrint
                trigger={() => <button className="btn btn-default"><i className="fa fa-print" />Print</button>}
                content={() => this.state.layoutPrint}
              />
              <MDBBtn color="secondary" onClick={this.toggleDetailStudent}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>

        <div className="d-none">
        {this.state.detailStudent && <ComponentToPrint
            ref={el => (this.state.layoutPrint = el)} 
            dataStudent={this.state.detailStudentInfo}/>}
        </div>
      </>
    )
  }
}

class ComponentToPrint extends React.Component {
  render() {
    const { dataStudent } = this.props
    let data = dataStudent[0]
      return (
        <>
        <div className="content-wrapper" style={{backgroundColor: 'white'}}>
        <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Name
              </label>
            <label>: &nbsp;</label>
            <label>{data.first_name + ' ' + data.middle_name + ' ' + data.last_name}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Birth Date
              </label>
            <label>: &nbsp;</label>
            <label>{data.birth_date}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Age
              </label>
            <label>: &nbsp;</label>
            <label>{data.age}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Sex
              </label>
            <label>: &nbsp;</label>
            <label>{data.sex}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Address
              </label>
            <label>: &nbsp;</label>
            <label>{data.street_address}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Cellphone No
              </label>
            <label>: &nbsp;</label>
            <label>{data.cell_phone}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Homephone No
              </label>
            <label>: &nbsp;</label>
            <label>{data.home_phone_no}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Email
              </label>
            <label>: &nbsp;</label>
            <label>{data.email}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              School
              </label>
            <label>: &nbsp;</label>
            <label>{data.school}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Person Responsible for Bill
              </label>
            <label>: &nbsp;</label>
            <label>{data.person_responsible_for_bill}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Class
              </label>
            <label>: &nbsp;</label>
            <label>{data.class_name}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Teacher's Name
              </label>
            <label>: &nbsp;</label>
            <label>{data.teacher_name}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Registration Date
              </label>
            <label>: &nbsp;</label>
            <label>{data.date}</label>
          </div>
        </div>
        </>
      );
  }
}