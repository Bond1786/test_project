import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../redux/state';
import { Dispatch } from 'redux';

interface Props {
    dispatch: Dispatch;
    state: RootState;
}

class Loading extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

    }


    render(): JSX.Element {
        return (
            <Spinner animation="border" role="status" data-testid="loading">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
