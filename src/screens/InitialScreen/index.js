import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {ActivityIndicator} from '../../global/components/index';
import {selectLoading, selectToken} from '../../redux/app/app.selectors';
import * as mapDispatchToProps from '../../redux/app/app.actions';
import {AuthContainer, AppContainer} from '../../index';

const Initial = props => {
  const {setLoading, loading, token} = props;

  useEffect(() => {
    // initial load of assets
    // after completion of load set loading to false
    setLoading(false);
  }, [setLoading]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (token) {
    return <AppContainer />;
  }

  return <AuthContainer />;
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  token: selectToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
