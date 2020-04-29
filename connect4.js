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
             const $lastEmptyCell = findLastEmptyCell(col)
             $lastEmptyCell.removeClass(`empty next-${that.player}`)
             $lastEmptyCell.addClass(that.player )
             that.player = (that.player === 'red') ? 'black' : 'red'
             $(this).trigger('mouseenter')
         })
    }
}