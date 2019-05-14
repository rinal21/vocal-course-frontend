import React, { Component } from "react"
import { Route } from "react-router-dom"

class Redirect extends Component {
    componentDidMount() {
        alert('You must login first')
        window.location.replace('/login')
    }

    render() {
        return (<></>)
    }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage["appState"] && JSON.parse(localStorage["appState"]).isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect/>
            )}
    />
)