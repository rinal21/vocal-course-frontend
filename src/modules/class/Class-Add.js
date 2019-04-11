import React, { Component } from "react";
import ClassAddForm from "./form/Add-Form"


export default class studentList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Class
                      </h3>
                </div>
                <div className="box-body">
                    <ClassAddForm />
                </div>
            </div>
        )
    }
}

