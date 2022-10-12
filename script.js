
const player = (sign) => {
    const getSign = () => {
        return sign;
    }
    return {getSign};
}

const gameBoard = (()=> {
    let board = ['','','','','','','','',''];
    let gameOver = false;

    const check = () =>{

        if(board[0] !== '' && board[1] !== '' && board[2] !== '' && board[0] === board[1] && board[1] === board[2]) {
            gameOver = true;
            return board[0];
        }

        if(board[3] !== '' && board[4] !== '' && board[5] !== '' && board[3] === board[4] && board[4] === board[5]) {
            gameOver = true;
            return board[3];
        }
        if(board[6] !=='' && board[7] !== '' && board[8] !== '' && board[7] === board[6] && board[7] === board[8]) {
            gameOver = true;
            return board[6];
        }
    
        
        //check colums
        if(board[0] !== '' && board[3] !== '' && board[6] !== '' && board[0] === board[3] && board[3] === board[6]) {
            gameOver = true;
            return board[0];
        }
        if(board[1] !== '' && board[4] !== '' && board[7] !== '' && board[1] === board[4] && board[4] === board[7]) {
            gameOver = true;
            return board[1];}
        if(board[2] !== '' && board[5] !== '' && board[8] !== '' && board[2] === board[5] && board[5]=== board[8]) {
            gameOver = true;
            return board[6];
        }


        //diagonals 
        if(board[0] !== '' && board[4] !== '' && board[8] !== '' && board[0] === board[4] && board[4] === board[8]) {
            gameOver = true;
            return board[0];
        }
        if(board[2] !== '' && board[4] !== '' && board[6] !== '' && board[2] === board[4] && board[4] === board[6]) {
            gameOver = true;
            return board[2];
        }
    
        for(let i = 0; i < 9; i++){
            if(board[i] === '') return 'C';
        }
        
        gameOver = true;
        return 'D';
    }

    const setIndex = (index, sign) =>{
        if(gameOver === false && board[index] === ''){
            board[index] = sign;
            return check();
        }
        else return;
    }

    const reset = ()=>{
        gameOver = false;

        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
        console.log(board);
    }

    const getGameOver = () => {
        return gameOver;
    }
    return {check, setIndex, reset, getGameOver};
})();

const displayController = (() => {
    const tiles = document.querySelectorAll('.tile');
    const textDisplay = document.getElementById('text-display');
    const restartButton = document.getElementById('restart');

    const resetTiles = () => {
        tiles.forEach(tile => {
            tile.textContent = '';
        })
    }

    const restart =()=> {
        textDisplay.textContent = "Player X's turn";
        gameBoard.reset();
        resetTiles();
        controller.resetCurrentPlayer;
    }

    const play =(e) => {
        const gOver = gameBoard.getGameOver();
        const nextPlayerSign = controller.getNextPlayerSign();
        const currentPlayerSign = controller.getCurrentPlayerSign();
        const index = e.target.getAttribute('data-index');

        if(!gOver && e.target.textContent === ''){
            e.target.textContent = currentPlayerSign;
            const status = gameBoard.setIndex(index, currentPlayerSign);

            if(status === 'X' || status === 'O'){
                textDisplay.textContent = `Player ${status} wins`;
            }
            if(status === 'D'){
                textDisplay.textContent = `Draw`;
            }
            if(status === 'C'){
                textDisplay.textContent = `Player ${nextPlayerSign}'s turn`;
            }
        }
    }

    restartButton.addEventListener('click', () => {
        restart();
    });

    tiles.forEach((tile) => {
        tile.addEventListener('click', (e) => {
            play(e);
        })
    })

    return {restart};
})();



const controller = (() => {

    const playerX = player('X');
    const playerO = player('O');
    
    let currentPlayer = playerX;

    const setCurrentPlayer = () =>{
        if(currentPlayer === playerX){
            currentPlayer = playerO;
        }
        else {
            currentPlayer = playerX;
        }
    }

    const getCurrentPlayerSign = () => {
        const sign = currentPlayer.getSign();
        setCurrentPlayer();
        return sign;
   }

   const getNextPlayerSign = () => {
        if(currentPlayer === playerO) {
            return playerX.getSign();
        }
        else{
            
            return playerO.getSign();
        }
   }

   const resetCurrentPlayer = () => {
        currentPlayer = playerX;
   }
   return {setCurrentPlayer, getCurrentPlayerSign, getNextPlayerSign, resetCurrentPlayer};
})();

window.onload =()=>{
    displayController.restart();
}