var characters = ["obiwan", "luke", "sidious", "maul"]; //the four main characters' array

//all the main characters' variables
var charImg = ""; //stores image URL
var charName = ""; //stores full name
var charLife = 0; //stores current life points
var charAttack = 0; //stores current attack points
var charId = ""; //stores id from html

//all the enemies' variables
var enemyImg = ""; //stores image URL
var enemyName = ""; //stores full name
var enemyLife = 0; //stores current life points
var enemyAttack = 0; //stores current attack points
var enemyId = ""; //stores id from html


var isCharacterChosen = false;
var isEnemyChosen = false;
var enemyChosen = "";
var enemiesDefeated = 0;
var attackIncrease = 0;

$(document).ready(function () {

    reset();

    var swintro = new Audio('https://ia601703.us.archive.org/15/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.ogg');
    swintro.loop = true;
    swintro.volume = 0.5;

    var swing = new Audio('ls-swing.mp3');

    var enswing = new Audio('ls-swing-2.mp3')
    

    //when any character is clicked
    $("#main-left .characters").click(function () {
        swintro.play();
        //if character has not been chosen already
        if (isCharacterChosen === false) {

            //character has now been chosen
            isCharacterChosen = true;

            //set chosen character image
            charImg = $(this).css('background-image');
            $("#chosen").css('background-image', charImg);

            //set character ID
            charId = $(this).attr('id');

            setCharacterStats();

            $("#main-left td.characters").removeClass('shadow');
            $("#main-right td.characters").addClass('shadow');
            

            setMainCharacter();
        }
    });

    //when any enemy is clicked
    $("#main-right .characters").click(function () {

        //if character has been chosen and enemy has not been chosen
        if (isCharacterChosen === true && isEnemyChosen === false) {

            //enemy has now been chosen
            isEnemyChosen = true;

            //set chosen enemy image
            enemyImg = $(this).css('background-image');
            $("#defender").css('background-image', enemyImg);
            $("#defender").animate({opacity: '1'});

            //set enemy ID
            enemyId = $(this).attr('class');

            setEnemyStats();

            $("#defender").show();
        }
    });

    //when attack button is clicked
    $("#attack").click(function () {

        //if enemy has been chosen
        if (isEnemyChosen) {

            swing.play();

            //enemy's life points reduced by character's attack
            enemyLife -= charAttack;

            //if enemy has not died yet
            if (enemyLife > 0) {

                //character's life points reduced by enemy's attack
                charLife -= enemyAttack;

                setTimeout(function() {
                    enswing.play();
                }, 500);
            }

            checkLife();

            //update character's life points
            $("#character-life").text(charLife);

            //update enemy's life points
            $("#enemy-life").text(enemyLife);

            //character's attack increases
            charAttack += attackIncrease;
        }

    });

    //when restart button is clicked
    $("#restart").click(function () {

        reset(); 
    })
});

//if an enemy has been defeated
function defeatedEnemy() {

    //loop looks for enemy defeated and hides its image by overwriting its classes
    for (var i = 1; i < 4; i++) {
        if ($("#enemy-" + i).hasClass(enemyId)) {
            $("#enemy-" + i).removeClass('shadow');
            $("#enemy-" + i).animate({opacity: '0'});
        }
    }

    //as enemy was defeated, there is no chosen enemy
    isEnemyChosen = false;

    //increase by 1 the number of enemies defeated
    enemiesDefeated++;

}

//checks life status of character and enemy after attacks
function checkLife() {

    //if both are still alive
    if (enemyLife > 0 && charLife > 0) {

        $("#current-char-action").text("You attacked " + enemyName + " for " + charAttack + " damage.");
        $("#current-enemy-action").text(enemyName + " attacked you back for " + enemyAttack + " damage.");
    }

    //if character was defeated
    else if (enemyLife > 0 && charLife <= 0) {

        $("#current-char-action").text("You've been defeated. GAME OVER!");
        isEnemyChosen = false;
        $("#restart").show();
        $("#current-enemy-action").text("");
    }

    //if enemy was defeated
    else if (enemyLife <= 0 && charLife > 0) {
        $("#current-enemy-action").text("");
        defeatedEnemy();
        if (enemiesDefeated === 3) {
            isEnemyChosen = true;
            $("#current-char-action").text("You won! GAME OVER!!");
            $("#current-enemy-action").text("");
            $("#restart").show();
        }
        else {
            $("#current-char-action").text("You have defeated " + enemyName + ", you can choose to fight another enemy.");
            
        }
    }
}

