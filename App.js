import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/reducers/rootReducer';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import {Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import RootRouter from './src/routers/rootRouter';
import firestore from '@react-native-firebase/firestore'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const persistor = persistStore(store);

export default function App() {
  firestore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <RootRouter />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
