import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, Table } from 'reactstrap';
import style from '../style.module.css';
import { alertService, appService } from '../../../services';

const AddSource = () => {
    const [{search_hint, searched_app_from_app_store, searched_app_from_play_store}, setState] = useState({
        search_hint:"",
        searched_app_from_app_store:[],
        searched_app_from_play_store:[]
    }); 
    const handleChange = (e) =>{
        var name = e.target.name;
        var value = e.target.value;
        setState((prevState)=>({
            ...prevState,
            [name]:value
        }));
    }

    const addSource = (e) => {
        var selectedAppId = e.target.dataset.id;
        var selectedAppStore = e.target.dataset.store;
        var tappedApp = {};
        if(selectedAppStore == "GOOGLE_PLAY_STORE"){
            tappedApp = searched_app_from_play_store.find(item => { return item.appId == selectedAppId });
            if(tappedApp){
                tappedApp.store_type = "GOOGLE_PLAY_STORE";
            };
        }else{
            tappedApp = searched_app_from_app_store.find(item => { return item.appId == selectedAppId });
            if(tappedApp){
                tappedApp.store_type = "ITUNES_APP_STORE";
            };
        }
        appService.addAppSource(tappedApp).then(res=>{
            if(res.success == true){
                alertService.throwSuccess("Source added successfully");
                return;
            }else{
                alertService.throwError(res.error);
                return;
            }
        }).catch(err=>{
            alertService.throwError("Error occured");
            return;
        })
        
    }

    const searchApps = () => {
        var req = {
            name: search_hint
        }
        setState((prevState)=>({
            ...prevState,
            searched_app_from_app_store: [],
            searched_app_from_play_store: []
        }));
        try{
            var searched_app_from_app_store_var = [];
            var searched_app_from_play_store_var = [];
            appService.searchAppInAppStore(req).then(res=>{
                if(res.success == true){
                    searched_app_from_app_store_var = res.data;
                    setState((prevState)=>({
                        ...prevState,
                        searched_app_from_app_store: searched_app_from_app_store_var
                    }));
                }else{
                    alertService.throwError("Error Occured");
                    return;
                }
            }).catch(err=>{
                alertService.throwError("Error Occured");
                return;
            });

            appService.searchAppInPlayStore(req).then(res=>{
                if(res.success == true){
                    searched_app_from_play_store_var = res.data;
                    setState((prevState)=>({
                        ...prevState,
                        searched_app_from_play_store: searched_app_from_play_store_var
                    }));
                }else{
                    alertService.throwError("Error Occured");
                    return;
                }
            }).catch(err=>{
                alertService.throwError("Error Occured");
                return;
            });
           
        }catch(err){
            alertService.throwError("Error Occured");
            return;
        }
    }
    return(
        <Fragment>
            <div className={style.pageContainer}>
                <h5 className={style.pageHeader}>Adding New Source</h5>
                <Card>
                    <CardHeader className={style.customCardHeader}>
                        <img height="20" width="20" alt="Google Play icon" src="https://img.icons8.com/fluency/2x/google-play.png"></img>
                        <img height="20" width="20" alt="App Store Icon" src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"></img>
                        &nbsp; Searching for iOS and Google Play Apps
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="10">
                                <Input onChange={(e)=>handleChange(e)} name="search_hint" size="lg" placeholder="Enter the app name to search" className={style.searchBox}></Input>
                            </Col>
                            <Col md="2">
                                <Button onClick={(e)=>searchApps()} className={style.searchBtn}>Search</Button>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Link className={style.footerLink}>Bulk Import</Link>
                    </CardFooter>
                </Card>
                <Row className={style.applist}>
                    <Col md="6">
                        {searched_app_from_app_store && searched_app_from_app_store.length > 0 &&
                        <Card>
                            <CardHeader className={style.appListHeader}>
                                <img height="30" width="30" alt="App Store Icon" src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"></img>
                                &nbsp; iOS App
                            </CardHeader>
                            <CardBody className={style.appListBody}>
                                <Table striped>
                                    <tbody>
                                        {searched_app_from_app_store.map(function(app, i){
                                            return (                                        
                                                <tr>
                                                    <td className={style.appTableImgHolder}>
                                                        <img height="30" width="30" src={app.icon}></img>
                                                    </td>
                                                    <td className={style.appInfoHolder}>
                                                        <p className={style.appName}>{app.title}</p>
                                                        <p className={style.appPublisherName}>{app.developer}</p>
                                                    </td>
                                                    <td className={style.appTableActionBtnHolder}>
                                                        <Button 
                                                            data-store="ITUNES_APP_STORE"
                                                            data-id={app.appId}
                                                            className={style.addSourceFromTableBtn}
                                                            onClick={(e)=>addSource(e)}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" className={style.iIcon}><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                                            &nbsp;
                                                            Add Source
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>}
                    </Col>
                    <Col md="6">
                        {searched_app_from_play_store && searched_app_from_play_store.length > 0 &&
                        <Card>
                            <CardHeader className={style.appListHeaderForGoogle}>
                                <img height="30" width="30" alt="Google Play icon" src="https://img.icons8.com/fluency/2x/google-play.png"></img>
                                &nbsp; Google Play Apps
                            </CardHeader>
                            <CardBody className={style.appListBody}>
                                <Table striped>
                                    <tbody>
                                        {searched_app_from_play_store.map(function(app, i){
                                            return (                                        
                                                <tr>
                                                    <td className={style.appTableImgHolder}>
                                                        <img height="30" width="30" src={app.icon}></img>
                                                    </td>
                                                    <td className={style.appInfoHolder}>
                                                        <p className={style.appName}>{app.title}</p>
                                                        <p className={style.appPublisherName}>{app.developer}</p>
                                                    </td>
                                                    <td className={style.appTableActionBtnHolder}>
                                                        <Button 
                                                            data-store="GOOGLE_PLAY_STORE"
                                                            data-id={app.appId}
                                                            className={style.addSourceFromTableBtn}
                                                            onClick={(e)=>addSource(e)}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" className={style.iIcon}><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                                            &nbsp;
                                                            Add Source
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>}
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
}

export default AddSource;