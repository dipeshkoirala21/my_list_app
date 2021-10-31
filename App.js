import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from './src/global/components/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import AppContainer from './src/screens/InitialScreen';
import configureStore from './src/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const {store, persistor} = configureStore();

const App = () => {
  const [ready, setReady] = useState(false);

  const loadAsync = async () => {
    setReady(true);
  };

  useEffect(() => {
    loadAsync();
  }, []);

  if (!ready) {
    return <ActivityIndicator />;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
