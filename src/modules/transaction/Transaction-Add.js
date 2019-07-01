import React, { Component } from "react";
import TransactionForm from "./form/Add-Form"


export default class transactionFormList extends Component {
    render() {
        const { studentId, studentName, teacherId, teacherName } = this.props.location.state ? this.props.location.state : ''
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Transaction
                      </h3>
                </div>
                <div className="box-body">
                    <TransactionForm
                        studentId={studentId}
                        studentName={studentName}
                        teacherId={teacherId}
                        teacherName={teacherName} />
                </div>
            </div>
        )
    }
}

