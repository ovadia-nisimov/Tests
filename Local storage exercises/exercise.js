function filterAndSortEvenNumbers(arr){
    return arr.filter(n => n % 2 === 0).sort();
}
console.log(filterAndSortEvenNumbers([1, 5, 7, 98, 34, 6, 21]))




function removeDuplicates(arr){
    return [...new Set(arr)];
}
console.log(removeDuplicates([5, 5, 7, 34, 34, 6, 21]))




function capitalizeFirstLetter(str) {
    return str
        .split(" ") 
        .map(word => word.endsWith(".") ? word : word[0].toUpperCase() + word.slice(1)) 
        .join(" "); 
}
console.log(capitalizeFirstLetter("hello world test."));




let tasks = [
    {
        id: 1,
        task: "task 1"
    },
    {
        id: 2,
        task: "task 2"
    },
    {
        id: 3,
        task: "task 3"
    },
    {
        id: 4,
        task: "task 4"
    }
]


// שמירה של כל הרשימה
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}



// שליפה של כל הרשימה
function loadTasks() {
    const tasks = localStorage.getItem('tasks'); 
    return tasks ? JSON.parse(tasks) : [];
}



// הוספת אובייקט בודד
function addTask(taskObject) {
    let tasks = loadTasks(); 
    tasks.push(taskObject); 
    saveTasks(tasks); 
}


// הסרת אובייקט בודד
function removeTask(taskId) {
    let tasks = loadTasks(); 
    tasks = tasks.filter(task => task.id !== taskId); 
    saveTasks(tasks); 
}