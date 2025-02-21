import React, { useEffect, useState } from 'react';
import { Cake, Heart, Stars, Music, Sparkles, Gift, PartyPopper, MessageCircle } from 'lucide-react';

interface BirthdayWish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [wishes, setWishes] = useState<BirthdayWish[]>([]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const images = ["audrey1.jpg", "audrey2.jpg", "audrey4.png", "audrey5.png"];

<<<<<<< HEAD
  // Charger les vœux depuis l'API ou le localStorage
  useEffect(() => {
    const fetchWishes = async () => {
      const response = await fetch('http://localhost:5000/wishes');
      const data = await response.json();
      setWishes(data);
    };

    const storedWishes = localStorage.getItem('wishes');
    if (storedWishes) {
      setWishes(JSON.parse(storedWishes));
    } else {
      fetchWishes();
=======
  // Charger les vœux depuis le localStorage au démarrage
  useEffect(() => {
    const storedWishes = localStorage.getItem('wishes');
    if (storedWishes) {
      setWishes(JSON.parse(storedWishes));
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
    }

    setTimeout(() => setShowMessage(true), 1000);

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const newWishData = {
      id: crypto.randomUUID(),
      name: newWish.name,
      message: newWish.message,
      created_at: new Date().toISOString(),
    };

<<<<<<< HEAD
    try {
      const response = await fetch('http://localhost:5000/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWishData),
      });
      const addedWish = await response.json();
      setWishes((prev) => [addedWish, ...prev]);
      localStorage.setItem('wishes', JSON.stringify([addedWish, ...prev]));  // Save to localStorage
      setNewWish({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting wish:', error);
    }

=======
    setWishes((prev) => {
      const updatedWishes = [newWishData, ...prev];
      // Sauvegarder les vœux dans le localStorage
      localStorage.setItem('wishes', JSON.stringify(updatedWishes));
      return updatedWishes;
    });

    setNewWish({ name: '', message: '' });
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
    setIsSubmitting(false);
  };

  const sections = [
    { icon: <PartyPopper className="w-6 h-6" />, title: "Galerie Photos" },
    { icon: <Heart className="w-6 h-6" />, title: "Poème" },
    { icon: <MessageCircle className="w-6 h-6" />, title: "Vœux" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-purple-200 to-indigo-200 flex items-center justify-center p-4 overflow-hidden">
      <audio id="bgMusic" loop>
        <source src="Dk2fois.mp3" type="audio/mp3" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 shadow-lg"
      >
        <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
      </button>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          >
            {i % 4 === 0 ? <Stars className="text-yellow-400" /> :
             i % 4 === 1 ? <Sparkles className="text-purple-400" /> :
             i % 4 === 2 ? <Heart className="text-pink-400" /> :
             <Gift className="text-indigo-400" />}
          </div>
        ))}
      </div>

      <div className="max-w-5xl w-full mx-auto">
        <div className={`bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-1000 ${showMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="text-center">
<<<<<<< HEAD
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 text-glow">
              Joyeux Anniversaire Audrey Camille! ✨
            </h1>

            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${activeSection === index ? 'bg-purple-500 text-white shadow-md scale-105' : 'bg-white/70 hover:bg-white/90'}`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
=======
            <div className="flex justify-center gap-8 mb-10">
              <Cake className="w-20 h-20 text-pink-500 animate-bounce" />
              <Gift className="w-20 h-20 text-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <PartyPopper className="w-20 h-20 text-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 text-glow">
              Joyeux Anniversaire Audrey Camille! ✨
            </h1>
            <div className="flex justify-center gap-4 mb-10">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${activeSection === index ? 'bg-purple-500 text-white shadow-md scale-105' : 'bg-white/70 hover:bg-white/90'}`}
                >
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>
>>>>>>> becdc154c42414c623e9645012a36196c63ef681

            {activeSection === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {images.map((img, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={img}
                      alt={`Célébration ${index + 1}`}
                      className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative overflow-hidden rounded-2xl group">
<<<<<<< HEAD
                    <img
                      src={images[0]}
                      alt="Félicité 1"
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
=======
                    <img 
                      src={images[0]} 
                      alt="Félicité 1" 
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
                    />
                  </div>
                  <div className="bg-white/50 p-8 rounded-2xl text-center">
                    <h2 className="text-3xl font-semibold text-purple-600 mb-6">Pour Toi, Audrey 🌸</h2>
                    <p className="italic leading-relaxed text-lg">
                      À Audrey, l'amie aux yeux d'or,<br />
                      En ce jour où le soleil se dore,<br />
                      Un an de plus, une étoile qui brille,<br />
                      Dans ton ciel bleu, où l'amour ne faiblit jamais.
                    </p>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl group">
<<<<<<< HEAD
                    <img
                      src={images[1]}
                      alt="Félicité 2"
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
=======
                    <img 
                      src={images[1]} 
                      alt="Félicité 2" 
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/50 p-8 rounded-2xl">
                    <p className="italic leading-relaxed text-lg">
                      Tes rires sont des mélodies célestes,<br />
                      Qui chassent les ombres et les tristesses.<br />
                      Ta présence est un rayon de lumière divine,<br />
                      Qui illumine nos vies et nous guide vers le bonheur.
                    </p>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl group">
<<<<<<< HEAD
                    <img
                      src={images[2]}
                      alt="Félicité 3"
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
=======
                    <img 
                      src={images[2]} 
                      alt="Félicité 3" 
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
                    />
                  </div>
                  <div className="bg-white/50 p-8 rounded-2xl">
                    <p className="italic leading-relaxed text-lg">
                      Que cette année t'apporte des joies infinies,<br />
                      Des rêves fous, des souvenirs chéris.<br />
<<<<<<< HEAD
                      Que la chance t'accompagne chaque jour,<br />
                      Et que ton cœur soit toujours rempli d'amour.
=======
                      Que ton cœur s'épanouisse de bonheur,<br />
                      Et que tes vœux se réalisent en douceur.
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 2 && (
<<<<<<< HEAD
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-purple-600">Souhaitez un Joyeux Anniversaire à Audrey!</h2>
                <form onSubmit={handleSubmitWish} className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    value={newWish.name}
                    onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                    placeholder="Votre nom"
                    className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
=======
              <form onSubmit={handleSubmitWish} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={newWish.name}
                    onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-purple-300"
                    placeholder="Ton nom"
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
                  />
                </div>
                <div>
                  <textarea
<<<<<<< HEAD
                    name="message"
                    value={newWish.message}
                    onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                    placeholder="Votre message"
                    className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-purple-500 text-white py-2 px-6 rounded-lg disabled:opacity-50"
                  >
                    Soumettre
                  </button>
                </form>
              </div>
            )}

            {wishes.length > 0 && (
              <div className="mt-10 space-y-4">
                <h3 className="text-2xl font-semibold text-purple-600">Les Vœux:</h3>
                {wishes.map((wish) => (
                  <div key={wish.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-purple-700">{wish.name}</h4>
                    <p className="text-lg text-gray-600">{wish.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(wish.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
=======
                    value={newWish.message}
                    onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-purple-300"
                    placeholder="Ton message"
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-500 text-white text-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi...' : 'Envoyer mon Vœu'}
                </button>
              </form>
            )}

            {activeSection === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-500">Vos Vœux</h2>
                <ul className="space-y-4">
                  {wishes.map((wish) => (
                    <li key={wish.id} className="bg-white/90 rounded-xl shadow-md p-4">
                      <p className="font-bold">{wish.name}</p>
                      <p className="text-sm text-gray-600">{wish.created_at}</p>
                      <p className="text-lg italic">{wish.message}</p>
                    </li>
                  ))}
                </ul>
>>>>>>> becdc154c42414c623e9645012a36196c63ef681
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
