
//// invert values of array :  [1,2,3,4] -> [-1,-2,-3,-4] 
function invert(array) {
    return array.map( x => -x);
}
//Reverse an array, return the result. Do whatever you want with the original array. Don't use Array.prototype.reverse.You have 30 bytes to spare.
reverse=a=>a.map(a.pop,[...a])

//given an array arr, you have to return the amount of numbers that are smaller than arr[i] to the right.
function smaller(arr) {
  const smallest = Math.abs(arr.reduce((item, acc) => item < acc ? item : acc))
  const biggest = arr.reduce((item, acc) => item > acc ? item : acc)

  const bigger = 1 + (smallest > biggest ? smallest : biggest)
  const MAX = 2 * bigger
  const bit = new Array(MAX + 10).fill(0)

  const update = (x, counter = 1) => {
      while (x <= MAX) {
          bit[x] += counter
          x += (x & -x)
      }
  }

  const query = (x) => {
      let result = 0

      while (x > 0) {
          result += bit[x]
          x -= (x & -x)
      }

      return result
  }

  for (let i = 0; i < arr.length; ++i)
      update(bigger + arr[i])

  return arr.map(item => {
      update(bigger + item, -1)
      return query(bigger + item - 1)
  })
}
//Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.
function nextSmaller(num) {
  let arr = num.toString().split``.reverse();
  let output = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        let tempArr = arr.splice(j, 1);
        let tempArr2 = arr
          .splice(0, i)
          .sort()
          .reverse();
        tempArr = tempArr.concat(tempArr2);
        output += arr
          .reverse()
          .concat(tempArr)
          .join("");
        return output.length === output.replace(/^0+/, "").length
          ? output * 1
          : -1;
      }
    }
  }
  return -1;
}
//Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits
//If the digits can't be rearranged to form a bigger number, return -1 (531 for example can`t be rearranged to next bigger number)
function nextBigger(n){
  var d = n.toString().split('');
  var p = -1;
  for (var i = d.length-1; i > 0; i--) {
      if (+d[i] > +d[i-1]) {
          p = i-1;
          break;
      }
  }
  if (p == -1) return p;
  var right = d.splice(p);
  var pv = right.splice(0, 1)[0];
  var mm = null, mmi = null;
  for (var i = 0; i < right.length; i++) {
      if (right[i] > pv) {
          if (mm == null || right[i] < mm) {
              mm = right[i];
              mmi = i;
          }
      }
  }

  if (mmi == null) return -1;
  right.splice(mmi, 1);
  right.push(pv);
  right = right.sort();
  var ret = +d.concat([mm]).concat(right).join('');
  return ret < n ? -1 : ret;
}





/*

Your task, is to create a NxN spiral with a given size.

For example, spiral with size 5 should look like this:

00000
....0
000.0
0...0
00000

*/
function spiralize (n) {

    let result = new Array(n); 
    // NxN array of 0
    for (let i = 0; i < result.length; i++) {
      result[i] = new Array(n);
      for (let j = 0; j < result[i].length; j++) {
        result[i][j] = 0;
      }
    }
    //first row
    for (let m = 0; m < result[0].length; m++) {
      result[0][m] = 1;
    }
    
    let sideLength = result[0].length-1,
        steps = 0,
        coords = [result[0].length-1, 1],
        dir = 0;
    //the rest
    while (sideLength > 0) {
      result[coords[1]][coords[0]] = 1;
      steps++;
      
      if (sideLength === 1) break;
  
      if (steps === sideLength) {
        dir++;
        dir = dir > 3 ? 0 : dir;
        steps = 0;
        sideLength = (dir === 0 || dir === 2) ? sideLength-2 : sideLength;
      }
      
      switch(dir) {
        case 0:
          coords[1]++;
          break;
        case 1:
          coords[0]--;
          break;
        case 2:
          coords[1]--;
          break;
        case 3:
          coords[0]++;
          break;
      }
    }
    return result;
  }

 //Write a function that accepts a square matrix (N x N 2D array) and returns the determinant of the matrix.

 function determinant (m){
    // 1 x 1  return value
    if (m.length === 1)  return m[0][0]
    // 2 x 2  return value
    if ((m.length === 2) && (m[0].length === 2)) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }
    // (i % 2 === 0 ? 1 : -1) sign of number
    // j !== i skip the value at the current index    
    return m[0].reduce( (s, n, i) => s + (i % 2 === 0 ? 1 : -1) * n *
    determinant(m.slice(1).map(r => r.filter((_, j) => j !== i))),0 );
    }

