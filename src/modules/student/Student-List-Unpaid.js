import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

export default class studentListUnpaid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      filterDate: new Date(),
      branches: [],
      branchId: '',
      selectedBranch: null,
      classes: [],
      classId: '',
      selectedClass: null,
      paymentStudentData: [],
      paymentConfirm: false,
      paymentId: '',
      detailStudent: false,
      detailStudentInfo: {},
      deleteConfirm: false,
      grouping: 'no',
      redirect: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
    this.onChangeFilterDate = this.onChangeFilterDate.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeGroupingOption = this.onChangeGroupingOption.bind(this);
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
    this.fetchClasses()
    this.fetchBranches()
  }

  onChangeGroupingOption(e) {
    this.setState({
      grouping: e.target.value
    });

    fetch('http://103.30.247.147:8000/api/students/groupingClass?grouping=' + e.target.value + '&status=2')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  onChangeBranch = (selectedBranch) =>  {
    this.setState({ selectedBranch });
    this.setState({ 
      branchId: selectedBranch.value
    })
    this.fetchStudentsByBranch(selectedBranch.value)
  }

  onChangeClass = (selectedClass) =>  {
    this.setState({ selectedClass });
    this.setState({ 
      classId: selectedClass.value
    })
    this.fetchStudentsByClass(selectedClass.value)
  }

  fetchStudentsByClass = (id) => {
    fetch('http://103.30.247.147:8000/api/students/filterClass?status=2&classId=' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchClasses = () => {
    fetch('http://103.30.247.147:8000/api/classes')
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

  fetchStudentsByBranch = (id) => {
    fetch('http://103.30.247.147:8000/api/students/filterBranch?status=2&branchId=' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchBranches = () => {
    fetch('http://103.30.247.147:8000/api/branches')
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

  delete(id) {
    axios.delete('http://103.30.247.147:8000/api/student/' + id)
      .then(console.log('Deleted'))
      .then(() => this.setState({deleteConfirm: !this.state.deleteConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  togglePaymentConfirmation = (id, first_name, middle_name, last_name, teacher_id, teacher_name) => {
    this.setState({
      paymentConfirm: !this.state.paymentConfirm,
      paymentId: id,
      paymentStudentData: {id, first_name, middle_name, last_name, teacher_id, teacher_name}
    });
  }

  toggleDeleteConfirmation = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteId: id
    });
  }

  toggleDetailStudent = (id) => {
    if (id) {
      fetch('http://103.30.247.147:8000/api/student/' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          detailStudentInfo: json,
          detailStudent: !this.state.detailStudent
        })
      })
    }
    else {
      this.setState({
        detailStudent: false
      })
    }
  }

  UpdateStatusPayment = (id) => {
    const obj = {
      status: '3',
    };
    console.log(obj)
    axios.patch('http://103.30.247.147:8000/api/student_status/' + id, obj)
      .then(res => console.log(res.data))
      .then(() => this.setState({ redirect: true }));
  }

  showDetailStudent = () => {
    const { detailStudentInfo } = this.state
    let data = detailStudentInfo[0]

    if (data) {
      return (
        <>
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
        </>
      )
    }
  }

  createYearPicker = (index) => {
    const { grouping } = this.state
    let opt = []

    for (let i = 2019; i <= 2025; i++) {
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
    fetch('http://103.30.247.147:8000/api/students/filterYear?status=2&date=' + filterDate)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchData = () => {
    fetch('http://103.30.247.147:8000/api/students?status=2')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  data = (students) => {
    const deleteConfirm = this.toggleDeleteConfirmation
    const paymentConfirm = this.togglePaymentConfirmation
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
          width: 500
        },
        {
          label: 'Sex',
          field: 'sex',
          width: 10
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
          width: 10
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

                {/* <NavLink
                  to={{
                    pathname: 'transaction/add',
                    state: {
                      studentId: data.id,
                      studentName: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
                      teacherId: data.teacher_id,
                      teacherName: data.teacher_name,
                      status: 3
                    }
                  }}
                  className="btn btn-primary" style={{ position: "relative", left: 5 }}>Pay</NavLink> */}
                <button onClick={() => paymentConfirm(data.id, data.first_name, data.middle_name, data.last_name, data.teacher_id, data.teacher_name)} className="btn btn-primary" style={{ position: "relative", left: 5 }}>Pay</button>
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
                        <h4>Students - Unpaid</h4>
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
            </section>
          ) && i++
      })
    }
    else {
      table.push(
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="content">
                      <h4>Students - Unpaid</h4>
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



    // students.forEach((student) => {
    //   if (Array.isArray(student)) {
    //     table.push(
    //       <section className="content-header">
    //         <div className="row">
    //           <div className="col-md-12">
    //             <div className="box">
    //               <div className="content">
    //               {i < 1 && (
    //                   <>
    //                     <h4>Students - Unpaid</h4>
    //                   </>
    //                 )}
    //                 <h5>Class : {student[0].class_name ? student[0].class_name : 'None'}</h5>
    //                 {i < 1 && (
    //                   <>
    //                     <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
    //                     <div class="float-right">
    //                       {this.createYearPicker()}
    //                     </div>
    //                   </>
    //                 )}
    //                 <MDBDataTable
    //                   striped
    //                   bordered
    //                   hover
    //                   data={this.data(student)}
    //                   btn
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </section>
    //     )
    //     i++
    //   }
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
    // });
    return(
      table
    )
  }

  render() {
    const { students, redirect, paymentStudentData } = this.state
    
    if (redirect) {
      return <Redirect to='/student-paid' />;
    }
    return (
      <>
      {students && this.tableStudentsGroup(students)}

        {/* <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="content">
                  <h4>Students - Unpaid</h4> */}
                  {/* <h5>Class : {student[0].class_name ? student[0].class_name : 'None'}</h5> */}
                  {/* <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
                    </div>
                    <div style={{ position: 'absolute', width: 223.2, top: 83, left: 278, zIndex: 1 }}>
                      <label style={{ marginBottom: 0 }}>Class</label>
                      <Select
                        value={this.state.selectedClass}
                        onChange={this.onChangeClass}
                        options={this.dataClasses(this.state.classes)}
                      />
                    </div>

                  </div>
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
          <MDBModal isOpen={this.state.detailStudent} toggle={this.toggleDetailStudent} size="md" centered>
            <MDBModalHeader toggle={this.toggleDetailStudent}>Detail Student</MDBModalHeader>
              <MDBModalBody>
                {this.state.detailStudent && this.showDetailStudent()}
              </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggleDetailStudent}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>

        <MDBContainer>
          <MDBModal isOpen={this.state.paymentConfirm} toggle={this.paymentConfirm} size="md" centered>
            <MDBModalHeader toggle={this.togglePaymentConfirmation}>Payment Confirmation</MDBModalHeader>
              <MDBModalBody>
                Already paid ?
              </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="success" onClick={() => this.UpdateStatusPayment(this.state.paymentId)}>Yes</MDBBtn>
              <NavLink
                  to={{
                    pathname: 'transaction/add',
                    state: {
                      studentId: paymentStudentData.id,
                      studentName: paymentStudentData.first_name + ' ' + paymentStudentData.middle_name + ' ' + paymentStudentData.last_name,
                      teacherId: paymentStudentData.teacher_id,
                      teacherName: paymentStudentData.teacher_name,
                      status: 3
                    }
                  }}
                  className="btn btn-danger" >No</NavLink>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      
      {/* <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="content">
                <div class="box-header">
                  <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
                </div>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={this.data(this.state.students)}
                  btn
                />
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
              </div>
            </div>
          </div>
        </div>
      </section> */}
      </>
    )
  }
}

