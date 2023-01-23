<?php
//var_dump($a1);
//// invert values of array :  [1,2,3,4] -> [-1,-2,-3,-4] 
function invert(array $a): array {
    return array_map(function($item) {
        return -$item;
    }, $a);
}


//Write a function that accepts two square matrices (N x N two dimensional arrays), and return the sum of the two. Both matrices being passed into the function will be of size N x N (square), containing only integers.
function matrix_addition(array $a, array $b): array {
    $N=count($a[0]);
    for ($i = 0; $i < $N; $i++)
          for ($j = 0; $j < $N; $j++)
              $c[$i][$j] = $a[$i][$j] +
                           $b[$i][$j];
    return $c;
  }

 //Write a function that accepts a square matrix (N x N 2D array) and returns the determinant of the matrix.
  function determinant(array $m): int {
    $det = 1;
    $result = 1; // Initialize result
    $n=sizeof($m);    
    $t = array_fill(0,$n,0);// temporary array for storing row
    // loop for traversing the diagonal elements
    for ($i = 0; $i < $n; $i++)
    {
        $index = $i; // initialize the index

        // finding the index which has non zero value
        while ($index < $n && $m[$index][$i] == 0)
        {
           $index++;
        }
        if ($index == $n) // all values of column == 0
        {
            continue;
        }
        if ($index != $i)
        {
            // loop for swapping the diagonal element row and index row
            for ($j = 0; $j < $n; $j++)
            {
                [$m[$index][$j], $m[$i][$j]]= [$m[$i][$j], $m[$index][$j]];
            }
            // determinant sign changes when we shift
            // rows go through determinant properties
            $det = $det * pow(-1, $index - $i);
        }

        // storing the values of diagonal row elements
        for ($j = 0; $j < $n; $j++)
        {
            $t[$j] = $m[$i][$j];
        }

        // traversing every row below the diagonal
        // element
        for ($j = $i + 1; $j < $n; $j++)
        {
            if ($t[$i]!=0){
              $dio = $t[$i]; // value of diagonal element
              $next = $m[$j][$i]; // value of next row element

              // traversing every column of row
              // and multiplying to every row
              for ($k = 0; $k < $n; $k++)
              {
                  // multiplying to make the diagonal
                  // element and next row element equal
                  $m[$j][$k] = ($dio * $m[$j][$k]) - ($next * $t[$k]);
              }
              $result = $result * $dio; // Det(kA)=kDet(A);
            }
            
        }
    }

    // multiplying the diagonal values to get Det
    for ($i = 0; $i < $n; $i++)
    {
        $det = $det * $m[$i][$i];
    }
  
    return (string)($det / $result); // Det(kA)/k=Det(A) , 
  //(string) - because rounding effect ( numerical value is passed to JSON and stored in the JSON system and that is where the fault occurs) reduces number by 1
}


/*
Write a function that when given a number >= 0, returns an Array of ascending length subarrays.

pyramid(0) => [ ]
pyramid(1) => [ [1] ]
pyramid(2) => [ [1], [1, 1] ]
pyramid(3) => [ [1], [1, 1], [1, 1, 1] ]  
*/

function pyramid($n) {
    if ($n==0) return [];
    $ar=[];
    for ($i=0;$i<$n;$i++){
      $ar[$i]=array_fill(0,$i+1,1);
    }
     return $ar;
  }

////Given a Sudoku data structure with size NxN, N > 0 and √N == integer, write a method to validate if it has been filled out correctly.

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
function solution(array $list): string
{  
  $n=sizeof($list);
  $ans=array_fill(0,$n,0);
  $ans[0]=$list[0];
  $ans[$n-1]=$list[$n-1];
  //numbers that are less than their borders are dashed
  for ($i=1;$i<$n-1;$i++){ 
    if ($list[$i - 1] == $list[$i] - 1 && $list[$i + 1] == $list[$i] + 1 ){
      $ans[$i]="-";
    } else {
      $ans[$i]= $list[$i];
    }
  }
  $list=$ans;
  //remove stacked dashes
  for ($i=1;$i<$n-1;$i++){
    if ($list[$i] == "-" && $list[$i - 1] == "-"){
      unset($ans[$i]);
    } 
  }
  //format answer
  $ans= implode(",",$ans);
  $ans= str_replace(",-,", "-", $ans);
  return  $ans;
}