//How many ways can you make the sum of a number?
/*
sum(1) // 1
sum(2) // 2  -> 1+1 , 2
sum(3) // 3 -> 1+1+1, 1+2, 3
sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

sum(10) // 42
sum(50) // 204226
sum(80) // 15796476
sum(100) // 190569292
*/
let temp=[]
function sum(n, m = n) {
  if (n == 0) return 1;
  if (n < 0 || m == 0) return 0;
  if (temp[n] && temp[n][m]) return temp[n][m];
  let total = sum(n, m - 1) + sum(n - m, m);
  if (!temp[n]) {
    temp[n] = [];
  }
  temp[n][m] = total;
  return total;
}
// P(n) = 2 * P(n-1) + P(n-2) Your task is to write a method that returns nth Pell number
function pell(n) {
  if (n <= 2)  return BigInt(n);
  a = 1n;b = 2n;c=0n;
  for (let i = 3; i <= n; i++) {
      c = 2n * b + a;
      a = b;
      b = c;
    }
  return BigInt(b);
}
//sum big numbers .Really big
function add(a, b) {
  var res = "",
    c = 0;
  a = a.split("");
  b = b.split("");
  while (a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop();
    res = (c % 10) + res;
    c = c > 9;
  }
  return res;
}
/*
 calculate fib(n) where:

fib(0) := 0
fib(1) := 1
fin(n + 2) := fib(n + 1) + fib(n)
Write an algorithm that can handle n up to 2000000.
*/


function fib (n) {
  if (!n || n === 1) return BigInt(n);
  else if (n < 0) {
    let a = 0n;
    let b = 1n;
    for (let i = 0; i > n; i--)
      [a, b] = [b - a, a];
    return a;
  }
  else if (n % 2) {
    const k = (n + 1) / 2;
    const f1 = fib(k - 1);
    const f2 = fib(k);
    return f2 * f2 + f1 * f1;
  } else {
    const k = n / 2;
    const fk = fib(k);
    return (2n * fib(k - 1) + fk) * fk;
  } 
};


//Complete the solution so that it strips all text that follows any of a set of comment markers passed in. 
//Any whitespace at the end of the line should also be stripped out.
//var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"

function solution(str, m) {
  str = str.split(`\n`);
  len=m.length
  for (let i = 0; i < len; i++) {
    let reg = new RegExp(`\\${m[i]}.+`, "g");
    str = str.map(v => v.replace(reg, "").trim());
  }
  return str.join`\n`;
}

/*
Write a function that when given a number >= 0, returns an Array of ascending length subarrays.

pyramid(0) => [ ]
pyramid(1) => [ [1] ]
pyramid(2) => [ [1], [1, 1] ]
pyramid(3) => [ [1], [1, 1], [1, 1, 1] ]  
*/

function pyramid(a) {
  let ar=[]
if (a==0) return []
for (let i=a;i>0;i--){
  ar.push(Array(i).fill(1))
}
 return ar.reverse()
}

/*
Define a function that takes in two non-negative integers 
a and b and returns the last decimal digit of a**b
 . Note that a and b may be very large!
*/

function lastDigit(a, b) {  
  if (parseInt(b) === 0) return 1; // if exponent is 0, return 1  
  // we only need the final digit of a to determine the result (check math of module division )
  let seed = parseInt(a.slice(-1));
  // at worst, the result of any ending digit rotates through four cases, we need two digits because for module of 4
  let exp = parseInt(b.slice(-2)) % 4;
  if (exp === 0) exp = 4;  // if the exponent is a multiple of 4, we want to use '4', not '0' in our function.
  return Math.pow(seed, exp) % 10; //reduced numbers and can count power
}

/* Valid Parentheses
"()"              =>  true
")(()))"          =>  false
"("               =>  false
"(())((()())())"  =>  true
*/

