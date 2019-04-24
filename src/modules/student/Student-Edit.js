import React, { Component } from "react";
import StudentEditForm from "./form/Edit-Form"


export default class studentEdit extends Component {
    render() {
        const { studentId } = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Student
                      </h3>
                </div>
                <div className="box-body">
                    <StudentEditForm
                        studentId={studentId} />
                </div>
            </div>
        )
    }
}

