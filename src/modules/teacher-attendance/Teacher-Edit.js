import React, { Component } from "react";
import TeacherAttendanceForm from "./form/Edit-Form"


export default class teacherAttendanceFormList extends Component {
    render() {
        const { teacherId } = this.props.location.state
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Teacher Attendance
                      </h3>
                </div>
                <div className="box-body">
                    <TeacherAttendanceForm 
                        teacherId={teacherId} />
                </div>
            </div>
        )
    }
}

