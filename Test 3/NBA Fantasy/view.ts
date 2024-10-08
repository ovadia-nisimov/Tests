import * as api from './api.js';

// קבלת האלמנטים
const pointsRange = document.getElementById('points') as HTMLInputElement;
const pointsValue = document.getElementById('pointsValue') as HTMLSpanElement;

const fgpRange = document.getElementById('fgp') as HTMLInputElement;
const fgpValue = document.getElementById('fgpValue') as HTMLSpanElement;

const tppRange = document.getElementById('tpp') as HTMLInputElement;
const tppValue = document.getElementById('tppValue') as HTMLSpanElement;



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
function createParagraph(content: string): HTMLParagraphElement {
    const p: HTMLParagraphElement = document.createElement('p');
    p.textContent = content;
    return p;
}

// פונקציה שמכניסה לכרטיסים את השחקנים שבחרתי
function addPlayerToTeam(player: api.Player): void {

    const position = (document.getElementById('position') as HTMLSelectElement).value;
    const card = document.getElementById(position) as HTMLElement;

    if (card) {
        // הסרה של פסקה שקיימת למניעת כפילויות
        card.querySelectorAll('p').forEach((p: HTMLParagraphElement) => p.remove());

        card.appendChild(createParagraph(player.playerName));
        card.appendChild(createParagraph(`Three Percent: ${player.threePercent}%`));
        card.appendChild(createParagraph(`Two Percent: ${player.twoPercent}%`));
        card.appendChild(createParagraph(`Points: ${player.points}`));
    }
}

// פונקציה שיוצרת את הטבלה עם השחקנים
function populateTable(players: api.Player[]): void {
    const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;
    const tableHeader = document.querySelector('thead') as HTMLElement;

    tableBody.innerHTML = '';  

    if (players.length !== 0) {
        tableHeader.classList.remove("hidden");
        players.forEach((player: api.Player) => {
            const row: HTMLTableRowElement = document.createElement('tr');

            const playerNameCell: HTMLTableCellElement = document.createElement('td');
            playerNameCell.textContent = player.playerName;

            const positionCell: HTMLTableCellElement = document.createElement('td');
            positionCell.textContent = player.position;

            const pointsCell: HTMLTableCellElement = document.createElement('td');
            pointsCell.textContent = player.points.toString();

            const twoPercentCell: HTMLTableCellElement = document.createElement('td');
            twoPercentCell.textContent = `${player.twoPercent}%`;

            const threePercentCell: HTMLTableCellElement = document.createElement('td');
            threePercentCell.textContent = `${player.threePercent}%`;

            const actionCell: HTMLTableCellElement = document.createElement('td');
            const addButton: HTMLButtonElement = document.createElement('button');
            addButton.classList.add("btn")
            const firstName: string = player.playerName.split(' ')[0];

            addButton.textContent = `Add ${firstName} to Current Team`;
            addButton.addEventListener('click', () => {
                addPlayerToTeam(player);
            });

            actionCell.appendChild(addButton);
            row.append(playerNameCell, positionCell, pointsCell, twoPercentCell, threePercentCell, actionCell);
            tableBody.appendChild(row);
        });
    } else {
        tableHeader.classList.add("r");
    }
}


// פונקציה לחיפוש שחקנים ושליחתם לAPI
async function searchPlayers(event: Event): Promise<void> {
    event.preventDefault();  

    const pointsRange = document.getElementById('points') as HTMLInputElement;
    const fgpRange = document.getElementById('fgp') as HTMLInputElement;
    const tppRange = document.getElementById('tpp') as HTMLInputElement;

    const selectElement = document.getElementById("position") as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    const points: number = parseInt(pointsRange.value);
    const twoPercent: number = parseInt(fgpRange.value);
    const threePercent: number = parseInt(tppRange.value);

    try {
        const players = await api.getPlayersBySearch(selectedText, points, twoPercent, threePercent);
        populateTable(players);
    } catch (error) {
        console.error('Error searching players:', error);
    }
}

const searchForm = document.querySelector('form') as HTMLFormElement;
searchForm.addEventListener('submit', searchPlayers);