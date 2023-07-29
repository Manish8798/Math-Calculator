import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button, Input} from '@rneui/themed';

const CalculatorScreen = props => {
  React.useLayoutEffect(() => {
    props?.navigation.setOptions({
      title: `Calculate ${props?.route?.params?.name}`,
    });
  }, [props?.navigation]);
  const [value, setValue] = React.useState({
    name: props?.route?.params?.name,
    index: props?.route?.params?.index,
  });

  const [inputCount, setInputCount] = React.useState([1, 2]);
  const [inputValues, setInputValues] = React.useState([]);
  const [result, setResult] = React.useState(null);

  const chooseOperation = value => {
    switch (value) {
      case 'HCF':
        return hcfView();

      case 'LCM':
        return lcmView();
    }
  };

  const handleAddMoreInput = type => {
    if (type == 'add') setInputCount([...inputCount, inputCount?.length + 1]);
    else if (inputCount.length > 2) {
      removeItem(inputCount.length - 1);
    }
  };

  const removeItem = indexToRemove => {
    setInputCount(prevItems => {
      // Create a new array excluding the element at the specified index
      const updatedItems = prevItems.filter(
        (item, index) => index !== indexToRemove,
      );
      //   console.log(updatedItems);
      return updatedItems;
    });
  };

  const handleChangeText = (text, index) => {
    let tempArr = inputValues;
    tempArr[index] = text;
    setInputValues(tempArr);
  };

  const handleSolution = inputValues => {
    console.log(inputValues);
    Keyboard.dismiss();
    const filteredArray = inputValues.filter(item => item !== '');
    switch (value?.name) {
      case 'HCF':
        setResult(calculateHCFOfNNumbers(filteredArray));
        console.log(calculateHCFOfNNumbers(filteredArray));
        break;
      case 'LCM':
        setResult(calculateLCM(filteredArray));
        console.log(calculateLCM(filteredArray));
        break;
    }
  };

  const calculateHCF = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Function to calculate the HCF of n numbers
  const calculateHCFOfNNumbers = numbers => {
    let hcf = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      hcf = calculateHCF(hcf, numbers[i]);
    }
    return hcf;
  };

  const hcfView = () => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: '40%',
        }}>
        <View style={styles.btnContainer}>
          <Button
            title={`Add Input`}
            buttonStyle={{
              backgroundColor: '#1B66C9',
              borderRadius: 4,
            }}
            containerStyle={{
              // width: '40%',
              marginHorizontal: 5,
              marginVertical: 1,
              alignSelf: 'center',
            }}
            onPress={() => handleAddMoreInput('add')}
          />
          <Button
            title={`Remove Input`}
            buttonStyle={{
              backgroundColor: '#1B66C9',
              borderRadius: 4,
            }}
            containerStyle={{
              // width: '40%',
              marginHorizontal: 5,
              marginVertical: 1,
              alignSelf: 'center',
            }}
            onPress={() => handleAddMoreInput('sub')}
          />
          <Button
            title={`Answer`}
            buttonStyle={{
              backgroundColor: '#1B66C9',
              borderRadius: 4,
            }}
            containerStyle={{
              // width: '40%',
              marginHorizontal: 5,
              marginVertical: 1,
              alignSelf: 'center',
            }}
            onPress={() => handleSolution(inputValues)}
          />
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.resultText}>Result: {result}</Text>
        </View>
        <ScrollView style={{paddingBottom: '10%'}}>
          {inputCount?.map((val, i) => (
            <Input
              key={i}
              keyboardType="numeric"
              placeholder={`Enter Value ${i + 1}`}
              style={styles.input}
              value={val[i]}
              inputContainerStyle={{borderColor: 'transparent'}}
              onChangeText={text => handleChangeText(text, i)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  function calculateLCM(numbers) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
    }
    return result;
  }

  const lcmView = () => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: '40%',
        }}>
        <View style={styles.btnContainer}>
          <Button
            title={`Add Input`}
            buttonStyle={{
              backgroundColor: '#1B66C9',
              borderRadius: 4,
            }}
            containerStyle={{
              // width: '40%',
              marginHorizontal: 5,
              marginVertical: 1,
              alignSelf: 'center',
            }}
            onPress={() => handleAddMoreInput('add')}
          />
          <Button
            title={`Remove Input`}
            buttonStyle={{
              backgroundColor: '#1B66C9',
              borderRadius: 4,
            }}
            containerStyle={{
              // width: '40%',
              marginHorizontal: 5,
              marginVertical: 1,
              alignSelf: 'center',
            }}
            onPress={() => handleAddMoreInput('sub')}
          />
          <Button
            title={`Answer`}
            buttonStyle={{
              backgroundColor: '#1B66C9',
              borderRadius: 4,
            }}
            containerStyle={{
              // width: '40%',
              marginHorizontal: 5,
              marginVertical: 1,
              alignSelf: 'center',
            }}
            onPress={() => handleSolution(inputValues)}
          />
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.resultText}>Result: {result}</Text>
        </View>
        <ScrollView style={{paddingBottom: '10%'}}>
          {inputCount?.map((val, i) => (
            <Input
              key={i}
              keyboardType="numeric"
              placeholder={`Enter Value ${i + 1}`}
              style={styles.input}
              value={val[i]}
              inputContainerStyle={{borderColor: 'transparent'}}
              onChangeText={text => handleChangeText(text, i)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        {chooseOperation(value?.name)}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  input: {
    borderColor: '#fff',
    color: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#010409',
  },
  resultText: {
    alignSelf: 'center',
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    backgroundColor: '#0B8043',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

export default CalculatorScreen;
