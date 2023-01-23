

// invert values of array :  [1,2,3,4] -> [-1,-2,-3,-4] 
export function invert(array: number[]): number[] {
    return array.map( x => -x);
}
//Reverse an array, return the result. Do whatever you want with the original array. Don't use Array.prototype.reverse.You have 47 bytes to spare.
export let reverse=(a:any)=>a.map(a.pop,[...a])

// validate pin 
//ATM machines allow 4 or 6 digit PIN codes and PIN codes cannot contain anything but exactly 4 digits or exactly 6 digits.
export let validatePIN=(pin:string)=> /^(\d{4}|\d{6})$/.test(pin);

 //Write a function that accepts a square matrix (N x N 2D array) and returns the determinant of the matrix.
export function determinant(m:number[][]):number{
    // return the determinant of the matrix passed in
    if (m.length == 0) return 0;
    if (m.length == 1) return m[0][0];
    if (m.length == 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    if (m.length > 2) {
      let ans:number =m.reduce((prev, curr, i, arr) :number => {
        let miniArr:number[][] = arr.slice(0, i).concat(arr.slice(i + 1)).map(item => item.slice(1));
        let  d :number = determinant(miniArr);
        let  sign: number = i % 2 == 0 ? 1 : -1  
        let  r = prev + sign * curr[0] * d
        return r ? r : 0 ;
      }, 0);
      return ans ? ans : 0
    }
    return 0;
  }
  

  /*
Write a function that when given a number >= 0, returns an Array of ascending length subarrays.

pyramid(0) => [ ]
pyramid(1) => [ [1] ]
pyramid(2) => [ [1], [1, 1] ]
pyramid(3) => [ [1], [1, 1], [1, 1, 1] ]  
*/

export function pyramid(n: number) {
  let ar: any[]=[];
  if (n==0) return []
  for (let i: number=0;i<n;i++){
    ar[i]=Array<number>(i+1).fill(1);
  }
   return ar
}


/* my kumite

Define a function that takes in two non-negative integers 
a and b and returns the last decimal digit of a**b
 . Note that a and b may be very large!
*/
export function lastDigit(a:string, b:string): number {  
  if (parseInt(b) === 0) return 1; 
  let seed:number = parseInt(a.slice(-1));
  let exp:number= parseInt(b.slice(-2)) % 4;
  if (exp === 0) exp = 4;  
  return Math.pow(seed, exp) % 10; 
}

// description https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa

export function chooseBestSum(t: number, k: number, ls: number[]): number | null {
  let result: number[] = [];
  let mxx: number=0;
  result.length= k;
  function combine(input: number[], len:number, start:number): void {
    if(len === 0) {
      let s:number=result.reduce((pv, cv) => pv + cv, 0); 
      if (s<=t && s>mxx){
        mxx=s
      }
      return;
    }
    for (let i:number = start; i <= input.length - len; i++) {
      result[result.length - len] = input[i];
      combine(input, len-1, i+1 );
    }
  }
combine(ls, k, 0 );
return mxx ? mxx :null; 
}

//decode_morse('.... . -.--   .--- ..- -.. .')
//should return "HEY JUDE"
//The Morse code table is preloaded for you as a dictionary MORSE_CODE['.--']
import { MORSE_CODE } from './preloaded';
export function decodeMorse(a: string): string {
    return a.trim().split(" ").map(function (m:string):string {return m=="" ? " " : MORSE_CODE[m]} ).join("").replace(/  +/g, ' ');
}

//Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.
//['a','b','c','d','f'] -> 'e'
//['O','Q','R','S'] -> 'P'
export function findMissingLetter(a:string[]):string
{
  const alphabet_u:string[] = ["A","B","C","D","E","F","G","H",
                               "I","J","K","L","M","N","O","P","Q","R","S",
                               "T","U","V","W","X","Y","Z"];
  const alphabet_l:string[] = ["a", "b", "c", "d", "e", "f",
                               "g", "h", "i", "j", "k", "l", "m",
                               "n", "o", "p", "q", "r", "s", "t",
                               "u", "v", "w", "x", "y", "z"];
  let alp:string[]=a[0]==a[0].toUpperCase() ?alphabet_u:alphabet_l;
  let pos=alp.indexOf(a[0]);
  let ans:string='';
  for (let x=1;x<a.length;x++){
      if (a[x]!=alp[pos+x]){
        ans=alp[pos+x];
        break;
      }                
  }
  return ans;
}

/*
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
*/

export function findOutlier(input: number[]): number {
  let even:number[] = input.filter(a=>a%2==0);
  let odd:number[] = input.filter(a=>a%2!==0);
  return even.length == 1? even[0] : odd[0];
}


//Is there an integer k such as : (a ^ p + b ^ (p+1) + c ^(p+2) + d ^ (p+3) + ...) = n * k
//n written as abcd... (a, b, c, d... being digits) 
export function digPow (n: number, p: number):number {
  let digits:number[] = n.toString().split('').map(Number)
  let sum:number = 0;
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
export const likes = (n : string[]) : string => {
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

/*
//Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.
"is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
"4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
""  -->  ""
*/

export function order(words:string):string{
  return words.split(' ').sort((wordA, wordB) => {
      if (wordA.match(/\d+/)![0] > wordB.match(/\d+/)![0]) {
        return 1;
      }
      if (wordA.match(/\d+/)![0] < wordB.match(/\d+/)![0]) {
          return -1;
      }
      return 0;} ).join(' ');
}

//Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.
export function inArray(a1: string[], a2: string[]): string[] {
  let ans:string[]=[];
  for (let i=0;i<a1.length;i++){
    for (let k=0;k<a2.length;k++){
        if(a2[k].indexOf(a1[i])!=-1){
          ans.push(a1[i])
          break;
        }
    }
  }
  return ans.sort();
}




















  

