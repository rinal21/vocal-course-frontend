import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom";
 
class Home extends Component {
  render() {
    const data= {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  }

    return (
      <>
      <section class="content-header">
      <h1>
        Dashboard
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>
    
        <section class="content">
          <div class="row">
            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-yellow">
                <div class="inner">
                  <h3>150</h3>
                  <p>Students</p>
                </div>
                <div class="icon">
                  <i className="fa fa-child"></i>
                </div>
                <Link to="/student-paid" class="small-box-footer">
                  More info <i class="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-green">
                <div class="inner">
                  <h3>150</h3>
                  <p>Transactions</p>
                </div>
                <div class="icon">
                  <i className="fa fa-exchange"></i>
                </div>
                <Link to="/transaction" class="small-box-footer">
                  More info <i class="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* <ul>
          <li>
            <Link to="/">
              <i className="fa fa-dashboard" /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/class">
              <i className="fa fa-users" /> <span>Class</span>
            </Link>
          </li>
          <li>
            <Link to="/user">
              <i className="fa fa-user" /> <span>User</span>
            </Link>
          </li>
        </ul> */}




          {/* <section class="content">
            <div class="row">
              <div class="col-md-12">
                <div class="box">
                  <div class="box-header with-border">
                    <h3 class="box-title">Monthly Recap Report</h3>

                    <div class="box-tools pull-right">
                      <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                      </button>
                      <div class="btn-group">
                        <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                          <i class="fa fa-wrench"></i></button>
                        <ul class="dropdown-menu" role="menu">
                          <li><a href="#">Action</a></li>
                          <li><a href="#">Another action</a></li>
                          <li><a href="#">Something else here</a></li>
                          <li class="divider"></li>
                          <li><a href="#">Separated link</a></li>
                        </ul>
                      </div>
                      <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-8">
                        <p class="text-center">
                          <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                        </p>

                        <div class="chart">
                        <Bar
                          data={data}
                          width={100}
                          height={50}
                        />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <p class="text-center">
                          <strong>Goal Completion</strong>
                        </p>

                        <div class="progress-group">
                          <span class="progress-text">Add Products to Cart</span>
                          <span class="progress-number"><b>160</b>/200</span>

                          <div class="progress sm">
                            <div class="progress-bar progress-bar-aqua" style={{width: '40%'}}></div>
                          </div>
                        </div>
                        <div class="progress-group">
                          <span class="progress-text">Complete Purchase</span>
                          <span class="progress-number"><b>310</b>/400</span>

                          <div class="progress sm">
                            <div class="progress-bar progress-bar-red" style={{width: '80%'}}></div>
                          </div>
                        </div>
                        <div class="progress-group">
                          <span class="progress-text">Visit Premium Page</span>
                          <span class="progress-number"><b>480</b>/800</span>

                          <div class="progress sm">
                            <div class="progress-bar progress-bar-green" style={{width: '80%'}}></div>
                          </div>
                        </div>
                        <div class="progress-group">
                          <span class="progress-text">Send Inquiries</span>
                          <span class="progress-number"><b>250</b>/500</span>

                          <div class="progress sm">
                            <div class="progress-bar progress-bar-yellow" style={{width: '80%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="box-footer">
                    <div class="row">
                      <div class="col-sm-3 col-xs-6">
                        <div class="description-block border-right">
                          <span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 17%</span>
                          <h5 class="description-header">$35,210.43</h5>
                          <span class="description-text">TOTAL REVENUE</span>
                        </div>
                      </div>
                      <div class="col-sm-3 col-xs-6">
                        <div class="description-block border-right">
                          <span class="description-percentage text-yellow"><i class="fa fa-caret-left"></i> 0%</span>
                          <h5 class="description-header">$10,390.90</h5>
                          <span class="description-text">TOTAL COST</span>
                        </div>
                      </div>
                      <div class="col-sm-3 col-xs-6">
                        <div class="description-block border-right">
                          <span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 20%</span>
                          <h5 class="description-header">$24,813.53</h5>
                          <span class="description-text">TOTAL PROFIT</span>
                        </div>
                      </div>
                      <div class="col-sm-3 col-xs-6">
                        <div class="description-block">
                          <span class="description-percentage text-red"><i class="fa fa-caret-down"></i> 18%</span>
                          <h5 class="description-header">1200</h5>
                          <span class="description-text">GOAL COMPLETIONS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-8">
                <div class="box box-info">
                  <div class="box-header with-border">
                    <h3 class="box-title">Latest Orders</h3>

                    <div class="box-tools pull-right">
                      <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                      </button>
                      <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                  <div class="box-body">
                    <div class="table-responsive">
                      <table class="table no-margin">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Item</th>
                            <th>Status</th>
                            <th>Popularity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><a href="pages/examples/invoice.html">OR9842</a></td>
                            <td>Call of Duty IV</td>
                            <td><span class="label label-success">Shipped</span></td>
                            <td>
                              <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                            </td>
                          </tr>
                          <tr>
                            <td><a href="pages/examples/invoice.html">OR1848</a></td>
                            <td>Samsung Smart TV</td>
                            <td><span class="label label-warning">Pending</span></td>
                            <td>
                              <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                            </td>
                          </tr>
                          <tr>
                            <td><a href="pages/examples/invoice.html">OR7429</a></td>
                            <td>iPhone 6 Plus</td>
                            <td><span class="label label-danger">Delivered</span></td>
                            <td>
                              <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                            </td>
                          </tr>
                          <tr>
                            <td><a href="pages/examples/invoice.html">OR7429</a></td>
                            <td>Samsung Smart TV</td>
                            <td><span class="label label-info">Processing</span></td>
                            <td>
                              <div class="sparkbar" data-color="#00c0ef" data-height="20">90,80,-90,70,-61,83,63</div>
                            </td>
                          </tr>
                          <tr>
                            <td><a href="pages/examples/invoice.html">OR1848</a></td>
                            <td>Samsung Smart TV</td>
                            <td><span class="label label-warning">Pending</span></td>
                            <td>
                              <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                            </td>
                          </tr>
                          <tr>
                            <td><a href="pages/examples/invoice.html">OR7429</a></td>
                            <td>iPhone 6 Plus</td>
                            <td><span class="label label-danger">Delivered</span></td>
                            <td>
                              <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                            </td>
                          </tr>
                          <tr>
                            <td><a href="pages/examples/invoice.html">OR9842</a></td>
                            <td>Call of Duty IV</td>
                            <td><span class="label label-success">Shipped</span></td>
                            <td>
                              <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="box-footer clearfix">
                    <a href="javascript:void(0)" class="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
                    <a href="javascript:void(0)" class="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
              <div class="box box-primary">
                <div class="box-header with-border">
                  <h3 class="box-title">Recently Added Products</h3>

                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body">
                  <ul class="products-list product-list-in-box">
                    <li class="item">
                      <div class="product-img">
                        <img src="/img/default-50x50.gif" alt="Product Image" />
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">Samsung TV
                      <span class="label label-warning pull-right">$1800</span></a>
                        <span class="product-description">
                          Samsung 32" 1080p 60Hz LED Smart HDTV.
                        </span>
                      </div>
                    </li>
                    <li class="item">
                      <div class="product-img">
                        <img src="/img/default-50x50.gif" alt="Product Image" />
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">Bicycle
                      <span class="label label-info pull-right">$700</span></a>
                        <span class="product-description">
                          26" Mongoose Dolomite Men's 7-speed, Navy Blue.
                        </span>
                      </div>
                    </li>
                    <li class="item">
                      <div class="product-img">
                        <img src="/img/default-50x50.gif" alt="Product Image" />
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">Xbox One <span
                          class="label label-danger pull-right">$350</span></a>
                        <span class="product-description">
                          Xbox One Console Bundle with Halo Master Chief Collection.
                        </span>
                      </div>
                    </li>
                    <li class="item">
                      <div class="product-img">
                        <img src="/img/default-50x50.gif" alt="Product Image" />
                      </div>
                      <div class="product-info">
                        <a href="javascript:void(0)" class="product-title">PlayStation 4
                      <span class="label label-success pull-right">$399</span></a>
                        <span class="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="box-footer text-center">
                  <a href="javascript:void(0)" class="uppercase">View All Products</a>
                </div>
              </div>
                </div>
            </div>
          </section> */}
      </>
    );
  }
}

export default Home;