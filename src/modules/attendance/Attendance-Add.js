import React, { Component } from "react";
import StudentAttendanceForm from "./form/Add-Form"


export default class studentAttendanceFormList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Student Attendance
                      </h3>
                </div>
                <div className="box-body">
                    <StudentAttendanceForm />
                </div>
            </div>
        )
    }
}

