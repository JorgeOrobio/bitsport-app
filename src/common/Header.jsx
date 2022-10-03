import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignContent: 'flex-start',
    
  },
});


const CustomHeader=(props)=> {
  return (
    <View style={styles}>
      <Header  containerStyle={{backgroundColor:'#000', height:100}}  centerComponent={{ text: props.props.header, style: { color: '#fff', fontSize:20 } }}/>
      <StatusBar style="auto" />
    </View>
  );
}


export default CustomHeader;;