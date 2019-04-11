import React, { Component } from "react";
import StudentAddForm from "./form/Add-Form"


export default class studentList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Student
                      </h3>
                </div>
                <div className="box-body">
                    <StudentAddForm />
                </div>
            </div>
        )
    }
}

