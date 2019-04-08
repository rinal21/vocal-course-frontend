import React, {Component} from 'react';
import { Route, HashRouter } from "react-router-dom";
import Home from "../modules/Home";
import About from "../modules/About";
import Contact from "../modules/Contact";

export default class Content extends Component {
    render(){
        return (
            <HashRouter>
                <div className="content-wrapper">
            <section className="content-header">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h3 className="box-title">
                        Monthly Recap Report
                      </h3>
                    </div>
                    <div className="box-body">
                      <div className="row">
                        <div className="content">
                          <Route exact path="/" component={Home} />
                          <Route path="/about" component={About} />
                          <Route path="/contact" component={Contact} />
                        </div>
                      </div>
                    </div>
                  </div>    
                </div>
              </div>
              
            </section>
          </div>
            </HashRouter>
          
        );
    }
}