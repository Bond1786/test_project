import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../redux/state';
import { Dispatch } from 'redux';
// import { updateTableRowAction } from '../actions/AppAction';
import { QueryRowData } from '../actions/Type';
import { showPrRasiedDialog } from '../actions/AppAction';

interface Props {
  dispatch: Dispatch;
  state: RootState;
}

export type FormRow = {
  //rowId: string;
  tableName: string
  key: string;
  value: QueryRowData;
};

export type FormState = {
  updatedRows: FormRow[];
}

class FormData extends React.Component<Props, FormState> {

  constructor(props: Props, state: FormState) {
    super(props, state);

    this.state = {
      updatedRows: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.removeDuplicateEntries = this.removeDuplicateEntries.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.prRaise = this.prRaise.bind(this);
  }

  handleChange(event: any) {
    let rowKey = event.target.id;
    let rowVal: string = event.target.value;
    let oldValue: string | number = this.props.state.app.formData?.data?.[rowKey] ?? 1

    let formData: QueryRowData = {
      ...this.props.state.app.formData?.data,
      [rowKey]: rowVal
    }
    this.setState(prevState => ({
      updatedRows: [...prevState.updatedRows, {
        tableName: this.props.state.app.selectedTable?.tableInfo?.tableName ?? "",
        key: rowKey + "_" + oldValue, value: formData
      }]
    }))

  }

  removeDuplicateEntries(): FormRow[] {
    let filteredArray: FormRow[] = [...new Map(this.state.updatedRows?.map(item => [item.key, item])).values()];
    this.setState({ updatedRows: filteredArray });
    return filteredArray;
  }

  isDisabled = (): boolean => {
    if (this.props.state.app.raisePR?.data || (this.state.updatedRows && this.state.updatedRows.length > 0)) {
      return false;
    } else {
      return true;
    }
  }

  generateFromData(): any {
    const allColumn: any = [];
    if (this.props.state.app.formData?.data) {
      if (!this.props.state.app.formData.isClear) {
        const formData: QueryRowData = this.props.state.app.formData.data;
        Object.keys(formData).forEach((eachKey: string) => {
          const textValue = formData?.[eachKey] ?? '';
          const isFirstRowData: boolean = (eachKey === this.props.state.app?.selectedTable?.tableData?.columnMetas?.[0].name ?? "")
          allColumn.push(
            <Form.Group as={Row} key={eachKey + textValue} className="mb-3">
              <Form.Label column sm="2">
                {eachKey}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  disabled={isFirstRowData}
                  data-testid={textValue}
                  style={{ fontSize: '12px' }}
                  type="text"
                  id={eachKey}
                  onChange={this.handleChange}
                  onKeyUp={this.removeDuplicateEntries}
                  defaultValue={textValue}
                />
              </Col>
            </Form.Group>
          );
        });
      }
    }

    return allColumn;
  }

  // formTableData() {
  //   let colData: any[] = [];
  //   let rowData: any[] = [];
  //   colData.push({ colname: "Table Name" })
  //   this.state.updatedRows.forEach((eachData: FormRow) => {
  //     colData.push({ colname: eachData.key })
  //     rowData.push({ "Table_Name": eachData.tableName, [eachData.key]:eachData.value })
  //   })

  //   return { tableCol: colData, tableRow: rowData, tableAllData: this.state.updatedRows }
  // }

  prRaise() {
    this.props.dispatch(showPrRasiedDialog(this.state.updatedRows))
  }
  render(): JSX.Element {
    return (
      <div className="formDisplay_container">
        <div className="d-flex bd-highlight border border-secondary">
          <div className="ms-auto p-1 bd-highlight">
            <button type="button" data-testid="update"
              className="btn btn-primary btn-sm"
              disabled={this.isDisabled()}
              onClick={() => this.prRaise()}>
              Update
            </button>
          </div>
        </div>
        <div className="formDisplay border border-secondary p-2 col overflow-auto">
          <Form style={{ fontSize: '12px' }}>{this.generateFromData()}</Form>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormData);