import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginSwitch from '../components/LoginSwitch';

/* import {
  onAuthStateChanged,
  logOut,
} from '../config/firebase'; */

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
    const { history } = this.props;
    return (
      <LoginSwitch
        history={history}
      >
        <div style={styles.container}>
          <strong>Salers</strong>
        </div>
      </LoginSwitch>
    );
  }
}

Salers.propTypes = {
  history: PropTypes.object.isRequired,
  setSection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  section: state.section,
});

const mapDispatchToProps = dispatch => ({
  setSection(section) {
    return dispatch(sectionAction(section));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Salers);
