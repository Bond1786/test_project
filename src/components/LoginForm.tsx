import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux/state';
import * as DBAPIs from '../actions/Type';
import { LOGIN_MODES, PAGE_TYPE } from '../redux/AppReducer';
import { loginAction, loginModeAction, resetAction } from '../actions/AppAction';
import { Dropdown } from 'primereact/dropdown';
interface Props {
  dispatch: Dispatch;
  state: RootState;
}

interface LocalState {
  dbParam: DBAPIs.DBParam;
}

class LoginForm extends React.Component<Props, LocalState> {
  constructor(props: Props, state: LocalState) {
    super(props);

    this.state = {
      dbParam: this.props.state.app.dbParams
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  login() {
    this.props.dispatch(loginAction({
      database: this.state.dbParam.database,
      dbUrl: this.state.dbParam.dbUrl,
      password: this.state.dbParam.password,
      type: this.state.dbParam.type,
      userName: this.state.dbParam.userName
    }))
  }

  reset() {
    this.props.dispatch(resetAction());
    this.setState({
      dbParam: this.props.state.app.dbParams
    });
  }


  getLoginModes(): JSX.Element[] {
    const allOptionsList: JSX.Element[] = [];
    for (const eachMode in LOGIN_MODES) {
      allOptionsList.push(
        <option className='dropdown-item' key={eachMode} value={eachMode}>
          {eachMode}
        </option>
      );

    }
    return allOptionsList;
  };

  isGuest = (): boolean => {
    return this.props.state.app.loginMode === 'SQL Authentication';
  };

  handleUsernameChange = (e: any) => {
    this.setState({ dbParam: { ...this.state.dbParam, userName: e.target.value } });
  }

  handlePasswordChange(e: any) {
    this.setState({ dbParam: { ...this.state.dbParam, password: e.target.value } });
  }

  handleDatabaseChange(e: any) {
    this.setState({ dbParam: { ...this.state.dbParam, database: e.target.value } });
  }

  handleUrlChange(e: any) {
    this.setState({ dbParam: { ...this.state.dbParam, dbUrl: e.target.value } });
  }

  handleModeChange = (e: { value: string }) => {
    this.props.dispatch(loginModeAction(e.value));
  }

  render() {
    return (
      <div className="card mx-auto shadow" style={{ width: '60%', height: '50%', marginTop: '50px' }}>
        <div className="card-header cardHeader">Login</div>
        <div className="card-body ">
          <div className="mb-3 row justify-content-center">
            <label htmlFor="username" className="col-sm-4 col-form-label">
              Username
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="username"
                data-testid="username"
                readOnly={this.isGuest()}
                value={this.state.dbParam.userName}
                onChange={this.handleUsernameChange}
                disabled={this.props.state.app.isloging}
              />
            </div>
          </div>
          <div className="mb-3 row justify-content-center">
            <label htmlFor="password" className="col-sm-4 col-form-label">
              Password
            </label>
            <div className="col-sm-6">
              <input
                type="password"
                className="form-control"
                id="password"
                data-testid="password"
                readOnly={this.isGuest()}
                value={this.state.dbParam.password}
                onChange={this.handlePasswordChange}
                disabled={this.props.state.app.isloging}
              />
            </div>
          </div>
          <div className="mb-3 row justify-content-center">
            <label htmlFor="database" className="col-sm-4 col-form-label">
              Database
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                readOnly={this.isGuest()}
                id="database"
                data-testid="database"
                value={this.state.dbParam.database}
                onChange={this.handleDatabaseChange}
                disabled={this.props.state.app.isloging}
              />
            </div>
          </div>
          <div className="mb-3 row justify-content-center">
            <label htmlFor="serverUrl" className="col-sm-4 col-form-label">
              Server URL
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                readOnly={this.isGuest()}
                id="serverUrl"
                data-testid="serverUrl"
                value={this.state.dbParam.dbUrl}
                onChange={this.handleUrlChange}
                disabled={this.props.state.app.isloging}
              />
            </div>
          </div>
          <div className="mb-3 row d-flex justify-content-center align-items-center">
            <label htmlFor="authenticationmode" className="col-sm-4 form-label">Authentication Mode</label>
            <div className="col-sm-6"  >
              <select className="select_custom"
                id='authenticationmode'
                key="authenticationmode"
                data-testid="authenticationmode"
                disabled={this.props.state.app.isloging}
                value={this.props.state.app.loginMode}
                onChange={(e) => { this.handleModeChange({ value: e.target.value }) }}
              >{this.getLoginModes()}
              </select>
            </div>
          </div>
          <div className="d-flex flex-row-reverse" style={{ marginRight: "2.5em" }}>
            <div className="p-2">
              {!this.props.state.app.isloging && <button
                type="submit"
                data-testid="loginBtn"
                className="btn btn-primary mb-3 button btn-sm"
                onClick={() =>
                  this.login()
                }
              >
                Login
              </button>} {this.props.state.app.isloging &&
                <button className="btn btn-primary mb-3 button btn-sm" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Login
                </button>
              }
            </div>
            <div className="p-2">
              <button
                type="submit"
                className="btn btn-primary mb-3 button btn-sm"
                disabled={this.props.state.app.isloging}
                onClick={() => this.reset()}
              >
                Reset
              </button>
            </div>

          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
