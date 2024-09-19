import * as api from './api.js';
// קבלת האלמנטים
const pointsRange = document.getElementById('points');
const pointsValue = document.getElementById('pointsValue');
const fgpRange = document.getElementById('fgp');
const fgpValue = document.getElementById('fgpValue');
const tppRange = document.getElementById('tpp');
const tppValue = document.getElementById('tppValue');
// שיתעדכן בזמן אמת
pointsRange.addEventListener('input', () => {
    pointsValue.textContent = pointsRange.value;
});
fgpRange.addEventListener('input', () => {
    fgpValue.textContent = `${fgpRange.value}%`;
});
tppRange.addEventListener('input', () => {
    tppValue.textContent = `${tppRange.value}%`;
});
// פונקציה ליצירת פרגרף
function createParagraph(content) {
    const p = document.createElement('p');
    p.textContent = content;
    return p;
}
// פונקציה שמכניסה לכרטיסים את השחקנים שבחרתי
function addPlayerToTeam(player) {
    let cardId;
    switch (player.position) {
        case 'PG':
            cardId = 'point-guard';
            break;
        case 'SG':
            cardId = 'shooting-guard';
            break;
        case 'SF':
            cardId = 'small-forward';
            break;
        case 'PF':
            cardId = 'power-forward';
            break;
        case 'C':
            cardId = 'center';
            break;
        default:
            console.log('Invalid position:', player.position);
            return;
    }
    const card = document.getElementById(cardId);
    if (card) {
        // הסרה של פסקה שקיימת למניעת כפילויות
        card.querySelectorAll('p').forEach((p) => p.remove());
        card.appendChild(createParagraph(player.playerName));
        card.appendChild(createParagraph(`Three Percent: ${player.threePercent}%`));
        card.appendChild(createParagraph(`Two Percent: ${player.twoPercent}%`));
        card.appendChild(createParagraph(`Points: ${player.points}`));
    }
}
// הפונקציה שיוצרת את הטבלה עם השחקנים
function populateTable(players) {
    const tableBody = document.querySelector('tbody');
    const tableHeader = document.querySelector('thead');
    tableBody.innerHTML = '';
    if (players.length === 0) {
        tableHeader.style.display = 'none';
    }
    else {
        tableHeader.style.display = '';
        players.forEach((player) => {
            const row = document.createElement('tr');
            const playerNameCell = document.createElement('td');
            playerNameCell.textContent = player.playerName;
            const positionCell = document.createElement('td');
            positionCell.textContent = player.position;
            const pointsCell = document.createElement('td');
            pointsCell.textContent = player.points.toString();
            const twoPercentCell = document.createElement('td');
            twoPercentCell.textContent = `${player.twoPercent}%`;
            const threePercentCell = document.createElement('td');
            threePercentCell.textContent = `${player.threePercent}%`;
            const actionCell = document.createElement('td');
            const addButton = document.createElement('button');
            const firstName = player.playerName.split(' ')[0];
            addButton.textContent = `Add ${firstName} to Current Team`;
            addButton.addEventListener('click', () => {
                addPlayerToTeam(player);
            });
            actionCell.appendChild(addButton);
            row.append(playerNameCell, positionCell, pointsCell, twoPercentCell, threePercentCell, actionCell);
            tableBody.appendChild(row);
        });
    }
}
// פונקציה לחיפוש שחקנים ושליחתם לAPI
async function searchPlayers(event) {
    event.preventDefault();
    const pointsRange = document.getElementById('points');
    const fgpRange = document.getElementById('fgp');
    const tppRange = document.getElementById('tpp');
    const position = document.getElementById('position').value;
    const points = parseInt(pointsRange.value);
    const twoPercent = parseInt(fgpRange.value);
    const threePercent = parseInt(tppRange.value);
    try {
        const players = await api.getPlayersBySearch(position, points, twoPercent, threePercent);
        populateTable(players);
    }
    catch (error) {
        console.error('Error searching players:', error);
    }
}
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', searchPlayers);
// הסתרת ההדר של הטבלה כשהאתר נטען
window.addEventListener('DOMContentLoaded', () => {
    const tableHeader = document.querySelector('thead');
    tableHeader.style.display = 'none';
});