/*
* For seconds = 62, your function should return 
    "1 minute and 2 seconds"
* For seconds = 3662, your function should return
    "1 hour, 1 minute and 2 seconds"
*/

function format_duration($seconds) {
    if ($seconds == 0) return "now";
    $tt=["year" =>31536000,"day"=> 86400,"hour"=> 3600,"minute"=> 60,"second"=> 1];
     $res = [];
    //making array of how much years,days,...
      foreach ($tt as $key => $value) {
       if ($seconds >= $tt[$key]) {
        $val = (int)floor($seconds / $tt[$key]);
        $val .=($val > 1 ? " ".$key."s" : " ".$key);
        array_push($res,$val);
        $seconds = $seconds % $tt[$key];
      }
    }
    //formating answer
    if (sizeof($res) > 1){
      $res=implode(", ",$res);
      $res = preg_replace(
              "/,([^,]*)$/",
              " and" . "$1",
              $res);
      return $res;
    }
    else {
      return $res[0];
    }
  }


  function some( $needle, array $haystack ) {
	if ( ! is_array( $haystack ) ) return false;
	foreach ( $haystack as $key => $value ) {
		if ( $value == $needle ) {
			return $key;
		} else if ( is_array( $value ) ) {
			// multi search
			$key_result = some( $needle, $value );
			if ( $key_result !== false ) {
				return $key . '_' . $key_result;
			}
		}
	}

	return false;
}

//Write a function that will solve a 9x9 Sudoku puzzle.
// The function will take one argument consisting of the 2D puzzle array,
// with the value 0 representing an unknown square.


function sudoku(array $m): array {
    while (some( 0,$m )!= false){  //while there is 0 present among values - sudoku isn`t solved
      for ($y=0; $y<9; $y++) {                        
          for ($x=0; $x<9; $x++){
            if ($m[$y][$x]==0) {                  
              $p = [true,true,true,true,true,      
                       true,true,true,true,true];
              for ($i = 0; $i<9; $i++) {              
                $p[$m[$y][$i]] = false;             
                $p[$m[$i][$x]] = false;              
              }
              for ($i=3*floor($x/3); $i<3*(floor($x/3)+1); $i++) {  
                for ($j=3*floor($y/3); $j<3*(floor($y/3)+1); $j++) {
                     $p[$m[$j][$i]] = false; 
                  }
              }
              if (array_reduce( $p,function ($x,$c) { 
                      $l=($c?1:0);
                    return $x+$l;            
                        },0 ) == 1) 
                $m[$y][$x] = some(true,$p);   
              }
            }
          }
      }
  return $m;
}

//Write a function validSolution/ValidateSolution/valid_solution()
// that accepts a 2D array representing a Sudoku board, and returns true if it is a valid solution, or false otherwise.
function all45(array $values) 
{
    foreach ($values as $v) {
        if ($v != 45) {
            return false;
        }
    }

    return true;
}

function valid_solution(array $m): bool {
  $sumh = [0,0,0,0,0,0,0,0,0];
  $sumv = [0,0,0,0,0,0,0,0,0];
  $osums = [[0,0,0],[0,0,0],[0,0,0]];
  for ($i=0;$i<9;$i++){
    for ($j=0;$j<9;$j++){
      $sumh[$i] += $m[$i][$j];
      $sumv[$j] += $m[$i][$j];
      $osums[floor($i/3)][floor($j/3)] += $m[$i][$j];
    }
  }
  for ($i=0;$i<3;$i++) {   
    if (!all45($osums[$i])){
      return false;
    }
  }
  return (all45($sumh) && all45($sumv));
}


