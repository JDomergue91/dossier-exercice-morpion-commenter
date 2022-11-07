let info = document.getElementById("titre"); // creer variable info qui recupere l'id titre
document.getElementById("rejouer").style.display = "none"; // cache le boutton rejouer
info.textContent = "Super Morpion"; // Ecrit le contenue du titre

window.addEventListener('load', (event) => { // event au chargement qui recupere toutes les cases du tableau 
    let getAllCells = Array.from(document.querySelectorAll('td'));
    getAllCells.forEach(cell => {
        cell.addEventListener("click", function () { // event sur le click qui executer la fonction jouer en entrer l'id de la case clicker
            jouer(cell.id);
        })
    })
});
document.querySelector("#boutonRejouer").addEventListener("click", function () { // event au click sur le boutton rejouer qui reinitialise la page 
    document.getElementById("rejouer").style.display = "none";
    info.textContent = "Super Morpion";
    let getAllCells = Array.from(document.querySelectorAll('td'));
    getAllCells.forEach(cell => {
        cell.style.backgroundPosition = "left";
        cell.style.pointerEvents = 'auto';
        delete cell.dataset.played; // supprime les dataset.played enregistrer sur la party precedente
    })
})


function jouer(zone) { // fonction jouer qui prend en entrer les zones de jeux
    let elements = Array.from(document.querySelectorAll('[data-played]')); 
    let carre = document.getElementById(zone);
    if (elements.length % 2 === 1) {
        carre.style.backgroundPosition = "center"; // sauvegarde la valeur croix ou rond dans le dataset.played
        carre.dataset.played = "croix";
    } else {
        carre.style.backgroundPosition = "right";
        carre.dataset.played = "rond";
    }
    carre.style.pointerEvents = 'none';
    if (!checkWin() && Array.from(document.querySelectorAll('[data-played]')).length === 9) {
        document.getElementById("titre").textContent = "Pas de gagnant";
        document.getElementById("rejouer").style.display = "initial";
    }

}

function checkWin() { //fonction qui verifie avec les dataset.played pour voir si un joueur a gagner
    if (
        verifEgalite(document.getElementById("Zonea1").dataset.played, document.getElementById("Zonea2").dataset.played, document.getElementById("Zonea3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zoneb1").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zoneb3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonec1").dataset.played, document.getElementById("Zonec2").dataset.played, document.getElementById("Zonec3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea1").dataset.played, document.getElementById("Zoneb1").dataset.played, document.getElementById("Zonec1").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea2").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zonec2").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea3").dataset.played, document.getElementById("Zoneb3").dataset.played, document.getElementById("Zonec3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea1").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zonec3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea3").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zonec1").dataset.played)
    ) {
        return true;
    } else {
        return false;
    }
}

function verifEgalite(zone1, zone2, zone3) { // fonction qui verifie si il y a egaliter en verifiant que aucune condition de victoire n'est valide
    console.log(zone1 + zone2 + zone3);
    if (zone1 === zone2 && zone1 === zone3 && zone1 !== undefined) {

        info.textContent = `Les ${zone1} ont gagné`;
        document.getElementById("rejouer").style.display = "initial";
        let getAllCells = Array.from(document.querySelectorAll('td'));
        for (let i = 0; i < getAllCells.length; i++) {
            getAllCells[i].style.pointerEvents = 'none';
        }
    }
}