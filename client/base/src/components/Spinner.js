import RefreshIndicator from 'material-ui/RefreshIndicator';

import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Spinner = () => {
  return (
    <div style={styles.container}>
      <RefreshIndicator
        size={50}
        left={window.innerWidth / 2}
        top={window.innerHeight / 2}
        loadingColor="#FF9800"
        status="loading"
      />
    </div>
  );
};

export default Spinner;
