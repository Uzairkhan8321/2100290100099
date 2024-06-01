const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 9876;
app.use(cors());
const windowSize = 10;
const numberWindows = {
  pi: [],
  f: [],
  e: [],
  r: [],
  prime: [],
};

const piValue = Math.PI;

const fetchFibonacci = async () => {
  try {
    const response = await axios.get('http://20.244.56.144/test/f');
    return response.data.number;
  } catch (error) {
    console.error('Error fetching Fibonacci number:', error);
    return null;
  }
};

const fetchEven = async () => {
  try {
    const response = await axios.get('http://20.244.56.144/test/e');
    return response.data.number;
  } catch (error) {
    console.error('Error fetching even number:', error);
    return null;
  }
};  

const fetchRandom = async () => {
  try {
    const response = await axios.get('http://20.244.56.144/test/r');
    return response.data.number;
  } catch (error) {
    console.error('Error fetching random number:', error);
    return null;
  }
};

const fetchPrimeNumbers = async () => {
  try {
    const response = await axios.get('http://20.244.56.144/test/primes');
    return response.data.numbers;
  } catch (error) {
    console.error('Error fetching prime numbers:', error);
    return null;
  }
};

const fetchNumber = async (numberId) => {
  switch (numberId) {
    case 'pi':
      return piValue;
    case 'f':
      return await fetchFibonacci();
    case 'e':
      return await fetchEven();
    case 'r':
      return await fetchRandom();
    case 'prime':
      return await fetchPrimeNumbers();
    default:
      return null;
  }
};

const calculateAverage = (numbers) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length).toFixed(2);
};

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  if (!['pi', 'f', 'e', 'r', 'prime'].includes(numberid)) {
    return res.status(400).send('Invalid number ID');
  }

  const newNumber = await fetchNumber(numberid);
  if (newNumber === null) {
    return res.status(500).send('Failed to fetch number');
  }

  const window = numberWindows[numberid];
  const windowPrevState = [...window];

  if (Array.isArray(newNumber)) {
    newNumber.forEach((num) => {
      if (window.length >= windowSize) {
        window.shift(); // Remove the oldest number
      }
      window.push(num);
    });
  } else {
    if (window.length >= windowSize) {
      window.shift(); // Remove the oldest number
    }
    window.push(newNumber);
  }

  const windowCurrState = [...window];
  const avg = calculateAverage(window);

  res.json({
    windowPrevState,
    windowCurrState,
    numbers: windowCurrState,
    avg,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
