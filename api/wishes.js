import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect('mongodb://localhost:27017/birthday-wishes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const wishSchema = new mongoose.Schema({
  name: String,
  message: String,
  created_at: { type: Date, default: Date.now },
});

const Wish = mongoose.model('Wish', wishSchema);

export default async function handler(req, res) {
  await connectDB();  // Assurez-vous que la connexion MongoDB est établie

  if (req.method === 'GET') {
    try {
      const wishes = await Wish.find();
      res.status(200).json(wishes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    const { name, message } = req.body;

    const newWish = new Wish({ name, message });
    try {
      await newWish.save();
      res.status(201).json(newWish);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
