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
    2: [1,'two'],
    3: [2,'three'],
    4: [2,'four'],
    5: [2,'five'],
    6: [2,'six'],
    7: [0,'seven'],
    8: [2,'eight'],
    9: [2,'nine'],
    10: [2,'ten'],
    11: [2,'eleven'],
    12: [1,'twelve']
  },
  allNumbers : function () {
    let allNumbers = [];
    let allNames = [];
    for (number in this.numbers) {
      for (let i = 0; i < this.numbers[number][0]; i++) {
        allNumbers.push(number)
        allNames.push(this.numbers[number][1])
      }
    }
    let all = {numbers:allNumbers, names: allNames}
    return all
  },
  randomNumbers : function () {
    let gameNumbers = {
      numbers: [],
      names: []
    }
    let tmpNumber = this.allNumbers()


    for (let i = 0; i < 18; i++) {
      let random = Math.floor(Math.random() * tmpNumber.numbers.length)
      gameNumbers.numbers.push(tmpNumber.numbers[random])
      gameNumbers.names.push(tmpNumber.names[random])

      tmpNumber.numbers.splice(random,1)
      tmpNumber.names.splice(random,1)

    }
    this.gameNumbers = gameNumbers
    return gameNumbers
  },
  createBoard : function () {
    // Get board dom ref and empty it
    const board = document.querySelector('.board')
    board.innerHTML = ""

    // check if there is a generated board
    // if not generate it
    if (!this.gameBoard) {
      this.randomBoard()
    }

    // check if there are generated numbers
    // if not generate them
    if (!this.gameNumbers) {
      this.randomNumbers()
    }

    // get the generated random numbers
    let gameNumbers = this.gameNumbers

    // get index of desert tile
    // and add 7, at desert index in numbers
    let desertIndex = this.gameBoard.indexOf('desert')
    gameNumbers.numbers.splice(desertIndex,0,'7')

    // for each tile in board map
    for (let resource in this.gameBoard) {
      // make HTML elements
      const tile = makeElement('div',"",`${this.gameBoard[resource]} tile`)
      const num = makeElement('p',gameNumbers.numbers[resource],`${gameNumbers.names[resource]} number center-self`)
      const circle = makeElement('div','','circle center-self')

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

      circle.appendChild(num)
      tile.appendChild(circle)
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
      // console.log('random number:',random);
      // console.log('game board:',gameBoard.length);
      // console.log('tmpboard:',tmpBoard.length);

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

game.createBoard()
