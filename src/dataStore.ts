import { Data } from './interface';
let data: Data = {
    users: [],
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
