// You must RETURN your result in each function!

function printNums(nums) {
  // Using .forEach, add each number in the nums array to a new array.
  // nums => [1,2,3,4]
  const newArray = []
  nums.forEach((num, index) => {
    newArray[index] = num
  })
  return newArray
}

function returnSums(nums) {
  // Using .forEach, push the sum of n plus the index to a new array and return the new array
  // nums => [1,2,3,4,5]
  const result = []
  nums.forEach((num, index) => {
    result[index] = num + index
  })
  return result
}

function returnTotal(objs) {
  // Using .forEach, return a number that is the total sum of all numbers in the array of objects
  // The key for each object will be n
  // objs => [ { n : 1 } ]
  let total = 0
  objs.forEach((obj) => {
    total += obj.n
  })
  return total
}

function printMoney(decimals) {
  // Using .map, return an array of decimals formatted as dollars
  // Example:
  // {
  //   input: [12.34, 9.99],
  //   output: ['$12.34', '$9.99']
  // }
  // Hint: Not all decimals have two places, make sure to return each decimal with the proper decimal places. .toFixed may be useful
  // decimals => [2.30, 2.40, 32.99]
  const formattedMoney = decimals.map((num) => "$" + num.toFixed(2))
  return formattedMoney
}

function returnAllTrueValues(values) {
  // Using .filter, return an array of objects where happy equals true
  // values => [{name: 'Joe', happy:false}]
  const trueValues = values.filter((obj) => obj.happy === true)
  return trueValues
}

function addTwo(nums) {
  // Using .reduce, add 2 to each number in the array then return the sum of all numbers
  // nums => [1,2,3,4]
  const sum = nums.reduce((acc, num) => acc + (num + 2), 0)
}

function joinStrings(strings) {
  // Using .reduce, return a new string containing each string from the original array.
  // strings => ['g', 'f', 'z']
  const joinStrings = strings.reduce((acc, str) => acc + str, "")
  return joinStrings
}

// BONUS

function sortObjectsByValue(objs) {
  // Using .sort, sort the array of objects by the value key in ascending order
  // You may need to look up how to use .sort!
  // .sort documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  // objs => [{value: 1}, {value:2}, {value:23}]
}

// DO NOT TOUCH
module.exports = {
  printNums,
  returnSums,
  returnTotal,
  printMoney,
  returnAllTrueValues,
  sortObjectsByValue,
  addTwo,
  joinStrings,
}
// DO NOT TOUCH