// description - https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7
function validate_battlefield(array $f): bool {

  // Check for diagonal collisions
	for ($i = 0; $i < 9; $i++) {
		for ($k = 0; $k < 10; $k++) {
			if ($f[$i][$k]) {
				//  avoid errors on borders
        if($k-1>=0){
				  if ($f[$i + 1][$k - 1]) return false;
        }
        if ($k+1<10){
          if ($f[$i + 1][$k + 1]) return false;
        }
			}
		}
	}
  $ships = [0,4,3,2,1]; // 4 single deck ships, 3 double deck...
	$temp = 0; // temp for ship assembly  
  //Find horizontal ships, count them and remove from the f
	for ($i = 0; $i < 10; $i++) {
		for ($k = 0; $k < 11; $k++) {
			if ( ($f[$i][$k] ?? 0) && !($f[$i - 1][$k] ?? 0) && !($f[$i + 1][$k] ?? 0)   ) {
				$temp++;
				$f[$i][$k] = 0;
			} else if ($temp) {
				$ships[$temp]--;
				$temp = 0;
			}
		}
	}
  
  //Find vertical ships and count them
	for ($k = 0; $k < 10; $k++) {
		for ($i = 0; $i < 11; $i++) {
			if ($f[$i][$k] ?? 0) {
				$temp++;
				$f[$i][$k] = 0;
			} else if ($temp) {
				$ships[$temp]--;
				$temp = 0;
			}
		}
	}

  // If exactly 0 ships left, return true
  for ($k = 0; $k < 5; $k++) {
    if ($ships[$k]!=0) return false;
  }
	return true;
  
}


// description https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa
function chooseBestSum($t, $k, $ls) {
  $mxx=0;
  chooseBestSum2($t, $k, $ls,array_fill(0,$k,1),$mxx,0);
  return  $mxx ? $mxx: null;
}
function chooseBestSum2($t, $k, $ls,$result,&$mxx,$start): void {
  if($k == 0) {
   $s=array_reduce($result,function($pv, $cv) { return $pv + $cv;}, 0); 
   if ($s<=$t && $s>$mxx){
     $mxx=$s;
   }
   return ; 
 }
 for ($i = $start; $i <= sizeof($ls) - $k; $i++) {
   $result[sizeof($result)- $k] = $ls[$i];
   chooseBestSum2($t, $k-1, $ls ,$result,$mxx,$i+1);
 }
}

//Create a function named divisors/Divisors that takes an integer n > 1 and returns an array with all of the integer's divisors(except for 1 and the number itself), from smallest to largest. 

function divisors($i) {
  $a=[];
for ($x=2;$x<$i;$x++){
  if($i%$x==0){
    $a[]=$x;
  }
}
return count($a) ? $a : $i." is prime";
}



//decode_morse('.... . -.--   .--- ..- -.. .')
//should return "HEY JUDE"
//The Morse code table is preloaded for you as a dictionary MORSE_CODE['.--']
define("MORSE_CODE", ['...---... '=>'SOS']);
function decode_morse(string $code): string {
  $code=trim($code);
  $code=explode(" ",$code);
  $code=array_map(function ($v){return $v=="" ? " " : MORSE_CODE[$v] ;},$code);
  $code=join("",$code);
  return preg_replace("/\s+/"," ",$code);
}
//Given the string representations of two integers, return the string representation of the sum of those integers.
function sum_strings($a='0', $b='0') {
  // Your code here
  $c=0;$res='';
  $a=str_split($a);
  $b=str_split($b);
  while (count($a)||count($b)||$c){
    $c+=intval(array_pop($a))+intval(array_pop($b));
    $res= $c % 10 . $res;
    $c = $c > 9;
  }
  return preg_replace('/^0+/', '',$res);
    
}

//uniqueInOrder("AAAABBBCCDAABBB") == {'A', 'B', 'C', 'D', 'A', 'B'}
////uniqueInOrder("ABBCcAD")         == {'A', 'B', 'C', 'c', 'A', 'D'}
//uniqueInOrder([1,2,2,3,3])       == {1,2,3}

