$(document).ready(function() {

    var game = {
        start: false,
        strict: false,
        count: 0,
        possibilities: ['#b1', '#b2', '#b3', '#b4'],
        currentGame: [],
        player: []
    }

    function startGame() {
        clearGame();
    }

    function clearGame() {
        game.currentGame = [];
        game.count = 0;
        addCount();
    }

    function addCount() {
        game.count++;
        $('#count').text(game.count);
        newMove();
    }

    function newMove() {
        game.currentGame.push(game.possibilities[Math.floor(Math.random()*4)]);
        showMoves();
    }

    function showMoves() {
        var i = 0;
        var moves = setInterval(() => {
            playGame(game.currentGame[i]);i
            i++;
            if (i >= game.currentGame.length) {
                clearInterval(moves);
            }
        }, 600);

        
    }

    function playGame(id) {
        $(id).addClass('hover')
        playSound(id);
        setTimeout(() => {
            $(id).removeClass('hover');
        }, 300);
    }


    function playSound(id) {
        var a;
        switch (id) {
            case "b1":
                a = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
                break;
            case "b2":
                a = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
                break;
            case "b3":
                a = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
                break;
            case "b4":
                a = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
                break;
        }
    }


    $('#start-btn').click(() => {
        console.log('start game');
        startGame();
    })








});