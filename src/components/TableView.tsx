import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/state';
import { Dispatch } from 'redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LoadFormData } from '../actions/AppAction';
import { QueryColData, QueryRowData } from '../actions/Type';
interface Props {
  dispatch: Dispatch;
  state: RootState;
}

interface LocalState {
  tableData?: QueryRowData;
  removeID?: string
}

class TableView extends React.Component<Props, LocalState> {
  constructor(props: Props, localState: LocalState) {
    super(props, localState);

  }

  hideFirtColumn(): QueryRowData[] {
    let data: QueryColData[] = this.props.state.app.selectedTable?.tableData?.columnMetas ?? [];
    let rowdata: QueryRowData[] = this.props.state.app.selectedTable?.tableData?.rows ?? []
    let retRowdata: QueryRowData[] = []
    if (data) {
      let retData = {}
      for (const eachData in rowdata) {
        for (const eachItem in rowdata[eachData]) {
          // if (eachItem === data?.[0]?.name) {
            let eachValue = rowdata[eachData][eachItem];
            if (eachValue && typeof typeof eachValue === 'string') {
              eachValue = eachValue.toString();
              eachValue = eachValue.trim();
            }
            retData = { ...retData, [eachItem]: eachValue }
          // }
        }
        retRowdata.push(retData);
      }
    }
    return retRowdata
  }

  generateColumn(): any {
    const allColumn: any = [];
    let data: QueryColData[] = this.props.state.app.selectedTable?.tableData?.columnMetas ?? [];
    if (data) {
      // let output = data.filter((v, i) => i !== 0);     

      data.forEach((eachElement: QueryColData) => {
        allColumn.push(
          <Column
            
            data-testid="tableview"
            style={{ fontSize: '10px' }}
            key={eachElement.name}
            field={eachElement.name}
            header={eachElement.name}
          ></Column>
        );
      });
    }
    return allColumn;
  }

  render(): JSX.Element {
    return (
      <div className="border border-secondary">
        {this.props.state.app.selectedTable?.tableInfo?.tableLabelText === undefined && 'Select table name from left pane'}
        {/* {(this.props.state.app.selectedTable) && "Selected table: " + this.props.state.app.selectedTable.tableName} */}

        <DataTable
          data-testid="tableview"
          value={this.hideFirtColumn()}
          className="p-datatable-sm"
          resizableColumns
          header={
            this.props.state.app.selectedTable?.tableInfo?.tableLabelText && 'Selected table: ' + this.props.state.app.selectedTable.tableInfo.tableLabelText
          }
          columnResizeMode="expand"
          showGridlines
          tableStyle={{ fontSize: '12px' }}
          scrollable
          loading={this.props.state.app.isTableViewLoading}
          scrollHeight="200px"
          onSelectionChange={(e: any) => {
            this.setState({ tableData: e.value });
            this.props.dispatch(LoadFormData(e.value) ?? '');
          }}
          selectionMode="single"
        >
          {this.generateColumn()}
        </DataTable>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
