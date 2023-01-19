<?php

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

  
?>

