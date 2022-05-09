import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import MetisMenu from 'react-metismenu';
import {
    setEnableMobileMenu,
    setInnerMenuOn
} from '../../reducers/ThemeOptions';
import {AnalysisNav,AudienceNav,GroupingNav,ReportingNav, MyAccoNav, TeamNav} from './NavItems';

class Nav extends Component {

    state = {};

    toggleMobileSidebar = () => {        
        let {enableMobileMenu, setEnableMobileMenu} = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    }
    
    render() {
        return (
            <Fragment>
                {this.props.innermenu && this.props.innermenu == true?
                
                    <>
                        <h5 className="app-sidebar__heading">My Account</h5>
                        <MetisMenu content={MyAccoNav} classNameItem="customMetisMenuIcon" onSelected={this.toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu whenInnerMenuOn"/>
                        <h5 className="app-sidebar__heading">Team</h5>
                        <MetisMenu content={TeamNav} classNameItem="customMetisMenuIcon" onSelected={this.toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu whenInnerMenuOn"/>
                    </>
                :
                    <>
                        <h5 className="app-sidebar__heading">Analysis</h5>
                        <MetisMenu content={AnalysisNav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                        <h5 className="app-sidebar__heading">Groupings</h5>
                        <MetisMenu content={AudienceNav}  onSelected={this.toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                        <h5 className="app-sidebar__heading">Audience</h5>
                        <MetisMenu content={GroupingNav}  onSelected={this.toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                        <h5 className="app-sidebar__heading">Connect & Reporting</h5>
                        <MetisMenu content={ReportingNav}  onSelected={this.toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    </>
                }
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}
const mapStateToProps = state => ({
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));