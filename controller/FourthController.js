const Joi = require('joi');

const validSudoku = (board) => {
  let set = new Set()
  
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
        const value = board[i][j]
        const row = `${value} at row ${i}`
        const column = `${value} at column ${j}`
        const box = `${value} at box ${Math.floor(i/3)}, ${Math.floor(j/3)}`
        
        if (Math.floor(i/3) == 0) {
          console.log(`${box}`)
        }
        // console.log(`${row}, ${column}, ${box}`)
        if (set.has(row) || set.has(column) || set.has(box)) {
            return false
        } else {
            set.add(row)
            set.add(column)
            set.add(box)
        }
    }
  }
  
  return true
}


module.exports = {
  validSudoku
}