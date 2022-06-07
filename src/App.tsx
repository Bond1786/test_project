
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoginForm from './components/LoginForm';
import SelectionPage from './components/SelectionPage';
import ToolBar from './components/ToolBar';
import { PAGE_TYPE } from './redux/AppReducer';
import { RootState } from './redux/state';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import TableView from './components/TableView';
import FormData from './components/FormData';
import TreeListView from './components/TreeView';
import { getVersions } from './actions/AppAction';

interface Props {
  dispatch: Dispatch;
  state: RootState;
}

class App extends React.Component<Props> {

  componentDidMount() {
    this.props.dispatch(getVersions());
  }

  render(): JSX.Element {
    return (
      <div className="container-fluid" data-testid="udeApp">
        {this.props.state.app.currentPage === PAGE_TYPE.SELECTION && <SelectionPage></SelectionPage>}
        {this.props.state.app.currentPage === PAGE_TYPE.LOGIN && <LoginForm></LoginForm>}
        {this.props.state.app.currentPage === PAGE_TYPE.EDIT && (
          <div>
            {' '}
            <ToolBar></ToolBar>
            <Splitter>
              <SplitterPanel size={1} className="p-d-flex p-ai-center p-jc-center">
                <div className="tableListView border border-secondary overflow-auto">
                  <TreeListView></TreeListView>
                </div>
              </SplitterPanel>
              <SplitterPanel>
                <Splitter layout="vertical">
                  <SplitterPanel>
                    <TableView></TableView>
                  </SplitterPanel>
                  <SplitterPanel>
                    <FormData />
                  </SplitterPanel>
                </Splitter>
              </SplitterPanel>
            </Splitter>
          </div>
        )}
        <div className="row fixed-bottom">
          {this.props.state.app.login?.isSucessfull && (
            <div className='d-flex justify-content-between border-secondary notification' style={{ backgroundColor: "#84BE6A", color: "azure" }}>
              <div>Status: Connected</div>
              <div>Version: [ server:{this.props.state.app.versionData?.serverVersion}, client: {this.props.state.app.versionData?.clientVersion} ]</div>
            </div>
          )}
          {!this.props.state.app.login?.isSucessfull && (
            <div className='d-flex justify-content-between border-secondary notification' style={{ backgroundColor: "#F75D59", color: "azure" }}>
              <div>Status: Disconnected</div>
              <div>Version: [ server:{this.props.state.app.versionData?.serverVersion}, client: {this.props.state.app.versionData?.clientVersion} ]</div>
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
