import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../redux/state';
import { Dispatch } from 'redux';
import { hidePrRasiedDialog, createPullRequest, queryForJiraStatus } from '../actions/AppAction';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { Column } from 'primereact/column';
import { FormRow } from './FormData';
import { StringBuilder } from 'typescript-string-operations';

interface Props {
    dispatch: Dispatch;
    state: RootState;
}

interface LocalState {
    jiraNumberTextVal: string
    tableData: any

}
class PRDialog extends React.Component<Props, LocalState> {
    constructor(props: Props, localState: LocalState) {
        super(props)
        this.state = {
            jiraNumberTextVal: "",
            tableData: []
        }
    }
    handleKeyDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            this.props.dispatch(queryForJiraStatus({
                jira: this.state.jiraNumberTextVal ?? "",
                token: this.props.state.app.login?.token ?? ""
            }))
        }
    }
    generateColumn(): any {
        const allColumn: any = [];
        let data: any[] = this.props.state.app?.raisePR?.data?.tableCol
        if (data) {
            //   let output = data.filter((v, i) => i !== 0);
            data.forEach((eachElement: any) => {
                allColumn.push(
                    <Column
                        style={{ fontSize: '10px' }}
                        key={eachElement.colname}
                        field={eachElement.colname}
                        header={eachElement.colname}
                    ></Column>
                );
            });
        }
        return allColumn;
    }

    generateFormAreaText(): string {
        const tableData: FormRow[] = this.props.state.app.raisePR?.data ?? []
        let retString: StringBuilder = new StringBuilder();
        tableData?.forEach((eachData: FormRow) => {
            retString.Append("Table Name:" + eachData.tableName)
            retString.AppendLine("exec  update_" + eachData.tableName + " " + this.getQueryValues(eachData) + " " + Object.values(eachData.value)[0])
            retString.AppendLineFormat("------------------------------------------------\n")
        });
        return retString.ToString()
    }

    constructUpdateQuery(): string {
        const changedData: FormRow[] = this.props.state.app.raisePR?.data ?? [];
        let updateQueries: string = "";

        changedData.forEach((eachUpdate: FormRow) => {
            const values = this.getQueryValues(eachUpdate);
            updateQueries = updateQueries.concat("exec update_" + eachUpdate.tableName + " " + values + "," + Object.values(eachUpdate.value)[0] + ";\\n");
        })
        return updateQueries;
    }

    getQueryValues(data: FormRow): (string | number)[] {
        let updatedData = data.value;

        const values = Object.keys(updatedData).filter((v, i) => i !== 0).map(key => {
            if (updatedData[key] == null) {
                return "NULL";
            } else if (updatedData[key] === "") {
                return '\'\'';
            } else if(typeof updatedData[key] == "string"){
                return `'${updatedData[key]}'`;
            } else {
                return updatedData[key];
            }
        });
        return values;
    }

    render(): JSX.Element {
        let isRaisePrBtnEnable = this.props.state.app.jiraDataResponse?.data?.summary;
        return (

            <Modal data-testid="custom-element"
                show={this.props.state.app?.showPrRaisedDialog ?? false}
                onHide={this.props.state.app?.hidePrRaisedDialog}
                aria-labelledby="example-custom-modal-styling-title"
                centered
                size="lg"
                animation
            >
                <Modal.Header data-testid='closeButton' closeButton onClick={() => { this.props.dispatch(hidePrRasiedDialog()) }}>
                    <Modal.Title id="example-custom-modal-styling-title">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col><Form.Label >Jira Number</Form.Label></Col>
                            <Col xs={6}><Form.Control size="sm"
                                data-testid='jira_Number'
                                type="text" placeholder="Enter valid jira Number"
                                onKeyDown={this.handleKeyDown}
                                defaultValue={this.state.jiraNumberTextVal}
                                onChange={e => this.setState({ jiraNumberTextVal: e.target.value })} /></Col>
                            <Col>
                                <Button variant="secondary"
                                    data-testid='loadJira'
                                    size='sm' onClick={() => {
                                        this.props.dispatch(queryForJiraStatus({
                                            jira: this.state.jiraNumberTextVal ?? "",
                                            token: this.props.state.app.login?.token ?? ""
                                        }))
                                    }}>
                                    {!this.props.state.app.isJiraStatusLoading && <ArrowClockwise />}
                                    {this.props.state.app.isJiraStatusLoading &&
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true">
                                        </span>}
                                </Button>
                            </Col>
                        </Row>
                        {/* {this.props.state.app.isValidJira?.data?.summary && */}
                        <Row>   <br></br>
                            <Form>
                                <Form.Group className="mb-3" controlId="jiraDiscrition">
                                    <Form.Label>Jira Summary</Form.Label>
                                    <Form.Control size="sm" as="textarea" disabled rows={3}
                                        value={this.props.state.app.jiraDataResponse?.data?.summary ??
                                            ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="dataChanges">
                                    {/* <DataTable value={this.props.state.app.raisePR?.data?.tableRow}
                                        className="p-datatable-sm"
                                        resizableColumns
                                        showGridlines
                                        tableStyle={{ fontSize: '12px' }}
                                        scrollable
                                        scrollHeight="200px"
                                        selectionMode="single">
                                        {this.generateColumn()}
                                    </DataTable> */}
                                    <Form.Label>Data Changes</Form.Label>
                                    <Form.Control size="sm" as="textarea" rows={4} disabled
                                        value={this.generateFormAreaText() ?? "Change Table Data to update"}
                                    // onChange={e => this.setState({ tableData: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Row>
                        {/* } */}
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid='cancelPR' onClick={() => { this.props.dispatch(hidePrRasiedDialog()) }}>Cancel</Button>
                    {<Button variant="primary" data-testid='rasiePR' disabled={!isRaisePrBtnEnable} onClick={() => { this.props.dispatch(createPullRequest({jira: this.state.jiraNumberTextVal, token: this.props.state.app.login?.token ?? "", query: this.constructUpdateQuery()})) }}>Raise</Button>}
                    {<a hidden={this.props.state.app.createPRlink ? false : true} href={this.props.state.app.createPRlink ?? ""} className="link-primary" target="_blank"> PR link </a>}
                </Modal.Footer>
            </Modal>
        );
    }

}



function mapStateToProps(state: RootState) {
    return { state: state };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PRDialog);
