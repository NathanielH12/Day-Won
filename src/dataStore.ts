import { Data } from './interface';
import fs from 'fs';

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

function saveDataToFile(data: Data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

// if there is data it will load
function loadDataFile() {
    if (!fs.existsSync('data.json')) {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    }

    const loadedData = fs.readFileSync('data.json', 'utf-8');
    const newData = JSON.parse(loadedData);
    data = {
        users: newData.users,
        timers: newData.timers
    };
    return data;
}

export {
    getData,
    setData,
    saveDataToFile,
    loadDataFile
};
