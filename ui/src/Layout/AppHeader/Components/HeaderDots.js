import React, {Fragment} from 'react';

// import Ionicon from 'react-ionicons';
import { IoIosGrid, IoIosNotificationsOutline, IoIosAnalytics } from "react-icons/io";
import { connect } from 'react-redux';
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu,
    Nav, Col, Row, Button, NavItem, DropdownItem
} from 'reactstrap';

import {
    AreaChart, Area,
    ResponsiveContainer,
} from 'recharts';

import {
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

import CountUp from 'react-countup';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import bg4 from '../../../assets/utils/images/dropdown-header/abstract4.jpg';
import city2 from '../../../assets/utils/images/dropdown-header/city2.jpg';
import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';

import Flag from 'react-flagkit';

import Tabs from 'react-responsive-tabs';
import Cookies from 'js-cookie';
// Dropdown Tabs Content
import ChatExample from './TabsContent/ChatExample';
import TimelineEx from './TabsContent/TimelineExample';
import SysErrEx from './TabsContent/SystemExample';
import style from "../style.module.css";
import { licenceService } from '../../../services/licence.service';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page C', uv: 2000, pv: 6800, amt: 2290},
    {name: 'Page D', uv: 4780, pv: 7908, amt: 2000},
    {name: 'Page E', uv: 2890, pv: 9800, amt: 2181},
    {name: 'Page F', uv: 1390, pv: 3800, amt: 1500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const tabsContent = [
    {
        title: 'Messages',
        content: <ChatExample/>
    },
    {
        title: 'Events',
        content: <TimelineEx/>
    },
    {
        title: 'System Errors',
        content: <SysErrEx/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

class HeaderDots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            daysLeft: 0,
        };

    }
    
    componentDidMount(){
        this.getUserLicence();
    }
    getUserLicence = () =>{
        const {dispatch} = this.props;
        licenceService.getUserLicence().then(res=>{
            dispatch({
                type: "SET_LICENCE",
                licence: res.data
            })
            var licenceObj = res.data;
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const currentDate = new Date();
            const final_date = new Date(licenceObj.end_on);
            const diffDays = Math.round(Math.abs((currentDate - final_date) / oneDay));
            this.setState({
                daysLeft: diffDays
            })
        })
    }
    redirectToLicencePage = () => {
        window.location = "/licence/all_licence";
    }

    render() {
       
        return (
            <Fragment>
                <div className="header-dots">
                    <span className={style.validityText}>
                        {this.state.daysLeft} Days Remaining
                    </span>
                    <Button onClick={()=>this.redirectToLicencePage()} className={style.headerDotButton}>
                        View Plans
                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faArrowRight}/>
                    </Button>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProp = state => ({
    licence: state.UserLicence.licence
})
export default connect(mapStateToProp)(HeaderDots);
