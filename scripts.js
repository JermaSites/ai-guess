const getRandomMessage = async () => {
    const response = await fetch('https://jerma-ai.herokuapp.com/api/', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    return myJson.string;
    // document.getElementById("twitchChat").innerHTML = (twitchEmoji.parse( myJson.string ), { emojiSize : 'medium' } );
};

var message = document.getElementById("message");
var correct = document.getElementById("result-correct");

function guess (guess) {
    console.log(guess);
    correct.style.transform = "scale(1)";
    message.style.opacity = "0";
    message.style.pointerEvents = "none";
    correct.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    setTimeout(() => {
        correct.style.transform = "scale(0)";
        message.style.opacity = "1";
        message.style.pointerEvents = "revert";
        setTimeout(() => {
            correct.style.transition = "none";
        }, 200);
    }, 500);
}