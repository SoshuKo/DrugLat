const firstSyllableConsonants = ["m", "p", "pr", "sp", "spr", "b", "br", "f", "fr", "v", "n", "t", "tr", "st", "str", "d", "dr", "c", "cl", "sc", "scl", "s", "sl", "z", "r", "l", "ch", "chr", "sch", "schr", "sh", "shr", "j", "y", "k", "kr", "sk", "skr", "g", "gr", "x", "xr", "w", "'", "q", "gh", "qr", "ghr"];
const otherSyllableConsonants = ["m", "p", "pr", "b", "br", "f", "fr", "v", "n", "t", "tr", "d", "dr", "c", "cl", "s", "sl", "z", "r", "l", "ch", "chr", "sh", "shr", "j", "y", "k", "kr", "g", "gr", "x", "xr", "w", "'", "gh", "qr", "ghr"];
const specialConsonants = ["pr", "br", "fr", "tr", "dr", "cl", "sl", "chr", "shr", "kr", "gr", "xr", "qr", "ghr"];
const maleVowels = ["uy", "u", "oy", "o", "a"];
const femaleVowels = ["i", "ü", "e", "ö", "a"];
const endConsonants = ["m", "p", "b", "f", "v", "n", "t", "d", "c", "s", "z", "l", "ch", "sh", "j", "k", "g", "x", "q", "gh"];
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

    // 一音節目の母音を選択
    let isFemale = random() < 1/2;
    let firstVowel = getRandomElement(isFemale ? femaleVowels : maleVowels);
    word += firstVowel;

    if (random() < 0.2) {
        word += getRandomElement(endConsonants);
    }

    const syllableCount = document.getElementById("syllableCount").value;
    const maxSyllables = syllableCount === "random" ? (random() < 1/2 ? 2 : (random() < 1/5 ? 3 : 1)) : parseInt(syllableCount);

    for (let i = 1; i < maxSyllables; i++) {
        let nextHeadConsonant = getRandomHeadConsonant(false);
        if (nextHeadConsonant === "") {
            nextHeadConsonant = "'";
        }
        word += nextHeadConsonant;

        // 同じ性別の中からランダムに母音を選択
        let nextVowel = getRandomElement(isFemale ? femaleVowels : maleVowels);
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
