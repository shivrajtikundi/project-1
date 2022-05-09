import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from '../style.module.css';
import cx from 'classnames';

const ManageSource = () => {
    return(
        <Fragment>
            <div>
                <h5 className={style.manageSourcesHeader}>Manage Sources</h5>
                <h5 className={style.manageSourcesSubHeader}>Track sources, adjust review email frequency and translations. <Link>Learn more</Link> →</h5>
                <Card>
                    <CardHeader className={style.customCardHeader}>
                        My Sources (8 Sources)
                        <Link to="addSource" className={style.headerButtons}>
                            <Button >
                                <svg width="16" height="16" viewBox="0 0 16 16" class="i-icon"><path d="M9 7V3.995C9 3.455 8.552 3 8 3c-.556 0-1 .446-1 .995V7H3.995C3.455 7 3 7.448 3 8c0 .556.446 1 .995 1H7v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V9h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H9z" fill-rule="evenodd"></path></svg>
                                &nbsp; Add Source
                            </Button>
                        </Link>
                        
                    </CardHeader>
                    <CardBody>
                        
                    </CardBody>
                </Card>
                <Card className={style.customCardHeaderSecondary}>
                    <CardHeader className={cx(style.customCardHeader)}>
                        Team Sources (8 Sources)
                    </CardHeader>
                    <CardBody>
                        <CardText className={style.customCardText}>
                            No on else in your team has added a source yet. Once they do, they will appear here.

                            <p className={style.inviteTeamButton}>
                                <Button>Invite Your Team</Button>
                            </p>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    );
}

export default ManageSource;