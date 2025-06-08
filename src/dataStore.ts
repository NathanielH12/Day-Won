import { Data } from './interface';
// DATA FOR USERS AND QUIZZES
let data: Data = {
    users: [],
    quizzes: [],
    timers: []
};

// Use getData() to access the data
function getData() {
    return data;
}

// Use setData(newData) to set new data
function setData(newData: Data) {
    data = newData;
}

export { getData, setData };
