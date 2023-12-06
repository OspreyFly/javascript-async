//PART 1 Number Facts

function output(str, operation=''){
    const output = document.getElementById("output");
    if (operation == 'add'){
        output.innerHTML += " | " + str;
        console.log(str);
    }
    else{
        output.innerHTML = str;
        console.log(str);
    }   
}

//1
async function numberFact(){
    const res = await axios.get("http://numbersapi.com/random/trivia")
    output(res.data);
}

//2
function numberPair(){
    axios.get("http://numbersapi.com/random/trivia")
    .then((res) => {
        output(res.data);
        return axios.get("http://numbersapi.com/random/trivia")
    })
   .then((res) => {
        output(res.data, 'add');
    })
}

//3
async function fourFacts(){
    const randomNum = Math.floor((Math.random() * 100), 2);
    try{
        const fact1 =  await axios.get(`http://numbersapi.com/${randomNum}/trivia`);
        const fact2 =  await axios.get(`http://numbersapi.com/${randomNum}/trivia`);
        const fact3 =  await axios.get(`http://numbersapi.com/${randomNum}/trivia`);
        const fact4 =  await axios.get(`http://numbersapi.com/${randomNum}/trivia`);

        output(fact1.data);
        output(fact2.data, 'add');
        output(fact3.data, 'add');
        output(fact4.data, 'add');
    }
    catch(e){
        console.log("Function 'fourFacts' failed!", e);
    }
}

//PART 2 Deck of Cards
const cardTable = document.getElementById("table");
const drawBtn = document.getElementById("btn");
let deck_id;

function faceUp(identity) {
    let card = document.createElement('div');
    card.style.border = "1px solid black";
    card.style.textAlign = "center";
    card.style.width = "100px";
    card.style.height = "100px";
    card.style.margin = "20px";
    card.style.display = "inline-block";
    card.innerHTML = identity;
    cardTable.appendChild(card);
}

async function shuffle() {
    try {
        const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        deck_id = res.data.deck_id;
        console.log(deck_id);
    } catch (error) {
        console.error("Error during shuffle:", error.message);
    }
}

async function drawCard(count = 1) {
    try {
        if (!deck_id) {
            await shuffle();
        }

        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`);
        console.log(res.data.cards[0].value);
        console.log(res.data.cards[0].suit);

        let theCard = `<p>${res.data.cards[0].value}</p> <p>${res.data.cards[0].suit}</p>`;
        faceUp(theCard);
    } catch (error) {
        console.error("Error during drawCard:", error.message);
    }
}

drawBtn.addEventListener('click', () => drawCard());