function uniqueInOrder($s){  
  if (!is_array($s)) {
    $s=str_split($s);
  }
  if ($s[0] =='' && count($s)==1) return [];
  $x=[];
  $k=false;
  $n=sizeof($s);
  for($i = 0; $i < $n; $i++) {
    for($j = $i; $j < $n; $j++) {
          if ($s[$i]!=$s[$j]){
            $x[]=$s[$i];
            $i=$j-1;
            $k=true;
            break;
          } else{
            $k=false;
          }
      }
      if (!$k){
        $x[]=$s[$i];
        break;
      }
    }
  return $x;
}


//Complete the method/function so that it converts dash/underscore delimited words into camel casing.
// The first word within the output should be capitalized only if the original word was capitalized
//(known as Upper Camel Case, also often referred to as Pascal case).
// The next words should be always capitalized.
function cap($str) {  
  return preg_replace("/^./", strtoupper($str[0]),$str);
}
function toCamelCase($str){
$ans="";
if (!$str){
   return $str;
 }
if (strpos($str, "_")){
  $str=explode("_",$str);    
}
else if (strpos($str, "-")){
  $str=explode("-",$str);
}
foreach ($str as $x => &$val){
    if ($x==0) continue;
    $val=cap($val);
  }
foreach ($str as $x){
  $ans=$ans.$x;
}
return $ans;
}

//toWeirdCase("String"); // => returns "StRiNg"
//toWeirdCase("Weird string case"); // => returns "WeIrD StRiNg CaSe"
function toWeirdCase($str) {
  // TODO
  $str=explode(" ",$str);
  $n=count($str);
  for ($i=0;$i<$n;$i++){
    $str[$i]=str_split($str[$i] );
    $k=count($str[$i]);
     for ($t=0;$t<$k;$t++){       
        if ($t%2==0){
          $str[$i][$t]=strtoupper($str[$i][$t]);
        } else {
          $str[$i][$t]=strtolower($str[$i][$t]);
        }       
    }
    $str[$i]=join("",$str[$i]);
  }
  return join(" ",$str);
}

////Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.
//['a','b','c','d','f'] -> 'e'
//['O','Q','R','S'] -> 'P'
function find_missing_letter(array $a ): string {
  $alphabet_u = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  $alphabet_l = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    if ($a[0]==strtoupper($a[0]) ){
      $alp=$alphabet_u;  
    }
    else{// in lower case
      $alp=$alphabet_l;
    } 
    $pos=array_search($a[0],$alp);
    $n=count($a);
    for ($x=1;$x<$n;$x++){
        if ($a[$x]!=$alp[$pos+$x]){
          return $alp[$pos+$x];
        }                
    }  
}


/*
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
*/

function find($input) {
  $even = array_filter($input,function($a){return ($a%2==0);});
  $odd = array_filter($input,function($a){return ($a%2!=0);});
  return count($even)==1 ? array_shift($even) : array_shift($odd);
}
//Is there an integer k such as : (a ^ p + b ^ (p+1) + c ^(p+2) + d ^ (p+3) + ...) = n * k
//n written as abcd... (a, b, c, d... being digits) 
function digPow($n, $p) {
  $nn=str_split($n);
  $sum=0;
  foreach ($nn as $x){ 
    $sum+=pow($x,$p);
    $p++;
  }
  $k=$sum/$n;
  if(!is_float($k)){
    return $k;
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
function likes( $n ) {
  switch(count($n)){
  case 0:
    return "no one likes this";
    break;
  case 1:
    return $n[0]." likes this";
    break;
  case 2:
    return $n[0]." and ".$n[1]." like this";
    break;
  case 3:
    return $n[0].", ".$n[1]." and ".$n[2]." like this";
    break;
  default:
    return $n[0].", ".$n[1]." and ".(count($n)-2)." others like this";
    break;
 }
}


//Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.
function inArray($a1, $a2) {
  $ans=[];
  $n1=sizeof($a1) ;
  $n2=sizeof($a2) ;
  for ($i=0;$i<$n1;$i++){
    for ($k=0;$k<$n2;$k++){
        if(strpos($a2[$k],$a1[$i])>-1){
          $ans[]=$a1[$i];
          break;
        }
    }
  }
  sort($ans);
  return $ans;
}



















?>

