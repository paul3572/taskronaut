async function addLists() {
    let lists = [];
    let listCounter = 1;
    const sessionId = "lWTXBi30NG8kcJ5jkv3DroytQnjCLm8-"

    for (let i = 0; i < 5; i++) {

        let listData = {
            listName: `List ${listCounter}`,
            sessionId: sessionId
        };
        try {
            const response = await fetch('http://localhost:3001/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Lists successfully sent to the server:', responseData);
        } catch (error) {
            console.error('Error sending lists to server:', error);
        }

        lists.push(listData);
        listCounter++;
    }
}


async function addTasks() {
    let tasks = [];
    const userIds = [4, 5];
    const listIds = [2, 3, 4, 5];
    let taskCounter = 1;

    for (let i = 0; i < 10; i++) {
        let userId = userIds[Math.floor(Math.random() * userIds.length)];
        let listID = listIds[Math.floor(Math.random() * listIds.length)];

        let taskData = {
            taskCreatorID: userId,
            dueDate: '2025-01-24',
            responsible: userId,
            taskDescription: `Task description ${taskCounter}`,
            taskName: `Task${taskCounter}`,
            priorities: Math.ceil(Math.random() * 5),
            category: `Category ${Math.ceil(Math.random() * 3)}`,
            taskStatus: 'todo',
            authorizedUsers: userId,
            comments: `Comments ${taskCounter}`,
            taskHistoryID: taskCounter,
            boardID: 1,
            listID: listID
        };
        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Tasks successfully sent to the server:', responseData);
        } catch (error) {
            console.error('Error sending tasks to server:', error);
        }

        tasks.push(taskData);
        taskCounter++;
    }

    return tasks;
}



//await addLists();
await addTasks();
