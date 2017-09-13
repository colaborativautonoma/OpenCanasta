import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from '../components/PrivateRoute';

import {
  sectionAction,
} from '../actions';

const styles = {
  container: {
    padding: 40,
  },
};

class Salers extends Component {
  componentWillMount() {
    const { setSection } = this.props;
    setSection('salers');
  }

  render() {
    const { history, location } = this.props;
    return (
      <PrivateRoute
        history={history}
        location={location}
      >
        <div style={styles.container}>
          admin: {JSON.stringify(this.props.admin)} <br />
          <strong>Salers</strong>
        </div>
      </PrivateRoute>
    );
  }
}

Salers.propTypes = {
  history: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  setSection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  section: state.section,
  admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
  setSection(section) {
    return dispatch(sectionAction(section));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Salers);
