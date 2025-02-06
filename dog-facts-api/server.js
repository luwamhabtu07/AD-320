import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS (optional)
app.use(express.json()); // Enable JSON parsing

// Sample Dog Facts Data
const dogFacts = [
    "Dogs have a sense of time and miss their owners.",
    "A dog’s nose print is as unique as a human fingerprint.",
    "Dogs can learn over 1000 words.",
    "Dogs sweat through their paw pads.",
    "Some dogs can detect diseases in humans."
];

// ✅ Default route (optional)
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Dog Facts API 🐶!</h1>
              <p>Use <code>/facts</code> to get some dog facts.</p>`);
});

// ✅ Main API route: Get Dog Facts
app.get('/facts', (req, res) => {
    res.json({ facts: dogFacts });
});

// ✅ Handle unknown routes (optional)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
