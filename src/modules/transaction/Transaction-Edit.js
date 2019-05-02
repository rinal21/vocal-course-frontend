import React, { Component } from "react";
import TransactionForm from "./form/Edit-Form"


export default class transactionFormList extends Component {
    render() {
        const { transactionId } = this.props.location.state
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Transaction
                      </h3>
                </div>
                <div className="box-body">
                    <TransactionForm 
                        transactionId={transactionId} />
                </div>
            </div>
        )
    }
}

