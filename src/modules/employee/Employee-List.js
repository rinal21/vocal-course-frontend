import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class employeeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: [],
      deleteConfirm: false,
      deleteId : '',
      resignConfirm: false,
      resignId: '',
      activeConfirm: false,
      activeId: ''
    }
    this.delete = this.delete.bind(this);
    this.resign = this.resign.bind(this);
    this.active = this.active.bind(this);
  }

  delete(id) {
    axios.delete('http://103.30.247.147:8000/api/employee/' + id)
      .then(console.log('Deleted'))
      .then(() => this.setState({deleteConfirm: !this.state.deleteConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  resign(id) {
    axios.patch('http://103.30.247.147:8000/api/user_resign/' + id)
      .then(res => console.log(res.data))
      .then(() => this.setState({ resignConfirm: !this.state.resignConfirm }))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  active(id) {
    axios.patch('http://103.30.247.147:8000/api/user_resign/' + id)
      .then(res => console.log(res.data))
      .then(() => this.setState({ activeConfirm: !this.state.activeConfirm }))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://103.30.247.147:8000/api/employees')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        employees: json.data
      })
    })
  }

  toggleDeleteConfirmation = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteId: id
    });
  }

  toggleResignConfirmation = (id) => {
    this.setState({
      resignConfirm: !this.state.resignConfirm,
      resignId: id
    });
  }
  
  toggleActiveConfirmation = (id) => {
    this.setState({
      activeConfirm: !this.state.activeConfirm,
      activeId: id
    });
  }

  data = (employees) => {
    const deleteConfirm = this.toggleDeleteConfirmation
    const resignConfirm = this.toggleResignConfirmation
    const activeConfirm = this.toggleActiveConfirmation

    return ({
      columns: [
        {
          label: 'Name',
          field: 'name',
          width: 150
        },
        // {
        //   label: 'Email',
        //   field: 'email',
        //   width: 150
        // },
        {
          label: 'No HP',
          field: 'noHp',
          width: 150
        },
        {
          label: 'Address',
          field: 'address',
          width: 150
        },
        {
          label: 'Gender',
          field: 'gender',
          width: 150
        },
        {
          label: 'Birthdate',
          field: 'birthdate',
          width: 150
        },
        {
          label: 'Status',
          field: 'status',
          width: 150
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'disable',
          width: 100
        }
      ],
      rows: (function () {
        let rowData = []

        employees.map((data, index) => {
          if(data.status == 0) {
            data.status = 'Inactive'
          }
          else if(data.status == 1) {
            data.status = 'Active'
          }
          else if(data.status == 2) {
            data.status = 'Graduated'
          }
          else if(data.status == 3) {
            data.status = 'Resigned'
          }

          rowData.push({
            name: data.name,
            // email: data.email,
            noHp: data.no_hp,
            address: data.address,
            gender: data.gender,
            birthdate: data.birthdate,
            status: data.status,
            action:
              <div>
                <NavLink
                  to={{
                    pathname: 'employee/edit',
                    state: {
                      employeeId: data.id
                    }
                  }}
                  className="btn btn-primary">Edit</NavLink>
                <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger" style={{ position: "relative", left: 25 }}>Delete</button>
                {data.status != 'Resigned' ? <button onClick={() => resignConfirm(data.user_id)} className="btn btn-warning" style={{ position: "relative", left: 50 }}>Resign</button> :
                  <button onClick={() => activeConfirm(data.user_id)} className="btn btn-success" style={{ position: "relative", left: 50 }}>Active</button>}

              </div>,
          })
        })

        return rowData
      }())
    })
  };
  render() {
    return (
      <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="content">
                <b><h4>Employee</h4></b>
                <div className="box-header">
                  <NavLink to="/employee/add" className="btn btn-success"><i className="fa fa-plus"></i> Add Employee</NavLink>
                </div>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={this.data(this.state.employees)}
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

                <MDBContainer>
                  <MDBModal isOpen={this.state.resignConfirm} toggle={this.toggleResignConfirmation} size="sm" centered>
                    <MDBModalHeader toggle={this.toggleResignConfirmation}>Resign</MDBModalHeader>
                    <MDBModalBody>
                      Are you sure this employee want to resign ?
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.toggleResignConfirmation}>No</MDBBtn>
                      <MDBBtn color="danger" onClick={() => this.resign(this.state.resignId)}>Yes</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>

                <MDBContainer>
                  <MDBModal isOpen={this.state.activeConfirm} toggle={this.toggleActiveConfirmation} size="sm" centered>
                    <MDBModalHeader toggle={this.toggleActiveConfirmation}>Active</MDBModalHeader>
                    <MDBModalBody>
                      Are you sure this employee want to active ?
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.toggleActiveConfirmation}>No</MDBBtn>
                      <MDBBtn color="success" onClick={() => this.active(this.state.activeId)}>Yes</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
    }
}

