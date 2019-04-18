import React, { Component } from "react";
import ClassEditForm from "./form/Edit-Form"


export default class studentList extends Component {
    render() {
        const { name, classId } = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Class
                      </h3>
                </div>
                <div className="box-body">
                    <ClassEditForm
                        classId={classId}
                        name={name} />
                </div>
            </div>
        )
    }
}

