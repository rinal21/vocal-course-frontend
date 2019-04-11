import React, { Component } from "react";
import PricingAddForm from "./form/Add-Form"


export default class studentList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Pricing
                      </h3>
                </div>
                <div className="box-body">
                    <PricingAddForm />
                </div>
            </div>
        )
    }
}

