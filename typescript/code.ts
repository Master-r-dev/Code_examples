

// invert values of array :  [1,2,3,4] -> [-1,-2,-3,-4] 
export function invert(array: number[]): number[] {
    return array.map( x => -x);
}
//Reverse an array, return the result. Do whatever you want with the original array. Don't use Array.prototype.reverse.You have 47 bytes to spare.
export let reverse=(a:any)=>a.map(a.pop,[...a])


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









  

