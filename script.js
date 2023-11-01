document.addEventListener('DOMContentLoaded', function() {
    const newTaskList = document.getElementById('newTaskList');
    const sortButton = document.querySelector('.fa-arrow-down-short-wide');
    let ascendingOrder = true;
    let input = document.querySelector('.clearinp');
    let clear = document.querySelector('.clear');

    function createNewTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="group">
                <span>${taskText}</span>
            </div>
            <div class="circle">
                <div class="new-x">X</div>
            </div>
        `;
        newTaskList.appendChild(li);

        const deleteButton = li.querySelector('.new-x');
        deleteButton.addEventListener('click', function() {
            li.remove();
        });
    }

    clear.addEventListener("click", () => {
        input.value = '';
    });

    sortButton.addEventListener('click', function() {
        const tasks = Array.from(newTaskList.children);
        tasks.sort(function(a, b) {
            const textA = a.querySelector('span').textContent.toUpperCase();
            const textB = b.querySelector('span').textContent.toUpperCase();

            if (textA < textB) {
                return ascendingOrder ? -1 : 1;
            } else if (textA > textB) {
                return ascendingOrder ? 1 : -1;
            }
            return 0;
        });

        newTaskList.innerHTML = '';
        tasks.forEach(task => newTaskList.appendChild(task));

        ascendingOrder = !ascendingOrder;

        if (ascendingOrder) {
            sortButton.classList.remove('fa-rotate-180');
        } else {
            sortButton.classList.add('fa-rotate-180');
        }
    });

    newTaskList.addEventListener('mouseenter', function(event) {
        if (event.target.classList.contains('circle')) {
            event.target.style.display = 'block';
        }
    });

    newTaskList.addEventListener('mouseleave', function(event) {
        if (event.target.classList.contains('circle')) {
            event.target.style.display = 'none';
        }
    });

    const addTaskButton = document.getElementById('addTask');
    addTaskButton.addEventListener('click', function() {
        const inputField = document.querySelector('.container input');
        const taskText = inputField.value.trim();

        if (taskText !== '') {
            createNewTask(taskText);
            inputField.value = '';
        }
    });
});
