import React, { Component } from "react";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBDataTable  } from 'mdbreact';
import { NavLink } from "react-router-dom";

const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 270
      },
      {
        label: 'School',
        field: 'school',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Birth date',
        field: 'birthDate',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Sex',
        field: 'sex',
        width: 100
      },
      {
        label: 'Phone',
        field: 'phone',
        width: 100
      },
      {
        label: 'Edit',
        field: 'edit',
        width: 100
      },
      {
        label: 'Delete',
        field: 'delete',
        width: 100
      }
    ],
    rows: [
      {
        name: 'Andi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Budi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Charly',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Andi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Budi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Charly',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },{
        name: 'Andi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Budi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Charly',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },{
        name: 'Andi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Budi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Charly',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },{
        name: 'Andi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Budi',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
      {
        name: 'Charly',
        address: 'Jln Mawar Raya No. 9',
        school: 'Edinburgh',
        email: 'email@email.com',
        birthDate: '2011/04/25',
        age: '17',
        sex: 'M',
        phone: '0987654321',
        edit: <button className="btn btn-primary">Edit</button>,
        delete: <button className="btn btn-danger">Delete</button>
      },
    ]
  };

export default class teacherList extends Component {
    render() {
        return(
            <div>
              <div class="box-header">
                  <NavLink to="/transaction/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Transaction</NavLink>
              </div>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                    btn
                />
            </div>
        )
    }
}

