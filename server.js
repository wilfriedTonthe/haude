import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/birthday-wishes');

// Définir le modèle pour un vœu d'anniversaire
const wishSchema = new mongoose.Schema({
  name: String,
  message: String,
  created_at: { type: Date, default: Date.now },
});

const Wish = mongoose.model('Wish', wishSchema);

// Configurer Express
const app = express();
app.use(express.json());
app.use(cors());

// API pour obtenir les vœux
app.get('/wishes', async (req, res) => {
  try {
    const wishes = await Wish.find();
    res.json(wishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API pour envoyer un vœu
app.post('/wishes', async (req, res) => {
  const { name, message } = req.body;
  const newWish = new Wish({ name, message });
  try {
    await newWish.save();
    res.status(201).json(newWish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