function validParentheses(a) {
  if (!a[0]) return true
  if (a[0]==")") return false
  else{
    let ok=1;
    for (let i=1;i<a.length;i++){
      if(ok<0) return false
      if (a[i]==")") ok--
      else  ok++
    }
    return ok==0 ? true : false
  }
}

//Write a function that will solve a 9x9 Sudoku puzzle.
// The function will take one argument consisting of the 2D puzzle array,
// with the value 0 representing an unknown square.

function sudoku(input) {
  while (input.some( l => l.some( p => p===0 ) ))  //while there is 0 present among values - sudoku isn`t solved
    for (let y=0; y<9; y++)                         
      for (let x=0; x<9; x++)
        if (input[y][x]===0) {                  
          let p = [true,true,true,true,true,      
                   true,true,true,true,true];
          for (let i = 0; i<9; i++) {              
            p[input[y][i]] = false;             
            p[input[i][x]] = false;              
          }
          // ~~ cuts all fractional digits.
          for (let i=3*~~(x/3); i<3*(~~(x/3)+1); i++)   
            for (let j=3*~~(y/3); j<3*(~~(y/3)+1); j++) 
              p[input[j][i]] = false;                 
          if (p.reduce( (p,c) => p+(c?1:0) ) === 1) 
            input[y][x] = p.indexOf(true);         
        }
  return input;
}

/*
A format for expressing an ordered list of integers 
is to use a comma separated list of either :
  *individual integers
  *or a range of integers denoted by the starting integer 
  separated from the end integer in the range by a dash, '-'. 
  The range includes all integers in the interval including both endpoints.
  It is not considered a range unless it spans at least 3 numbers. 
  For example "12,13,15-17"

range_extraction([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4,
   5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20])
// returns '-10--8,-6,-3-1,3-5,7-11,14,15,17-20'

*/
function range_extraction(list) {
  list = list.map((v, i) =>
    list[i - 1] == v - 1 && list[i + 1] == v + 1 ? "-" : v //numbers that are less than their borders are dashed
  );
  return list
    .filter((v, i) => v != "-" || list[i - 1] != "-") //remove stacked dashes
    .join(",")
    .replace(/,-,/g, "-");
}



/*
* For seconds = 62, your function should return 
    "1 minute and 2 seconds"
* For seconds = 3662, your function should return
    "1 hour, 1 minute and 2 seconds"
*/
function formatDuration(seconds) {
  let time = { year: 31536000,
              day: 86400,
              hour: 3600,
              minute: 60,
              second: 1 },
    res = [];

  if (seconds === 0) return "now";

  for (var key in time) {
    if (seconds >= time[key]) {
      let val = Math.floor(seconds / time[key]);
      res.push((val += val > 1 ? " " + key + "s" : " " + key));
      seconds = seconds % time[key];
    }
  }

  return res.length > 1
    ? res.join(", ").replace(/,([^,]*)$/, " and" + "$1")
    : res[0];
}


// description - https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7
function validateBattlefield(f){
  var hit = (row, col) => (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : f[row][col];
  for (var ships = [10,0,0,0,0], row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      if ( hit(row,col) ) {
        if ( hit(row-1, col-1) || hit(row-1, col+1) ) return false; // Corner is touching
        if ( hit(row-1, col  ) && hit(row  , col-1) ) return false; // Side is touching
        if ( ( f[row][col] += hit(row-1, col) + hit(row, col-1) ) > 4 ) return false; // Ship is too long
        ships[f[row][col]]++; ships[f[row][col] - 1]--;
  } } }
  return [0,4,3,2,1].every((s,i) => s == ships[i]);
}



//Given a Sudoku data structure with size NxN, N > 0 and √N == integer, write a method to validate if it has been filled out correctly.
const Sudoku = function(data) 
{
    let a = data;
    let n=data[0].length;    
    let nr=Math.floor(Math.sqrt(n));
    let b=[];
    let v=[];
  return {
    isValid: function() {
      try{
        if (n==1&& a[0]==1){return true;}else if(n==1&& a[0]!=1) return false
          for (let i=0;i<n;i++){  
            if (a[i].includes(0)) return false;
            unique = [...new Set(a[i])];
            if (i%nr==0 && i!=0 ) v=[];
            if (unique.join()!=a[i].join()) return false;
            for (let j=0;j<n;j++){
              b.push(a[j][i]) ;
              if (j<nr){
                v.push(a[j][i]);
              }
            }     
            unique = [...new Set(b)];
            if (unique.join()!=b.join()) return false;
            b=[]
            unique = [...new Set(v)];
            if (unique.join()!=v.join()) return false;
          }
        return true;
      }catch(e){
        return false;
      }
    }
  }
}; 

