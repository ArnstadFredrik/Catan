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
  numbers: {
    2: 1,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 0,
    8: 2,
    9: 2,
    10: 2,
    11: 2,
    12: 1
  },
  allNumbers : function () {
    let all = [];
    for (number in this.numbers) {
      for (let i = 0; i < this.numbers[number]; i++) {
        all.push(number)
      }
    }
    return all
  },
  randomNumbers : function () {
    let gameNumbers = []
    let tmpNumber = this.allNumbers()

    for (let i = 0; i < 18; i++) {
      let random = Math.floor(Math.random() * tmpNumber.length)
      gameNumbers.push(tmpNumber[random])
      tmpNumber.splice(random,1)

    }
    this.gameNumbers = gameNumbers
    return gameNumbers
  },
  createBoard : function (boardMap) {
    const board = document.querySelector('.board')
    board.innerHTML = ""
    let desertIndex = boardMap.indexOf('desert')
    let gameNumbers = this.gameNumbers
    gameNumbers.splice(desertIndex,0,'7')

    for (let resource in boardMap) {
      const tile = makeElement('div',"",`${boardMap[resource]} tile`)
      const num = makeElement('p',gameNumbers[resource],`${gameNumbers[resource]} number`)
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

      tile.appendChild(num)
      board.appendChild(tile)
    }
  },
  random: function(i) {
    let random = Math.floor(Math.random() * this.allTiles().length)
    return random
  },
  checkBoard: function(board) {
    let firstLine = []
    let secoundLine = []
    let thirdLine = []
    let fourthLine = []
    let fifthLine = []

    board.splice(0,3).forEach(e => {
      firstLine.push(e)
    })
    board.splice(0,4).forEach(e => {
      secoundLine.push(e)
    })
    board.splice(0,5).forEach(e => {
      thirdLine.push(e)
    })
    board.splice(0,4).forEach(e => {
      fourthLine.push(e)
    })
    board.splice(0,3).forEach(e => {
      fifthLine.push(e)
    })

    console.log("first Line",firstLine);
    console.log("secound Line",secoundLine);
    console.log("third Line",thirdLine);
    console.log("firth Line",fourthLine);
    console.log("fifth Line",fifthLine);

    for (x in firstLine) {
      console.log(firstLine[x]);
      if (firstLine[x] == firstLine[x + 1]) {

      }
    }
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
    this.gameBoard = gameBoard
    return gameBoard
  }
}

const randomizeButton = document.querySelector('.randomBtn')
randomizeButton.addEventListener('click',(e) => {
  e.preventDefault()
  game.randomNumbers()
  game.createBoard(game.randomBoard())
})
