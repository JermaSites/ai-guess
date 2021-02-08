var message = document.getElementById("message");
var displayMessage = document.getElementById("displayMessage");
var correct = document.getElementById("result-correct");
var incorrect = document.getElementById("result-incorrect");
var streakIncorrect = document.getElementById("streak-incorrect");
var streakCorrect = document.getElementById("streak-correct");
var correctAnswer;
var streak = 0;

const newMessage = async () => {
    const response = await fetch('http://localhost:5000/api/', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    correctAnswer = myJson.result;
    setTimeout(() => {
        displayMessage.innerHTML = myJson.string;
    }, 250);
    // document.getElementById("twitchChat").innerHTML = (twitchEmoji.parse( myJson.string ), { emojiSize : 'medium' } );
};

function guess (guess) {
    var result;
    console.log(guess);
    if(guess === correctAnswer) {
        result = correct;
    } else {
        result = incorrect;
    }
    result.style.transform = "scale(1)";
    message.style.pointerEvents = "none";
    message.style.opacity = "0";
    newMessage();
    result.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    if(result === correct) {
        streak++;
        streakCorrect.innerHTML = "Current Streak: " + streak;
        setTimeout(() => {
            result.style.transform = "scale(0)";
            message.style.opacity = "1";
            message.style.pointerEvents = "revert";
            setTimeout(() => {
                result.style.transition = "none";
            }, 200);
        }, 500);
    } else {
        streakIncorrect.innerHTML = "Streak: " + streak;
    }
}

function tryAgain () {
    streak = 0;
    incorrect.style.transform = "scale(0)";
    message.style.opacity = "1";
    message.style.pointerEvents = "revert";
    setTimeout(() => {
        incorrect.style.transition = "none";
    }, 200);
}

newMessage();
setTimeout(() => {
    message.style.opacity = "1";
}, 250);
