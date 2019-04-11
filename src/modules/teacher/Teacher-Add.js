import React, { Component } from "react";
import TeacherAddForm from "./form/Add-Form"


export default class studentList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Teacher
                      </h3>
                </div>
                <div className="box-body">
                    <TeacherAddForm />
                </div>
            </div>
        )
    }
}

