import React, { Component } from "react";
import EmployeeEditForm from "./form/Edit-Form"


export default class studentList extends Component {
    render() {
        const { employeeId } = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Employee
                      </h3>
                </div>
                <div className="box-body">
                    <EmployeeEditForm
                        employeeId={employeeId} />
                </div>
            </div>
        )
    }
}

