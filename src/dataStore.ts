import { Data } from './interface';
// DATA FOR USERS AND QUIZZES
let data: Data = {
  users: [],
  quizzes: []
};

// Use getData() to access the data
function getData() {
  return data;
}

// Use detData(newData) to set new data
function setData(newData: Data) {
  data = newData;
}

export { getData, setData };
