import React, { Component } from "react";
import { MDBDataTable } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class teacherList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teachers: []
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/teacher/' + id)
      .then(console.log('Deleted'))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
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
    const teacherDelete = this.delete

    return ({
      columns: [
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

        teachers.map((data, index) => {
          rowData.push({
            name: data.name,
            student: data.students_count,
            salary: data.salary,
            edit: <NavLink
              to={{
                pathname: 'teacher/edit',
                state: {
                  teacherId: data.id,
                  name: data.name,
                  salary: data.salary
                }
              }}
              className="btn btn-primary">Edit</NavLink>,
            delete: <button onClick={() => teacherDelete(data.id)} className="btn btn-danger">Delete</button>
          })
        })

        return rowData
      }())
    })
  };  

    render() {
        return(
            <div>
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
            </div>
        )
    }
}

