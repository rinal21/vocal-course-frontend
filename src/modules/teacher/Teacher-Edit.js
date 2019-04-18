import React, { Component } from "react";
import TeacherEditForm from "./form/Edit-Form"


export default class studentList extends Component {
    render() {
        const { teacherId, name, salary } = this.props.location.state
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Teacher
                      </h3>
                </div>
                <div className="box-body">
                    <TeacherEditForm 
                    teacherId = {teacherId}
                    name = {name}
                    salary = {salary}/>
                </div>
            </div>
        )
    }
}

