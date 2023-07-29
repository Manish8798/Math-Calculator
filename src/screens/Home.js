import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';

const Home = props => {
  const types = [
    'HCF',
    'LCM',
    'Rational Numbers',
    'Irrational Numbers',
    'Square Root',
    'Square',
  ];

  const handleCalculations = (name, index) => {
    // console.log('handleCalculations')
    props?.navigation.navigate('CalculatorScreen', {
      name: name,
      index: index,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        {types?.map((val, i) => (
          <Button
            key={i}
            title={`Calculate ${val}`}
            buttonStyle={{
              backgroundColor: '#121D2F',
              borderRadius: 5,
            }}
            containerStyle={{
              width: '80%',
              marginHorizontal: 10,
              marginVertical: 10,
              alignSelf: 'center'
            }}
            onPress={() => handleCalculations(val, i)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Home;
