document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-container');
    const tbody = document.querySelector('tbody');
    const title = document.querySelector('h1');
    let editIndex = null; // משתנה שעשיתי בשביל לשמור את האינדקס של הפריט הנערך



    // פונקציה ששומרת חייל
    function savePersonnel(personnel) {
        let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
        if (editIndex !== null) {
            personnelList[editIndex] = personnel; 
        } else {
            personnelList.push(personnel); 
        }
        localStorage.setItem('personnelList', JSON.stringify(personnelList));
    }

    // פונקציה שמוסיפה לטבלה
    function populateTable() {
        tbody.innerHTML = '';
        let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
        personnelList.forEach((person, index) => {
            const row = document.createElement('tr');

            const fullNameCell = document.createElement('td');
            fullNameCell.textContent = person.fullName;
            row.appendChild(fullNameCell);

            const rankCell = document.createElement('td');
            rankCell.textContent = person.rank;
            row.appendChild(rankCell);

            const positionCell = document.createElement('td');
            positionCell.textContent = person.position;
            row.appendChild(positionCell);

            const platoonCell = document.createElement('td');
            platoonCell.textContent = person.platoon;
            row.appendChild(platoonCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = person.status;
            row.appendChild(statusCell);

            const actionsCell = document.createElement('td');

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('action-btn');
            removeBtn.addEventListener('click', function () {
                removePersonnel(index);
            });
            actionsCell.appendChild(removeBtn);

            const missionBtn = document.createElement('button');
            missionBtn.textContent = 'Mission';
            missionBtn.classList.add('action-btn');
            missionBtn.setAttribute('data-index', index);
            missionBtn.addEventListener('click', function () {
                startMissionTimer(index, missionBtn);
            });
            actionsCell.appendChild(missionBtn);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('action-btn');
            editBtn.setAttribute('data-index', index); 
            editBtn.addEventListener('click', function () {
                editPersonnel(index); 
            });
            actionsCell.appendChild(editBtn);

            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
    }

    // פונקציה למשיכת נתונים 
    function getFormData() {
        const fullName = document.querySelector('input[name="fullName"]').value;
        const rank = document.querySelector('input[name="rank"]').value;
        const position = document.querySelector('input[name="position"]').value;
        const platoon = document.querySelector('input[name="platoon"]').value;
        const missionTime = Number(document.querySelector('input[name="missionTime"]').value);
        const status = document.querySelector('select[name="status"]').value;

        return { fullName, rank, position, platoon, missionTime, status };
    }

    // מנהל את הסבמיט
    form.addEventListener('submit', function (e) {
        handleSubmit(e);
    });

    function handleSubmit(e) {
        e.preventDefault();
        const newPersonnel = getFormData();
        savePersonnel(newPersonnel); 
        populateTable(); 
        form.reset(); 

        if (editIndex !== null) {
            showAddMode(); 
        }
    }

    // פונקציה להסרה
    function removePersonnel(index) {
        let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
        personnelList.splice(index, 1);
        localStorage.setItem('personnelList', JSON.stringify(personnelList));
        populateTable();
    }

    // פונקציה להתחלת טיימר
    function startMissionTimer(index, button) {
        let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
        let missionTime = Number(personnelList[index].missionTime);


        if (missionTime <= 0) {
            button.textContent = 'Mission Completed';
            return;
        }

        const intervalId = setInterval(() => {
            missionTime--;
            button.textContent = `Mission (${missionTime})`;

            if (missionTime <= 0) {
                clearInterval(intervalId);
                button.textContent = 'Mission Completed';
                personnelList[index].missionTime = 0;
                localStorage.setItem('personnelList', JSON.stringify(personnelList));
            }
        }, 1000);
    }

    // פונקציה לעריכה
    function editPersonnel(index) {
        editIndex = index; 
        const person = JSON.parse(localStorage.getItem('personnelList'))[index];

        document.querySelector('table').style.display = 'none';
        document.querySelector('h2').style.display = 'none';

        title.textContent = 'EDIT PERSONNEL';

        document.querySelector('input[name="fullName"]').value = person.fullName;
        document.querySelector('input[name="rank"]').value = person.rank;
        document.querySelector('input[name="position"]').value = person.position;
        document.querySelector('input[name="platoon"]').value = person.platoon;
        document.querySelector('input[name="missionTime"]').value = person.missionTime;
        document.querySelector('select[name="status"]').value = person.status;

        const submitBtn = document.querySelector('.add-btn');
        submitBtn.textContent = 'Save Changes';
        submitBtn.classList.add('save-btn');
        submitBtn.classList.remove('add-btn');

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('cancel-btn'); 
        cancelBtn.addEventListener('click', function () {
            cancelEdit(); 
        });
        form.appendChild(cancelBtn);
    }

    // פונקציה לביטול מצב עריכה
    function cancelEdit() {
        showAddMode();
        form.reset(); 
    }

    // פונקציה להחזרת המצב של הוספה
    function showAddMode() {
        title.textContent = 'BATTALION FORCE MANAGEMENT';
        document.querySelector('table').style.display = '';
        document.querySelector('h2').style.display = '';

        const submitBtn = document.querySelector('.save-btn');
        submitBtn.textContent = 'Add Personnel';
        submitBtn.classList.add('add-btn');
        submitBtn.classList.remove('save-btn');

        document.querySelector('.cancel-btn').remove(); 
        editIndex = null; 
    }

    populateTable();
});
