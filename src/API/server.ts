import express from 'express';
import cors from 'cors';
import { getData, setData, saveDataToFile, loadDataFile } from "../dataStore.js";

loadDataFile();
const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running"); // For Debug purposes
});

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello world' });
});

app.post('/timer/save', (req, res) => {
    const { remainingTimeHrs, remainingTimeMins, remainingTimeSecs } = req.body;
    const data = getData();

    data.timers = {
        remainingTimeHrs,
        remainingTimeMins,
        remainingTimeSecs
    };

    setData(data);
    saveDataToFile(data);

    res.json({ message: 'Timer Saved '}); // For Debug purposes
})

app.get('/timer/load', (req, res) => {
    const data = getData();
    res.json(data.timers);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});