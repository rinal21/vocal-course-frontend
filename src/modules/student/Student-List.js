import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class studentList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/student/' + id)
      .then(console.log('Deleted'))
      .then(() => this.setState({deleteConfirm: !this.state.deleteConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  toggleDeleteConfirmation = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteId: id
    });
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://localhost:8000/api/students')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json.data
        })
      })
  }

  data = (students) => {
    const deleteConfirm = this.toggleDeleteConfirmation

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
        {
          label: 'Cell Phone',
          field: 'cellPhone',
          width: 10
        },
        {
          label: 'Home Phone',
          field: 'homePhone',
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
          label: 'Edit',
          field: 'edit',
          width: 10
        },
        {
          label: 'Delete',
          field: 'delete',
          width: 10
        }
      ],
      rows: (function () {
        let rowData = []

        students.map((data, index) => {
          rowData.push({
            name: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            age: data.age,
            sex: data.sex,
            address: data.street_address,
            cellPhone: data.cell_phone,
            homePhone: data.home_phone_no,
            school: data.school,
            email: data.email,
            edit: <NavLink
              to={{
                pathname: 'student/edit',
                state: {
                  studentId: data.id
                }
              }}
              className="btn btn-primary">Edit</NavLink>,
            delete: <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger">Delete</button>
          })
        })
        return rowData
      }())
    })
  };
  render() {
    return (
      <div>
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
    )
  }
}

