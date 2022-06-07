import { Dispatch } from 'redux';
import { RootState } from '../redux/state';
import React from 'react';
import { connect } from 'react-redux';
import { getSelectedPartValueData, loadInitialData, logoutAction, pageChangeAction } from '../actions/AppAction';
import { PAGE_TYPE } from '../redux/AppReducer';
import PRDialog from './PRDialog';
import Loading from './Loading';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Part } from '../actions/PartTypes';

interface Props {
  dispatch: Dispatch;
  state: RootState;
}

interface LocalState {
  showDialog?: boolean
}

class ToolBar extends React.Component<Props, LocalState> {

  constructor(props: Props, localState: LocalState) {
    super(props)
    this.handleComboBoxSelect = this.handleComboBoxSelect.bind(this)
    this.logout = this.logout.bind(this);
    this.state = {
      showDialog: false
    }
  }

  handleComboBoxSelect(e: any) {
    const { target } = e;
    const value = target.value;
    this.props.dispatch(getSelectedPartValueData({ partId: Number(value), token: this.props.state.app.login?.token ?? "" }))
  }

  componentDidMount() {
    this.props.dispatch(loadInitialData(this.props.state.app.login?.token ?? "", this.props.state.app.partSelected ?? "1"));
  }

  logout() {
    this.props.dispatch(logoutAction({ token: this.props.state.app.login?.token ?? "" }));
  }

  generatePartOptions(): any {
    const allOptionsList: any = [];
    if (this.props.state.app.partList) {
      const options: Part[] = this.props.state.app.partList;
      if (options != undefined) {
        options.forEach((element) => {
          allOptionsList.push(
            <option key={element["part_name"]} value={element["part_partdescriptionfileID"]}>
              {element["part_name"]}
            </option>
          );
        });
      }
    }
    return allOptionsList;
  }
  generatePartSelection(): any {
    const partView = [];
    partView.push(
      <select key="partComboBox" defaultValue={this.props.state.app.partSelected} onChange={this.handleComboBoxSelect}
        data-testid="partComboBox"
      >
        {this.generatePartOptions()}
      </select>
    );
    return partView;
  }
  addNewUser() {
    this.props.dispatch(pageChangeAction(PAGE_TYPE.SELECTION));
  }
  items = [
    {
      label: 'Menu',
      icon: 'pi pi-fw pi-file',
      command: () => this.addNewUser(),
    },

    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => this.logout(),
    }
  ];

  render(): JSX.Element {

    const end = <InputText placeholder="Search" type="text" />;
    return (
      <div  >
        <div className="card" data-testid="toolbarmenu" id="toolbarmenu">
          <Menubar model={this.items} end={end} />
        </div>
        {this.props.state.app.showPrRaisedDialog && <PRDialog></PRDialog>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
