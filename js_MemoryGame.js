/**
 * Created by itc_user on 6/30/2016.
 */

var genericalCard = null;
var click = true;


//MAKING THE CARDS

var imgArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg"];
imgArray = shuffle(imgArray);
function boardCreate() {

    var board = document.getElementById('board');
    var count = 0;
    for (var i = 0; i < 3; i++) {

        var row = document.createElement('div');
        row.className = "line";
        board.appendChild(row);

        for (var j = 0; j < 4; j++) {
            var card = document.createElement('div');
            card.className = "card";
            var img = document.createElement('img');
            img.src = "./img/" + imgArray[count];
            card.appendChild(img);
            card.addEventListener("click", clickCard);
            row.appendChild(card);
            count++;
        }
    }
}

boardCreate();

// RANDOMIZING THE CARDS

function shuffle(imgArray) {
    for (var i = imgArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = imgArray[i];
        imgArray[i] = imgArray[j];
        imgArray[j] = temp;
    }
    return imgArray;
}

//PLAYING THE GAME

function clickCard(event) {

    //freazing or not the screen 
    if (click === true) {

        //fliping the cards up
        var clickedCard = event.target;
        clickedCard.getElementsByTagName("img")[0].style.display = "inline";

        //chosimg the firts card
        if (genericalCard == null) {
            genericalCard = clickedCard;
        }
        //chossing the second cards
        else {
            if (genericalCard.getElementsByTagName("img")[0].src == clickedCard.getElementsByTagName("img")[0].src) {
                genericalCard = null;
                //if they are not a pair,turn back to the background
            } else {
                click = false;
                setTimeout(function () {
                    clickedCard.getElementsByTagName("img")[0].style.display = "none";
                    genericalCard.getElementsByTagName("img")[0].style.display = "none";
                    genericalCard = null;
                    click = true;
                }, 200);

            }
        }
        // user wins...
        var shownCards = 0;
        var allCards = document.getElementsByTagName("img");

        for (var i = 0; i < allCards.length; i++) {
            if (allCards[i].style.display === "inline") {
                shownCards++;
            }
        }
        if (shownCards === 12) {
            document.getElementById("popup").style.display = "block";
        }
    }
}

