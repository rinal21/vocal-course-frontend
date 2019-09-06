import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import NumberFormat from 'react-number-format';

export default class teacherList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teachers: [],
      deleteConfirm: false,
      deleteId : '',
      resignConfirm: false,
      resignId: '',
      activeConfirm: false,
      activeId: ''
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/teacher/' + id)
      .then(console.log('Deleted'))
      .then(() => this.setState({deleteConfirm: !this.state.deleteConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  resign(id) {
    axios.patch('http://localhost:8000/api/user_resign/' + id)
      .then(res => console.log(res.data))
      .then(() => this.setState({ resignConfirm: !this.state.resignConfirm }))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  active(id) {
    axios.patch('http://localhost:8000/api/user_resign/' + id)
      .then(res => console.log(res.data))
      .then(() => this.setState({ activeConfirm: !this.state.activeConfirm }))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
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

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://localhost:8000/api/teachers')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        teachers: json.data
      })
    })
  }

  data = (teachers) => {
    const deleteConfirm = this.toggleDeleteConfirmation
    const resignConfirm = this.toggleResignConfirmation
    const activeConfirm = this.toggleActiveConfirmation

    return ({
      columns: [
        {
          label: 'Joined At',
          field: 'join',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Total Student',
          field: 'student',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Salary',
          field: 'salary',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 500
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

        teachers.map((data, index) => {
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
            join: data.joined_at,
            name: data.name,
            student: data.students_count,
            salary: <NumberFormat value={data.salary} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} />,
            status: data.status,
            action:
              <div>
                <NavLink
                  to={{
                    pathname: 'teacher/edit',
                    state: {
                      teacherId: data.id,
                      name: data.name,
                      salary: data.salary
                    }
                  }}
                  className="btn btn-primary">Edit</NavLink>
                <button onClick={() => deleteConfirm(data.user_id)} className="btn btn-danger" style={{ position: "relative", left: 10 }}>Delete</button>
                {data.status != 'Resigned' ? <button onClick={() => resignConfirm(data.user_id)} className="btn btn-warning" style={{ position: "relative", left: 20 }}>Resign</button> :
                  <button onClick={() => activeConfirm(data.user_id)} className="btn btn-success" style={{ position: "relative", left: 20 }}>Active</button>}
              </div>
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
                <b><h4>Teacher</h4></b>
                <div class="box-header">
                  <NavLink to="/teacher/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Teacher</NavLink>
                </div>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={this.data(this.state.teachers)}
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

