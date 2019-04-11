import React, { Component } from "react";
import PayrollAddForm from "./form/Add-Form"


export default class studentList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Payroll
                      </h3>
                </div>
                <div className="box-body">
                    <PayrollAddForm />
                </div>
            </div>
        )
    }
}