//initialize all variables and UI
function reset() {

    characters = ["obiwan", "luke", "sidious", "maul"];
    charImg = "";
    enemyImg = "";
    charName = "";
    enemyName = "";
    charLife = 0;
    enemyLife = 0;
    charAttack = 0;
    enemyAttack = 0;
    charId = "";
    enemyId = "";
    isCharacterChosen = false;
    isEnemyChosen = false;
    enemyChosen = "";
    enemiesDefeated = "";

    //loop to overwrite enemies' classes which hides enemies' images
    for (var i = 1; i < 4; i++) {
        var en = $("#enemy-" + i);
        en.animate({opacity: '0'});
    }

    setTimeout(function() {
        $(".characters").attr('class', 'characters');
        $("#main-left td.characters").addClass('shadow');
        $("#main-right td.characters").removeClass('shadow');
    }, 200);

    //hide chosen enemy's image and its data
    $("#defender").animate({opacity: '0'}, 0);

    $("#enemy-name").text('');
    $("#enemy-life").text('');

    //delete attack comments
    $("#current-char-action").text("");
    $("#current-enemy-action").text("");

    //hide restart button
    $("#restart").hide();

    $("#character-div").animate({opacity: '0'});
    setTimeout(function() {
        $("#character-div").addClass('hide');
        $("#characters-div").removeClass('hide');
        $("#characters-div").animate({opacity: '1'});
    }, 200);

    $("#defender").hide();

}


function setMainCharacter() {
    $("#characters-div").animate({opacity: '0'});
    setTimeout(function() {
        $("#characters-div").addClass('hide');
        $("#character-div").removeClass('hide');
        $("#character-div").animate({opacity: '1'});
    }, 200);
}

//sets stats depending on character clicked
function setCharacterStats() {
    if (charId === "obiwan") {
        charName = "Obi-Wan Kenobi";
        charLife = 120;
        charAttack = 8;
        attackIncrease = 8;
    }
    else if (charId === "luke") {
        charName = "Luke Skywalker";
        charLife = 100;
        charAttack = 6;
        attackIncrease = 10;
    }
    else if (charId === "sidious") {
        charName = "Darth Sidious";
        charLife = 150;
        charAttack = 10;
        attackIncrease = 6;
    }
    else if (charId === "maul") {
        charName = "Darth Maul";
        charLife = 180;
        charAttack = 12;
        attackIncrease = 4;
    }

    setEnemies();

    //updates stats in UI
    $("#character-name").text(charName);
    $("#character-life").text(charLife);
}

//display enemies' images
function setEnemies() {
    var j = 1;
    var currentChar;

    //loop to find index of character chosen in array
    for (var i = 0; i < characters.length; i++) {
        currentChar = characters.indexOf(charId);
        $("#enemy-" + i).animate({opacity: '1'});
        //if it is not the character chosen, set image
        if (i !== currentChar) {
            $("#enemy-" + j).addClass(characters[i]);
            j++;
        }
    }

    //remove character chosen from array
    characters.splice(currentChar, 1);
}

//sets stats depending on enemy clicked
function setEnemyStats() {
    if (enemyId === "characters obiwan shadow") {
        enemyName = "Obi-Wan Kenobi";
        enemyLife = 120;
        enemyAttack = 10;
    }
    else if (enemyId === "characters luke shadow") {
        enemyName = "Luke Skywalker";
        enemyLife = 100;
        enemyAttack = 5;
    }
    else if (enemyId === "characters sidious shadow") {
        enemyName = "Darth Sidious";
        enemyLife = 150;
        enemyAttack = 20;
    }
    else if (enemyId === "characters maul shadow") {
        enemyName = "Darth Maul";
        enemyLife = 180;
        enemyAttack = 25;
    }

    //updates stats in UI
    $("#enemy-name").text(enemyName);
    $("#enemy-life").text(enemyLife);
}