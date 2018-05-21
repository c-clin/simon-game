$(document).ready(function() {
    var game = {
        start: false,
        strict: false,
        count: 0,
        possibilities: ['#b1', '#b2', '#b3', '#b4'],
        currentGame: [],
        player: [],
        playerTurn: false
    };

    // start the game
    function startGame() {
        // flash all the buttons before game starts
        for (let id of game.possibilities) {
            flashButtonLights(id);
        }
        setTimeout(() => {
            clearGame();
        }, 800);  
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
        showMoves();
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
        game.playerTurn = true;
    }

    // show effects on ui and add sound
    function playGame(id) {
        $(id).addClass('hover')
        playSound(id);
        setTimeout(() => {
            $(id).removeClass('hover');
        }, 300);
    }

    function flashButtonLights(id) {
        $(id).addClass('hover')
        setTimeout(() => {
            $(id).removeClass('hover');
        }, 300);
    }

    function clearPlayer() {
        game.player = [];
    }

    function playerMoves(id) {
        if (game.playerTurn) {
            game.player.push(id);
            checkPlayerMove(id);
        }
    }

    function checkPlayerMove(id) {
        // if player makes a mistake
        if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
            game.playerTurn = false;
            if (game.strict) {
                // player loses
                $('.button').addClass('animated wobble');
                setTimeout(() => {
                    $('.button').removeClass('animated wobble');
                    for (let id of game.possibilities) {
                        flashButtonLights(id);
                    }
                }, 1200);
                $('#reset-btn').css('display', 'inline-block').addClass('animated tada');
                setTimeout(() => {
                    $('#reset-btn').removeClass('animated tada');
                }, 1000);
            } else {
                $(id).addClass("animated shake");
                console.log('wrong');
                setTimeout(function () {
                    $(id).removeClass("animated shake"); 
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
        let audio;
        switch (id) {
            case "#b1":
                audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
                break;
            case "#b2":
                audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
                break;
            case "#b3":
                audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
                break;
            case "#b4":
                audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
                break;
        }
        audio.play();
    }

    // listens to button clicks
    $('.buttons').click((e) => {
        if (game.playerTurn) {
            if (e.target.id) {
                playerMoves("#" + e.target.id);
            }
        }
    })

    // start the game on click
    $('#start-btn').click(() => {
        game.start = true;
        console.log('start game');
        $('#start-btn').addClass('on-start');
        startGame();
        
        // restarts the game in case player clicks start after game ends
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
            startGame();
        }, 1000);
    })
});
