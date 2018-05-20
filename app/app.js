$(document).ready(function() {

    var game = {
        start: false,
        strict: false,
        count: 0,
        possibilities: ['b1', 'b2', 'b3', 'b4'],
        currentGame: [],
        player: [],
        playerTurn: false
    }

    // start the game
    function startGame() {
        clearGame();
    }

    // initialize the variables
    function clearGame() {
        game.currentGame = [];
        game.count = 0;
        addCount();
    }

    // count the number of moves
    function addCount() {
        game.count++;
        $("#count").text(game.count);
        $("#count").addClass('animated bounce');
        setTimeout(() => {
            $('#count').removeClass('animated bounce');
        }, 800);
        newMove();
    }

    // randomly selects a id from the possibilities array
    function newMove() {
        game.currentGame.push(game.possibilities[Math.floor(Math.random()*4)]);
        console.log('current game: ' + game.currentGame);
        showMoves();
        game.playerTurn = true;
    }

    // show the next move on the UI
    function showMoves() {
        game.playerTurn = false;
        var i = 0;
        var moves = setInterval(() => {
            playGame(game.currentGame[i]);
            i++;
            if (i >= game.currentGame.length) {
                clearInterval(moves);
            }
        }, 600);
        clearPlayer();
        console.log('before change ' + game.playerTurn);
        game.playerTurn = true;
        console.log("after change " + game.playerTurn);
    }

    function playGame(id) {
        $(`#${id}`).addClass('hover')
        playSound(id);
        setTimeout(() => {
            $(`#${id}`).removeClass('hover');
        }, 300);
    }

    function clearPlayer() {
        game.player = [];
    }

    function playerMoves(id) {
        console.log('player move ' + game.playerTurn);
        if (game.playerTurn == true) {
            game.player.push(id);
            checkPlayerMove(id);
        }
        console.log('player moves: ' + game.player);
        
    }

    function checkPlayerMove(id) {
        // if player makes a mistake
        if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
            game.playerTurn = false;
            if (game.strict) {
                $('.button').addClass('animated swing');
                console.log('you lose, start over');
                setTimeout(() => {
                    $('.button').removeClass('animated swing');
                }, 1200);
                $('#reset-btn').css('display', 'inline-block').addClass('animated tada');
                setTimeout(() => {
                    $('#reset-btn').removeClass('animated tada');
                }, 1000);
            } else {
                $(`#${id}`).addClass("animated shake");
                console.log('wrong, try again');
                setTimeout(function () {
                    $(`#${id}`).removeClass("animated shake"); 
                    showMoves();
                }, 1000);     
                
            }
        } else { // if player makes the correct move
            console.log('correct!');
            playSound(id);
            let check = game.player.length === game.currentGame.length;
            if (check) {
                setTimeout(() => {
                    addCount();
                    clearPlayer();
                }, 800);    
            }
        }
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
        a.play();
    }

    // listens to button clicks
    $('.buttons').click((e) => {
        playerMoves(e.target.id);
    })

    // start the game on click
    $('#start-btn').click(() => {
        console.log('start game');
        startGame();
        $('#reset-btn').addClass('animated fadeOut');
        setTimeout(() => {
            $('#reset-btn').removeClass('animated fadeOut').css('display', 'none');
        }, 1000);
    })

    // listens to strict button click
    $('#strict-btn').click(() => {
        game.strict = !game.strict;
        $("#strict-btn").toggleClass("on-strict");
        console.log('strict mode: ' + game.strict);
    })

    // listens to play again button click
    $('#reset-btn').click(() => {
        $('#reset-btn').addClass('animated fadeOut');
        setTimeout(() => {
            $('#reset-btn').removeClass('animated fadeOut').css('display', 'none');
        }, 1000);
    })








});