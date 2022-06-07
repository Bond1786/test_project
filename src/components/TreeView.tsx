import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux/state';
import { Tree } from 'primereact/tree';
import TreeNode from 'primereact/treenode';
import { tableSelectedAction } from '../actions/AppAction';

interface Props {
  dispatch: Dispatch;
  state: RootState;
}

class TreeView extends React.Component<Props> {
  constructor(pros: Props) {
    super(pros);
  }

  render(): JSX.Element {
    return (
      <div
        data-testid="treeview">
        <Tree
          filter
          filterPlaceholder='Search'
          style={{ border: 'white', fontSize: '12px' }}
          // loading={this.props.state.app.isTreeviewLoading ?? false}
          selectionMode="single"
          value= {this.props.state.app?.treeViewData as TreeNode[]}
          onSelect={(e) => {
            const curNode: TreeNode = e.node as TreeNode;
            if (curNode.data && curNode.data.data.tableName) {
              if (this.props.state.app.login && this.props.state.app.login.token) {
                this.props.dispatch(tableSelectedAction(curNode.data.data.tableName,
                  this.props.state.app.login.token, e.node?.label ?? "", curNode.data.data.where
                ));
              }
            }
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);
