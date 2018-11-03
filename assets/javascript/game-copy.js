var starWars = {
    character: {
        image: "",
        name: "",
        life: 0,
        attack: 0,
        id: "",
        characters: [
            "obiwan",
            "luke",
            "sidious",
            "maul"],
        isChosen: false
    },
    enemy: {
        image: "",
        name: "",
        life: 0,
        attack: 0,
        id: "",
        isChosen: false,
        chosen: "",
        defeated: 0
    },
    functions: {
        reset: function () {
            starWars.character.characters = ["obiwan", "luke", "sidious", "maul"];
            starWars.character.image = "";
            starWars.enemy.image = "";
            starWars.character.name = "";
            starWars.enemy.name = "";
            starWars.character.life = 0;
            starWars.enemy.life = 0;
            starWars.character.attack = 0;
            starWars.enemy.attack = 0;
            starWars.character.id = "";
            starWars.enemy.id = "";
            starWars.character.isChosen = false;
            starWars.enemy.isChosen = false;
            starWars.enemy.chosen = "";
            starWars.enemy.defeated = "";


            $("#character-div").fadeOut(200);
            setTimeout(function () {
                $("#character-div").addClass('hide');
            }, 300);
            setTimeout(function () {
                $("#characters-div").removeClass('hide');
            }, 300);
            setTimeout(function () {
                $("#characters-div").fadeIn(200);
            }, 300);

            for (var i = 1; i < 4; i++) {
                $("#enemy-" + i).attr('class', 'characters');
            }


            $("#defender").css('background-image', '');
            $("#enemy-name").text('');
            $("#enemy-life").text('');

            $("#current-char-action").text("");
            $("#restart").hide();
            $("#current-enemy-action").text("");

        },

        defeatedEnemy: function () {

            for (var i = 1; i < 4; i++) {
                if ($("#enemy-" + i).hasClass(starWars.enemy.id)) {
                    $("#enemy-" + i).attr('class', 'characters');
                }
            }

            starWars.enemy.isChosen = false;

            starWars.enemy.defeated++;

        },

        checkLife: function () {
            if (starWars.enemy.life > 0 && starWars.character.life > 0) {

                $("#current-char-action").text("You attacked " + starWars.enemy.name + " for " + starWars.character.attack + " damage.");
                $("#current-enemy-action").text(starWars.enemy.name + " attacked you back for " + starWars.enemy.attack + " damage.");
            }
            else if (starWars.enemy.life > 0 && starWars.character.life <= 0) {

                $("#current-char-action").text("You've been defeated. GAME OVER!");
                $("#restart").show();
                $("#current-enemy-action").text("");
            }
            else if (starWars.enemy.life <= 0 && starWars.character.life > 0) {
                $("#current-enemy-action").text("");
                starWars.functions.defeatedEnemy();
                if (starWars.enemy.defeated === 6) {
                    $("#current-char-action").text("You won! GAME OVER!!");
                    $("#current-enemy-action").text("");
                    $("#restart").show();
                }
                else {
                    $("#current-char-action").text("You have defeated " + starWars.enemy.name + ", you can choose to fight another enemy.");
                }
            }
            else if (starWars.enemy.life <= 0 && starWars.character.life <= 0) {
                $("#current-char-action").text("You have defeated " + starWars.enemy.name + ", but you died too.");
                $("#current-enemy-action").text("");
                starWars.functions.defeatedEnemy();
                $("#restart").show();
            }
        },

        setMainCharacter: function () {
            $("#characters-div").fadeOut(200);
            setTimeout(function () {
                $("#characters-div").addClass('hide');
            }, 300);
            setTimeout(function () {
                $("#character-div").removeClass('hide').css('display', 'flex');
            }, 300);
        },



        setCharacterStats: function () {
            if (starWars.character.id === "obiwan") {
                starWars.character.name = "Obi-Wan Kenobi";
                starWars.character.life = 120;
                starWars.character.attack = 8;
            }
            else if (starWars.character.id === "luke") {
                starWars.character.name = "Luke Skywalker";
                starWars.character.life = 100;
                starWars.character.attack = 8;
            }
            else if (starWars.character.id === "sidious") {
                starWars.character.name = "Darth Sidious";
                starWars.character.life = 150;
                starWars.character.attack = 8;
            }
            else if (starWars.character.id === "maul") {
                starWars.character.name = "Darth Maul";
                starWars.character.life = 180;
                starWars.character.attack = 8;
            }

            starWars.functions.setEnemies();

            $("#character-name").text(starWars.character.name);
            $("#character-life").text(starWars.character.life);
        },

        setEnemies: function () {
            var j = 1;
            var currentChar;

            for (var i = 0; i < starWars.character.characters.length; i++) {
                currentChar = starWars.character.characters.indexOf(starWars.character.id);

                if (i !== currentChar) {
                    $("#enemy-" + j).addClass(starWars.character.characters[i]);
                    j++;
                }
            }

            starWars.character.characters.splice(currentChar, 1);
        },

        setEnemyStats: function () {
            if (starWars.enemy.id === "characters obiwan") {
                starWars.enemy.name = "Obi-Wan Kenobi";
                starWars.enemy.life = 120;
                starWars.enemy.attack = 10;
            }
            else if (starWars.enemy.id === "characters luke") {
                starWars.enemy.name = "Luke Skywalker";
                starWars.enemy.life = 100;
                starWars.enemy.attack = 5;
            }
            else if (starWars.enemy.id === "characters sidious") {
                starWars.enemy.name = "Darth Sidious";
                starWars.enemy.life = 150;
                starWars.enemy.attack = 20;
            }
            else if (starWars.enemy.id === "characters maul") {
                starWars.enemy.name = "Darth Maul";
                starWars.enemy.life = 180;
                starWars.enemy.attack = 25;
            }

            $("#enemy-name").text(starWars.enemy.name);
            $("#enemy-life").text(starWars.enemy.life);
        }


    }
}

$(document).ready(function () {

    starWars.functions.reset();

    $("#main-left .characters").click(function () {
        if (starWars.character.isChosen === false) {

            starWars.character.isChosen = true;

            starWars.character.image = $(this).css('background-image');
            $("#chosen").css('background-image', starWars.character.image);

            starWars.character.id = $(this).attr('id');

            starWars.functions.setCharacterStats();

            starWars.functions.setMainCharacter();
        }
    });

    $("#main-right .characters").click(function () {
        if (starWars.character.isChosen === true && starWars.enemy.isChosen === false) {

            starWars.enemy.isChosen = true;

            starWars.enemy.image = $(this).css('background-image');
            $("#defender").css('background-image', starWars.enemy.image);

            starWars.enemy.id = $(this).attr('class');

            starWars.functions.setEnemyStats();
        }
    });

    $("#attack").click(function () {

        if (starWars.enemy.isChosen) {

            starWars.enemy.life -= starWars.character.attack;

            starWars.functions.checkLife();

            starWars.character.life -= starWars.enemy.attack;

            starWars.functions.checkLife();

            $("#character-life").text(starWars.character.life);
            $("#enemy-life").text(starWars.enemy.life);

            starWars.character.attack += 8;
        }

    });

    $("#restart").click(function () {
        starWars.functions.reset();
    })
});


