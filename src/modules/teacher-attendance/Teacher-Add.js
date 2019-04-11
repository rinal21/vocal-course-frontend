import React, { Component } from "react";
import TeacherAttendanceForm from "./form/Add-Form"


export default class teacherAttendanceFormList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Teacher Attendance
                      </h3>
                </div>
                <div className="box-body">
                    <TeacherAttendanceForm />
                </div>
            </div>
        )
    }
}

