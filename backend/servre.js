require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Endpoint Health Check theo yêu cầu
app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

// 2. Kết nối Database
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Tạo Schema & Model cho Note
const noteSchema = new mongoose.Schema({ content: String });
const Note = mongoose.model('Note', noteSchema);

// 3. API GET: Lấy danh sách ghi chú
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
});

// 4. API POST: Thêm ghi chú mới
app.post('/api/notes', async (req, res) => {
    try {
        const newNote = new Note({ content: req.body.content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME} is running on port ${PORT}`);
});