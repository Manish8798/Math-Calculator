export const hcfOfNumbers = numbers => {
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
  const ans = calculateHCFOfNNumbers(numbers);
  return ans;
};

export const lcmOfNumbers = numbers => {
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
  const ans = calculateLCM(numbers);
  return ans;
};

export const rationalNumbers = (num1, deno1, num2, deno2, n) => {
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  // Function to find the least common multiple (LCM)
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

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

  const ans = findNRationalNumbersBetweenFractions(num1, deno1, num2, deno2, n);
  return ans;
};
