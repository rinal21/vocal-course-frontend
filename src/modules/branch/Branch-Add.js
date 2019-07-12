import React, { Component } from "react";
import BranchAddForm from "./form/Add-Form"


export default class studentList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Branch
                      </h3>
                </div>
                <div className="box-body">
                    <BranchAddForm />
                </div>
            </div>
        )
    }
}

