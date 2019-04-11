import React, { Component } from "react";
import TransactionForm from "./form/Add-Form"


export default class transactionFormList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Transaction
                      </h3>
                </div>
                <div className="box-body">
                    <TransactionForm />
                </div>
            </div>
        )
    }
}

