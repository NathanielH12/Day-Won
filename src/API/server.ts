import express from 'express';
import cors from 'cors';
import { loadDataFile } from "../dataStore.js";
import { saveTimerToStorage, loadTimerFromStorage } from '../timer.js';

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
    saveTimerToStorage();
    res.json({ message: 'Timer Saved '}); // For Debug purposes
})

app.get('/timer/load', (req, res) => {
    loadTimerFromStorage();
    res.json({ message: 'Timer Loaded '});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});