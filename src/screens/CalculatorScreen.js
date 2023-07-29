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
  const [inputRationalNum1, setInputRationalNum1] = React.useState({
    num1: null,
    deno1: null,
  });
  const [inputRationalNum2, setInputRationalNum2] = React.useState({
    num2: null,
    deno2: null,
  });

  const chooseOperation = value => {
    switch (value) {
      case 'HCF':
        return hcfView();

      case 'LCM':
        return lcmView();

      case 'Rational Numbers':
        return rationalNumberView();
    }
  };

  const rationalNumberView = () => {
    return (
      <View style={{marginTop: 20, paddingHorizontal: 10}}>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <Input
              inputContainerStyle={{borderColor: 'transparent'}}
              style={styles.input}
              placeholder="numerator 1"
              value={inputRationalNum1.num1}
              keyboardType="numeric"
              onChangeText={text => handleChangeText(text, null, 'num1')}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              inputContainerStyle={{borderColor: 'transparent'}}
              style={styles.input}
              placeholder="denominator 1"
              value={inputRationalNum1.deno1}
              keyboardType="numeric"
              onChangeText={text => handleChangeText(text, null, 'deno1')}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <Input
              inputContainerStyle={{borderColor: 'transparent'}}
              style={styles.input}
              placeholder="numerator 2"
              value={inputRationalNum2.num2}
              keyboardType="numeric"
              onChangeText={text => handleChangeText(text, null, 'num2')}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              inputContainerStyle={{borderColor: 'transparent'}}
              style={styles.input}
              placeholder="denominator 2"
              value={inputRationalNum2.deno2}
              keyboardType="numeric"
              onChangeText={text => handleChangeText(text, null, 'deno2')}
            />
          </View>
        </View>
        <Button
          title={`Answer`}
          buttonStyle={{
            backgroundColor: '#1B66C9',
            borderRadius: 4,
          }}
          containerStyle={{
            width: '50%',
            marginHorizontal: 5,
            marginBottom: 20,
            alignSelf: 'center',
          }}
          onPress={() => handleSolution()}
        />
        <Text style={styles.resultText}>Result: {result}</Text>
      </View>
    );
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

  const handleChangeText = (text, index, type) => {
    console.log(text, index, type);
    switch (type) {
      case 'hcf':
        let tempArr = inputValues;
        tempArr[index] = text;
        setInputValues(tempArr);
        break;

      case 'lcm':
        let tempArrLcm = inputValues;
        tempArrLcm[index] = text;
        setInputValues(tempArrLcm);
        break;

      case 'num1':
        setInputRationalNum1({
          num1: text,
          deno1: inputRationalNum1.deno1,
        });
        break;

      case 'deno1':
        setInputRationalNum1({
          num1: inputRationalNum1.num1,
          deno1: text,
        });
        break;

      case 'num2':
        setInputRationalNum2({
          num2: text,
          deno2: inputRationalNum2.deno2,
        });
        break;

      case 'deno2':
        setInputRationalNum2({
          num2: inputRationalNum2.num2,
          deno2: text,
        });
        break;
    }
  };

  // function gcd(a, b) {
  //   if (b === 0) return a;
  //   return gcd(b, a % b);
  // }

  // // Function to find the least common multiple (LCM)
  // function lcm(a, b) {
  //   return (a * b) / gcd(a, b);
  // }

  // Function to find n rational numbers between two fractions (numeratorA/denominatorA and numeratorB/denominatorB)
  function findNRationalNumbersBetweenFractions(
    numeratorA,
    denominatorA,
    numeratorB,
    denominatorB,
    n,
  ) {
    if (numeratorA / denominatorA >= numeratorB / denominatorB) {
      console.error(
        'Invalid input: the first fraction should be less than the second fraction.',
      );
      return [];
    }

    const commonDenominator = lcm(denominatorA, denominatorB);
    const stepNumerator = (numeratorB - numeratorA) / (n + 1);
    const rationalNumbers = [];

    for (let i = 1; i <= n; i++) {
      const numerator = numeratorA + stepNumerator * i;
      const denominator = commonDenominator;
      rationalNumbers.push([numerator, denominator]);
    }

    return rationalNumbers;
  }

  const handleSolution = inputValues => {
    console.log(inputValues);
    Keyboard.dismiss();
    const filteredArray = inputValues?.filter(item => item !== '');
    switch (value?.name) {
      case 'HCF':
        setResult(calculateHCFOfNNumbers(filteredArray));
        console.log(calculateHCFOfNNumbers(filteredArray));
        break;
      case 'LCM':
        setResult(calculateLCM(filteredArray));
        console.log(calculateLCM(filteredArray));
        break;
      case 'Rational Numbers':
        const {num1, deno1} = inputRationalNum1;
        const {num2, deno2} = inputRationalNum2;
        setResult(
          `Rational numbers between, ${num1}/${deno1}, and, ${num2}/${deno2}, are: ${findNRationalNumbersBetweenFractions(
            num1,
            deno1,
            num2,
            deno2,
            5,
          )}`,
        );
        console.log(
          findNRationalNumbersBetweenFractions(num1, deno1, num2, deno2, 5),
        );
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
              onChangeText={text => handleChangeText(text, i, 'hcf')}
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
              onChangeText={text => handleChangeText(text, i, 'lcm')}
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
  inputContainer: {
    flexDirection: 'row', // Align children components horizontally
    justifyContent: 'center', // Center the children components along the horizontal axis
    paddingHorizontal: 10,
  },
  inputView: {
    flex: 1, // This allows the inputs to take equal width
  },
});

export default CalculatorScreen;
