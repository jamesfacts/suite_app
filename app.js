var x = 0;
var y = 1;
var next;
var n = 10;

for (var i = 0; i < n; i++) {
  next = x + y;
  x = y;
  y = next;
  console.log(x + y);
}
