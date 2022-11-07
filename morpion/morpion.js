let nombreCoup;
let emplacement;
let gagnant; // on initialise des variables
let table = document.getElementById("center"); // on recupere l'id center
let cells = table.getElementsByTagName("td");  // on recupere tous element td

window.addEventListener('load', (event) => { // on ajoute un evenement au chargement de la page qui utilise la fonction initialisation
    initialisation();
}); 

function initialisation() { // fonction initialisation qui vide le morpion, cache le bouton rejouer et modifie le titre pour ecrire Super Morpion
    document.getElementById("rejouer").style.display = "none";
    document.getElementById("titre").textContent = "Super Morpion";
     nombreCoup = 0; // reinitialise le nombre de coup
     emplacement = {
        Zonea1: "vide",
        Zonea2: "vide",
        Zonea3: "vide",
        Zoneb1: "vide",
        Zoneb2: "vide",
        Zoneb3: "vide",
        Zonec1: "vide",
        Zonec2: "vide",
        Zonec3: "vide"
    };
    for (let i = 0; i < cells.length; i++) { // passe de tout le tableau pour placer l'image du morpion sur la partie blanche 
        let cell = cells[i];
        cell.style.backgroundPosition = "left";
        cell.style.pointerEvents = 'auto';
    }
}

function jouer(zone) { // fonction pour jouer au jeu qui va s'executer a chaque click sur un case de jeu
    if (nombreCoup % 2 === 1) { //verify si c'est le tour des croix ou des ronds
        document.getElementById(zone).style.backgroundPosition = "center";
        emplacement[zone] = "croix";
    } else {
        document.getElementById(zone).style.backgroundPosition = "right";
        emplacement[zone] = "rond";
    }
    document.getElementById(zone).style.pointerEvents = 'none';
    nombreCoup++;
    checkWin(); // passe dans la fonction checkWin
    verifEgalite(); // passe dans la fonction verifEgalite

    if (nombreCoup === 9 && typeof gagnant === 'undefined') { // place une condition pour dire que si le nombre de coup est strictement egal a 9 (nombre de case),
        document.getElementById("titre").textContent = "Pas de gagnant"; // que la variable gagnant est toujours undefined,
        document.getElementById("rejouer").style.display = "initial"; // alors indique que personne n'a gagner et affiche le boutton rejouer
    }
}

function checkWin() { // fonction qui verifie la victoire avec toute les possibilites de victoire et affiche qui a gagner et affiche le boutton rejouer
    if (verifEgalite(emplacement["Zonea1"], emplacement["Zonea2"], emplacement["Zonea3"]) || verifEgalite(emplacement["Zoneb1"], emplacement["Zoneb2"], emplacement["Zoneb3"]) || verifEgalite(emplacement["Zonec1"], emplacement["Zonec2"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea1"], emplacement["Zoneb1"], emplacement["Zonec1"]) || verifEgalite(emplacement["Zonea2"], emplacement["Zoneb2"], emplacement["Zonec2"]) || verifEgalite(emplacement["Zonea3"], emplacement["Zoneb3"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea1"], emplacement["Zoneb2"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea3"], emplacement["Zoneb2"], emplacement["Zonec1"])) {
        if (gagnant === 'croix') {
            document.getElementById("titre").textContent = "Les croix ont gagné";
        } else {
            document.getElementById("titre").textContent = "Les ronds ont gagné";
        }
        document.getElementById("rejouer").style.display = "initial";
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.pointerEvents = 'none';
        }
    }
}

function verifEgalite(zone1, zone2, zone3) { // fonction qui verifie les egalites dans une partie
    if (zone1 === zone2 && zone1 === zone3 && zone1 !== 'vide') {
        gagnant = zone1;
        return true;
    } else {
        return false;
    }
}