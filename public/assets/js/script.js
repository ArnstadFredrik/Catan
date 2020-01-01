let gdoc
function makeElement(type,body,...cssClasses) {
  let i = document.createElement(type)
  i.innerText = body
  let classes = cssClasses[0].split(' ')
  for (let x of classes) {
    i.classList.add(x)
  }
  return i
}

let game = {
  tiles : {
    field : 4,
    forest : 4,
    pasture : 4,
    mountain : 3,
    hill : 3,
    desert : 1
  },
  allTiles : function () {
    let all = []
    for (resource in this.tiles) {
      for (let i = 0; i < this.tiles[resource]; i++) {
        all.push(resource)
      }
    }
    return all
  },
  createBoard : function (boardMap) {
    const board = document.querySelector('.board')
    board.innerHTML = ""
    for (let resource in boardMap) {
      const tile = makeElement('div',boardMap[resource],`${boardMap[resource]} tile`)
      if (resource <= 2) {
        tile.classList.add('row1')
      }
      else if (resource <= 6) {
        tile.classList.add('row2')
      }
      else if (resource <= 11) {
        tile.classList.add('row3')
      }
      else if (resource <= 15) {
        tile.classList.add('row4')
      }
      else if (resource <= 18) {
        tile.classList.add('row5')
      }
      board.appendChild(tile)
    }
  },
  random: function(i) {
    let random = Math.floor(Math.random() * this.allTiles().length)
    return random
  },
  randomBoard: function () {
    let gameBoard = []
    let tmpBoard = this.allTiles()

    for (let i = 0; i < 19; i++) {
      let random = Math.floor(Math.random() * tmpBoard.length)
      gameBoard.push(tmpBoard[random])
      tmpBoard.splice(random,1)

      //console.log(i);
      console.log('random number:',random);
      console.log('game board:',gameBoard.length);
      console.log('tmpboard:',tmpBoard.length);

    }
    return gameBoard
  }
}

const randomizeButton = document.querySelector('.randomBtn')
randomizeButton.addEventListener('click',(e) => {
  e.preventDefault()
  game.createBoard(game.randomBoard())
})
