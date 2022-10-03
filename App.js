import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Main from './src/Main';
import Detail from './src/detail/Detail';

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/detail" element={<Detail />} />
      </Routes>
    </NativeRouter>
  );
}