const firstSyllableConsonants = ["m", "p", "pr", "sp", "spr", "b", "br", "f", "fr", "v", "n", "t", "tr", "st", "str", "d", "dr", "c", "cl", "sc", "scl", "s", "sl", "z", "r", "l", "ch", "chr", "sch", "schr", "sh", "shr", "j", "y", "k", "kr", "sk", "skr", "g", "gr", "x", "xr", "w", ""];
const otherSyllableConsonants = ["m", "p", "pr", "b", "br", "f", "fr", "v", "n", "t", "tr", "d", "dr", "c", "cl", "s", "sl", "z", "r", "l", "ch", "chr", "sh", "shr", "j", "y", "k", "kr", "g", "gr", "x", "xr", "w", ""];
const specialConsonants = ["pr", "br", "fr", "tr", "dr", "cl", "sl", "chr", "shr", "kr", "gr", "xr"];
const maleVowels = ["ï", "u", "ë", "o", "a"];
const femaleVowels = ["i", "ü", "e", "ö", "a"];
const endConsonants = ["m", "p", "b", "f", "v", "n", "t", "d", "c", "s", "z", "l", "ch", "sh", "j", "k", "g", "x"];
const random = Math.random;

function getRandomElement(arr) {
    return arr[Math.floor(random() * arr.length)];
}

function getRandomHeadConsonant(isFirstSyllable) {
    const consonants = isFirstSyllable ? firstSyllableConsonants : otherSyllableConsonants;
    return random() < 1/3 ? getRandomElement(specialConsonants) : getRandomElement(consonants);
}

function generateWord() {
    let word = "";
    let headConsonant = getRandomHeadConsonant(true);
    word += headConsonant;

    let vowels = getRandomElement(random() < 1/2 ? femaleVowels : maleVowels);
    let vowel = getRandomElement(vowels);
    word += vowel;

    if (random() < 0.2) {
        word += getRandomElement(endConsonants);
    }

    const syllableCount = document.getElementById("syllableCount").value;
    const maxSyllables = syllableCount === "random" ? (random() < 1/3 ? 2 : (random() < 1/5 ? 3 : 1)) : parseInt(syllableCount);

    for (let i = 1; i < maxSyllables; i++) {
        let nextHeadConsonant = getRandomHeadConsonant(false);
        if (nextHeadConsonant === "") {
            nextHeadConsonant = "'";
        }
        word += nextHeadConsonant;

        let nextVowel = getRandomElement(vowels);
        word += nextVowel;

        if (random() < 0.2) {
            word += getRandomElement(endConsonants);
        }
    }

    return word;
}

function generateWords() {
    const wordCount = document.getElementById("wordCount").value;
    const generatedWordsDiv = document.getElementById("generatedWords");
    generatedWordsDiv.innerHTML = "";

    for (let i = 0; i < wordCount; i++) {
        let word = generateWord();
        let wordElement = document.createElement("p");
        wordElement.innerText = word;
        generatedWordsDiv.appendChild(wordElement);
    }
}
