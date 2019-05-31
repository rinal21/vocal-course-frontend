import React, { Component } from "react";
import StudentAttendanceForm from "./form/Edit-Form"


export default class studentAttendanceFormList extends Component {
    render() {
        const { studentId } = this.props.location.state
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Student Attendance
                      </h3>
                </div>
                <div className="box-body">
                    <StudentAttendanceForm 
                        studentId={studentId} />
                </div>
            </div>
        )
    }
}