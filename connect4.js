class Connect4 {
    constructor(selector){
         this.ROWS = 6;
         this.COLS = 7;
         this.player = 'red';
         this.selector = selector;
         this.createGrid();
         this.setUpEventListeners();
    }

    createGrid = () => {
        const $board = $(this.selector)
        console.log($board)
        for(let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>')
                 .addClass('row')
            $board.append($row ) 
            for(let col = 0; col < this.COLS; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr('data-row', row )
                $row.append($col)
            }
 }    
}

   

    setUpEventListeners = () => {
         const $board = $(this.selector)
         const that = this
         
         let findLastEmptyCell = (col) => {
            const cells = $(`.col[data-col='${col}']`)
            for(let i = cells.length - 1; i >=0; i--) {
                const $cell = $(cells[i])
                if($cell.hasClass('empty')) {
                    return $cell
                }
            }
            return null 
            console.log(cells)
        }

         $board.on('mouseenter', '.col.empty', function() {
             const col = $(this).data('col')
             const $lastEmptyCell = findLastEmptyCell(col)
             $lastEmptyCell.addClass(`next-${that.player}`)
            
         } )

         $board.on('mouseleave', '.col', function() {
             $('.col').removeClass(`next-${that.player}`)
         })

         $board.on('click', '.col.empty', function() {
             const col = $(this).data('col')
             const row = $(this).data('col')
             const $lastEmptyCell = findLastEmptyCell(col)
             $lastEmptyCell.removeClass(`empty next-${that.player}`)
             $lastEmptyCell.addClass(that.player )
             $lastEmptyCell.data('player', that.player)

             const winner = that.checkForWinner(row, col)
             if(winner) {
                  alert(`GAME OVER! Player ${that.player} has won!`)
                  return
             }

             that.player = (that.player === 'red') ? 'black' : 'red'
             $(this).trigger('mouseenter')
         })
    }

    

    checkForWinner = (row, col ) => {
        const that = this

        $getCell = (i, j) => {
            return $(`.col[data-row='${i}'][data-col='${j}']`)
        }

        checkDirection = (direction) => {
             let total = 0
             let i = row + direction.i
             let j = col + direction.j 
             let $next = $getCell(i, j)
             while(i >= 0 && i < that.ROWS && j >= 0 && j < that.COLS && $next.data('player') === that.player)  {
                 total++
                 i += step.i
                 j += step.j
                 $next = $getCell(i, j)
             }
        }

        checkWin = (directionA, directionB) => {
            const total = 1 +
            checkDirection(a)
            checkDirection(b )
            if(total >= 4) {
                return that.player
            } else {
                return null 
            }
        }

        checkVerticals = () => {
            return this.checkWin({i: -1, j: 0}, {i: 1, j: 0} )
       }
         
        return checkVerticals()
    }
}