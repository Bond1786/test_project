import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux/state';
import { PAGE_TYPE } from '../redux/AppReducer';
import { pageChangeAction } from '../actions/AppAction';

interface Props {
  dispatch: Dispatch;
  state: RootState;
}

class SelectionPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleSelectionChange(pageType: PAGE_TYPE) {
    this.props.dispatch(pageChangeAction(pageType));
  }

  render() {
    return (
      <div className="container-fluid p-3">
        <div className="row g-4">
          <div className="col-4">
            <div className="card" style={{ height: 150 }} onClick={() => this.handleSelectionChange(PAGE_TYPE.EDIT)}>
              <div className="card-body">
                <h5 className="card-title"> Click Here........ for Editor View</h5>
                <div className="card-text">
                  Select to Enter in Edit view.
                  <ul>
                   
                  </ul>
                </div>
                <a href="#" className="stretched-link" />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card" style={{ height: 150 }}>
              <div className="card-body">
                <h5 className="card-title text-muted">Export File</h5>
                <div className="card-text text-muted">
                  <ul>
                    <li>Export .xml format</li>
                    <li>Export .json format</li>
                  </ul>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectionPage);
