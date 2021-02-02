import $ from 'jquery';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Loading from './loading';
import Progress from './progress';
import Navigation from './navigation';
import TopHeader from './topHeader';
import Footer from './footer';
import Table from "./table";
import Charts from "./Charts";
import {correctHeight, detectBody} from './helpers/helpers';

import '../assets/dependencies';
import * as analysisActionCreator from "../redux/actions/gas_year_category";
import {connect} from "react-redux";

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isYearly: true,
            tableView: true
        }
    }

    componentDidMount() {
        // eslint-disable-next-line func-names
        $(window).bind('load resize', function () {
            correctHeight();
            detectBody();
        });
    }

    setTableView = () => {
        this.setState((prevState) => {
            const newValue = {
                'tableView': !prevState.tableView
            }

            return {
                ...prevState,
                ...newValue
            }
        });
        // $('li .fa-table').addClass('active')

    };

    setAnalysis = () => {
        this.setState((prevState) => {
            const newValue = {
                'isYearly': !prevState.isYearly
            };

            return {
                ...prevState,
                ...newValue
            }
        })
    };

    render() {
        return (
            <div id="wrapper">
                <BrowserRouter>
                    <div>
                        <Progress/>
                        <Navigation isYearly={this.state.isYearly}
                                    setAnalysis={this.setAnalysis}
                                    onSelected={this.props.onSelected}/>

                        <div id="page-wrapper" className="gray-bg">
                            <TopHeader/>
                            <div className="animated fadeInDown">
                                <div className="body wrapper wrapper-content animated">
                                        <ul className="nav nav-tabs border-bottom-0">
                                            <li className={this.state.tableView === true ? "nav-item active bg-white rounded-top border-bottom-0":"nav-item bg-light rounded-top"}>
                                                <div className={this.state.tableView === true ? "nav-link active bg-white border-bottom-0 ":"nav-link bg-light rounded-top"} onClick={this.setTableView}>
                                                    <i className="fa fa-table pr-1"/>Табели</div>
                                            </li>
                                            <li className={this.state.tableView === false ? "nav-item active bg-white rounded-top":"nav-item bg-light rounded-top"}>
                                                <div className={this.state.tableView === false ? "nav-link active bg-white border-0 ":"nav-link bg-light rounded-top"} onClick={this.setTableView}>
                                                    <i className="fa fa-bar-chart pr-1"/>Графици</div>
                                            </li>
                                        </ul>
                                    <div className="ibox-content p-3 m-0">
                                        {
                                            !this.props.selected || this.props.selected.length === 0 ? <Loading/>
                                            :
                                                    this.state.tableView ? (
                                                        <Table isYearly={this.state.isYearly}
                                                               selected={this.props.selected}/>
                                                    ) : (
                                                        <Charts isYearly={this.state.isYearly}
                                                                selected={this.props.selected}/>)
                                        }

                                    </div>
                                    </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        selected: state.analysisReducer.selected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelected: (gasses, categories, analysis) => dispatch (analysisActionCreator.loadSelected(gasses, categories, analysis))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);