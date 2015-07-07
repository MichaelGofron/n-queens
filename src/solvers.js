/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {

  var insertRook = function(board, y){
    var rows = board.rows();
    for (var x = 0; x < rows.length; x++){
      rows[y][x] = 1;
      if (board.hasColConflictAt(x)){
        rows[y][x] = 0;
      }else{
        if (y+1 < rows.length){
          insertRook(board,y+1);
        }
        break;
      }
    }
    return board;
  };

  var solution = insertRook(new Board({n:n}),0).rows();

  // generate board, try to insert rook into board
  var rookBoard = new Board({n:n});


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
//
// set a rook in a location in the array
// start at the top and then go through every location
// based on the constraints set place a rook at one of the locations available
// now see what spaces are open and place another rook at that location
// continue until can't put rook down or find solution
// backtrack if can't place rook
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var checkAllStates = function(board, y){
    var rows = board.rows();
    for (var x = 0; x < rows.length; x++){
      rows[y][x] = 1;
      if (!board.hasColConflictAt(x)){
        if (y+1 < rows.length){
          checkAllStates(board,y+1);
        }else{
          solutionCount++;
        }
      }
      rows[y][x] = 0;
    }
  };
  checkAllStates(new Board({n: n}), 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var found = false;

  var findQueen = function(board, y){
    var rows = board.rows();
    for (var x = 0; x < rows.length; x++){
      rows[y][x] = 1;
      if (!(board.hasColConflictAt(x) || board.hasMajorDiagonalConflictAt(x-y) || board.hasMinorDiagonalConflictAt(x + y))){
        if (y+1 < rows.length){
          findQueen(board,y+1);
        }else{
          found = true;
        }
      }
      if (found){
        break;
      }
      rows[y][x] = 0;
    }
    return board;
  };

  var solution = findQueen(new Board({n:n}),0).rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var findAllQueens = function(board, y){
    var rows = board.rows();
    for (var x = 0; x < rows.length; x++){
      rows[y][x] = 1;
      if (!(board.hasColConflictAt(x) || board.hasMajorDiagonalConflictAt(x-y) || board.hasMinorDiagonalConflictAt(x + y))){
        if (y+1 < rows.length){
          findAllQueens(board,y+1);
        }else{
          solutionCount++;
        }
      }
      rows[y][x] = 0;
    }
  };
  if (n === 0) {
    solutionCount = 1;
  } else {
    findAllQueens(new Board({n:n}),0);
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
