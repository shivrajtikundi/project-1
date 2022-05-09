import React, {Fragment} from 'react';

// import Ionicon from 'react-ionicons';

import { IoIosCalendar } from "react-icons/io";

import PerfectScrollbar from 'react-perfect-scrollbar';
import Cookies from 'js-cookie';
import {
    DropdownToggle, DropdownMenu,DropdownItem,
    Nav, Col, Row, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';
import cx from 'classnames';


import {
    faAngleDown,
    faUsers,
    faQuestion,
    faVideo,
    faWifi,
    faLifeRing,
    faExclamationCircle,
    faCog,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';
import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import { Link } from 'react-router-dom';
import style from "../style.module.css";

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    logout = () => {
        Cookies.remove('token')
        window.location = "/";
    }


    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className={style.customLink}>
                                        Help
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu justified right className="rm-pointers dropdown-menu-xs">
                                        <DropdownItem className={style.customSubMenu}>
                                            <FontAwesomeIcon icon={faQuestion}/>
                                            &nbsp;
                                            &nbsp;
                                            <span>
                                                Help with Reviews
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem className={style.customSubMenu}>
                                            <FontAwesomeIcon icon={faVideo}/>
                                            &nbsp;
                                            &nbsp;
                                            <span>
                                                Watch the video
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <FontAwesomeIcon icon={faWifi}/>
                                            &nbsp;
                                            &nbsp;
                                            <span>
                                                Product Changes
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <FontAwesomeIcon icon={faLifeRing}/>
                                            &nbsp;
                                            &nbsp;
                                            <span>
                                                Support Centre
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <FontAwesomeIcon icon={faExclamationCircle}/>
                                            &nbsp;
                                            &nbsp;
                                            <span>
                                                Service Status
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <FontAwesomeIcon icon={faPaperPlane}/>
                                            &nbsp;
                                            &nbsp;
                                            <span>
                                                Contact Us
                                            </span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                    {/* <DropdownMenu right className="rm-pointers dropdown-menu-xs">
                                        <div className="scroll-area-xs" style={{
                                            height: '150px'
                                        }}>
                                          <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <FontAwesomeIcon icon={faUsers}/>
                                                            &nbsp;
                                                            &nbsp;
                                                            <span>
                                                                Help with Reviews
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Subscription
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Referrals
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Settings
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <DropdownItem divider />
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Blog
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Feedback
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Help
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Terms and Conditions
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span style={{fontSize:"15px"}}>
                                                                Privacy
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <DropdownItem divider />
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            <span onClick={(e)=>this.logout(e)} style={{fontSize:"15px"}}>
                                                                Logout
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </PerfectScrollbar>
                                        </div>
                                    </DropdownMenu> */}
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <Link to="/source/manageSource" className={style.customLink}>Manage Sources</Link>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <Link className={style.customLink}>Team</Link>
                            </div>

                            <div className="widget-content-right header-user-info ml-3">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className={cx([style.customLink , 'p-0'])}>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faCog}/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-xs">
                                        <DropdownItem header disabled style={{fontSize:"10px", color:"black"}}>
                                            Signed in as
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <Link className={style.customProfileLink} to="/users/profile">
                                                Dhrubajyoti Adak
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Manage Sources
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <Link className={style.customProfileLink} to="/users/profile">
                                                Profile
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Email Notification
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Team Members
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Plane, billing & Invoice
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Linked App Stores
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Canned Replies
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Manage Translations
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem className={style.customSubMenu}>
                                            <span>
                                                Single Sign-On (SSO)
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={(e)=>this.logout()} className={cx([style.customSubMenu,style.logoutLink])}>
                                            <span>
                                                Log Out
                                            </span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;