// Fibonacci
var num1 = 0;
var num2 = 1;
var nextNum;
var totalNum = 10;


for (var i = 0; i < nextNum; i++) {
  nextNum = num1 + num2;
  num1 = num2;
  num2 = nextNum;
  console.log('Fib ' + i + ': ' + nextNum);
}

console.log("Fin");