// description https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa
function chooseBestSum(t, k, ls) {
  result = [];
  mxx=0;
 result.length = k;
 function combine(input, len, start) {
   if(len === 0) {
     s=result.reduce((pv, cv) => pv + cv, 0); 
     if (s<=t&&s>mxx){
       mxx=s
     }
     return;
   }
   for (let i = start; i <= input.length - len; i++) {
     result[result.length - len] = input[i];
     combine(input, len-1, i+1 );
   }
 }
combine(ls, k, 0 );
return mxx ? mxx :null; 
}








//Create a function named divisors/Divisors that takes an integer n > 1 and returns an array with all of the integer's divisors(except for 1 and the number itself), from smallest to largest. 
function divisors(i) {
  a=[];
  for (let x=2;x<i;x++){
    if(i%x==0){
      a.push(x)
    }
  }
  return a.length ? a : i+" is prime"
};

// description https://www.codewars.com/kata/551f23362ff852e2ab000037
function longestSlideDown (a) {
  for (var i = a.length - 2; i > -1; i--) {
    for (var j = 0; j < a[i].length; j++) {
      a[i][j] += Math.max(a[i + 1][j], a[i + 1][j + 1]);
    }
  }
  return a[0][0];
}

//decode_morse('.... . -.--   .--- ..- -.. .')
//should return "HEY JUDE"
//The Morse code table is preloaded for you as a dictionary MORSE_CODE['.--']
decodeMorse = function(a){   
  return a.trim().split(" ").map(function (m){return m=="" ? " " : MORSE_CODE[m]} ).join("").replace(/  +/g, ' ')
}
//Given the string representations of two integers, return the string representation of the sum of those integers.
function sumStrings(str1,str2) 
  {
    if (str1.length > str2.length)
    {
        [str1,str2]=[str2,str1];
    }
    let str = "";
    let n1 = str1.length, n2 = str2.length;
    str1 = str1.split("").reverse().join("");
    str2 = str2.split("").reverse().join("");     
    let carry = 0;
    for(let i = 0; i < n1; i++)
    {
        let sum = (+str1[i] + +str2[i] + carry);
        str += String.fromCharCode(sum % 10 + '0'.charCodeAt(0));
        carry = Math.floor(sum / 10);
    }
    for(let i = n1; i < n2; i++)
    {
        let sum = (+str2[i] + carry);
        str += String.fromCharCode(sum % 10 +  '0'.charCodeAt(0));
        carry = Math.floor(sum / 10);
    }
    if (carry > 0)   str += String.fromCharCode(carry + '0'.charCodeAt(0));
    str = str.split("").reverse().join("");     
    return str.replace(/^0+(?!$)/g, "");;
}

//uniqueInOrder("AAAABBBCCDAABBB") == {'A', 'B', 'C', 'D', 'A', 'B'}
////uniqueInOrder("ABBCcAD")         == {'A', 'B', 'C', 'c', 'A', 'D'}
//uniqueInOrder([1,2,2,3,3])       == {1,2,3}
var uniqueInOrder=function(s){
  if (s.constructor != Array){
   s.split("");
 }
 let x=[];
 let k=false;
   for(let i = 0; i < s.length; i++) {
     for(let j = i; j < s.length; j++) {
         if (s[i]!=s[j]){
           x.push(s[i]);
           i=j-1;
           k=true;
           break;
         } else{
           k=false;
         }
     }
     if (!k){
       x.push(s[i])
       break;
     }
   }
 return x;
}
//Write a function named first_non_repeating_letter that takes a string input, and returns the first character that is not repeated anywhere in the string.
//For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.

