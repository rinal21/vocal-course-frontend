import React, { Component } from "react";
import EmployeeAddForm from "./form/Add-Form"


export default class studentList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Employee
                      </h3>
                </div>
                <div className="box-body">
                    <EmployeeAddForm />
                </div>
            </div>
        )
    }
}

