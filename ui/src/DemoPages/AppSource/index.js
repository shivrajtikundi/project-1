import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import AddSource from './Components/add_source';
import ManageSource from './Components/manage_source';
import cx from 'classnames';
import style from './style.module.css';

const AppSource = ({match}) => {
    return(
        <Fragment>
            <AppHeader menuclosable={false}/>
            <Route path={`${match.url}/manageSource`} >
                <div className="app-main">
                    <AppSidebar innermenu={true}/>
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <ManageSource />
                        </div>
                    </div>
                </div>
            </Route>
            <Route path={`${match.url}/addSource`} >
                <div className={cx("app-main", style.customAppMain)}>
                    <AddSource />
                </div>
            </Route>
        </Fragment>
    );

};

export default AppSource;