function firstNonRepeatingLetter(s) {
  if (s.length<2){
    return s;
  }
  let a=s.toLowerCase();
  let k=false;
  for (let i=0;i<s.length;i++){    
    for (let x=0;x<s.length;x++){
      if (x==i) continue;
      if (a[i]!=a[x]) {
        k=true;
      }else {
        k=false;
        break;
      }
    }
    if (k) return s[i];
  }
  return ""
}

//Complete the method/function so that it converts dash/underscore delimited words into camel casing.
// The first word within the output should be capitalized only if the original word was capitalized
//(known as Upper Camel Case, also often referred to as Pascal case).
// The next words should be always capitalized.

function cap(str) {
  return str.replace(/^./, str[0].toUpperCase());
}
function toCamelCase(str){
  let ans="";
  if (!str){
    return str;
  }
  if (str.indexOf("_")!=-1){
    str=str.split("_");
  }
  else if (str.indexOf("-")!=-1){
    str=str.split("-");
  }
  for (let x in str){
    if (x==0) continue;
    str[x]=cap(str[x]);
  }
  for (let x in str){
    ans=ans+str[x];
  }
  return ans;
}


//toWeirdCase("String"); // => returns "StRiNg"
//toWeirdCase("Weird string case"); // => returns "WeIrD StRiNg CaSe"
function toWeirdCase(str){
  str=str.split(" ")
  for (let i=0;i<str.length;i++){
    str[i]=str[i].split("")
     for (let t=0;t<str[i].length;t++){       
        if (t%2==0){
          str[i][t]=str[i][t].toUpperCase();
        } else {
          str[i][t]=str[i][t].toLowerCase();
        }       
    }
    str[i]=str[i].join("")
  }
  return str.join(" ");
}


//Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.
//['a','b','c','d','f'] -> 'e'
//['O','Q','R','S'] -> 'P'
const alphabet_u = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const alphabet_l = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
function findMissingLetter(a)
{ 
  let alp= a[0]==a[0].toUpperCase() ? alphabet_u : alphabet_l;
  let pos=alp.indexOf(a[0]);
    for (let x=1;x<a.length;x++){
        if (a[x]!=alp[pos+x]){
          return alp[pos+x];
        }                
    } 
}

/*
Complete the solution so that the function will break up camel casing, using a space between words.

Example
"camelCasing"  =>  "camel Casing"
"identifier"   =>  "identifier"
""             =>  "" 
*/ 
function solution(s) {
  if (!s){
    return ""
  }
let l=s.length;
for (let i=0;i<l;i++){
  if(s[i]==s[i].toUpperCase() && s[i]!=" "){
    s=s.substring(0,i)+" "+s.substring(i);
    i++;l++;
  }
}
return s
}

/*
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
*/

function findOutlier(input){
  let even = input.filter(a=>a%2==0);
  let odd = input.filter(a=>a%2!==0);
  return even.length == 1? even[0] : odd[0];
}


//Is there an integer k such as : (a ^ p + b ^ (p+1) + c ^(p+2) + d ^ (p+3) + ...) = n * k
//n written as abcd... (a, b, c, d... being digits) 
function digPow(n, p){
  var digits = n.toString().split('').map(Number)
  let sum=0;
  for (let x in digits){ 
    sum+=Math.pow(digits[x],p);
    p++;
  }
    let k=sum/n;
    if(Number.isInteger(k)){
      return k;
    }
    else{
     return -1;
    }
  }

/*
[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"

*/

function likes(n){
  switch(n.length){
    case 0:
      return "no one likes this";
      break;
    case 1:
      return n[0]+" likes this";
      break;
    case 2:
      return n[0]+" and "+n[1]+" like this";
      break;
    case 3:
      return n[0]+", "+n[1]+" and "+n[2]+" like this";
      break;
    default:
      return n[0]+", "+n[1]+" and "+(n.length-2)+" others like this";
      break;
   }
}


//Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.
function inArray(a1,a2){
  let ans=[]
  for (let i=0;i<a1.length;i++){
    for (let k=0;k<a2.length;k++){
        if(a2[k].indexOf(a1[i])!=-1){
          ans.push(a1[i])
          break;
        }
    }
  }
  return ans.sort()
}







































