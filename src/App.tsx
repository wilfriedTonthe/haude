import React, { useEffect, useState } from 'react';
import { Cake, Heart, Stars, Music, Sparkles, Gift, PartyPopper, MessageCircle } from 'lucide-react';
import wishesData from './wishes.json';

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
  const [wishes, setWishes] = useState<BirthdayWish[]>(wishesData.wishes);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const images = ["audrey1.jpg", "audrey2.jpg", "audrey4.png", "audrey5.png"];

  useEffect(() => {
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

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const newWishData: BirthdayWish = {
      id: crypto.randomUUID(),
      name: newWish.name,
      message: newWish.message,
      created_at: new Date().toISOString(),
    };

    setWishes((prev) => [newWishData, ...prev]);
    setNewWish({ name: '', message: '' });
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeSection === index ? 'bg-purple-500 text-white shadow-md scale-105' : 'bg-white/70 hover:bg-white/90'
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>

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
            {/* Première section avec images autour du poème */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative overflow-hidden rounded-2xl group">
                <img 
                  src={images[0]} 
                  alt="Félicité 1" 
                  className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
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
                <img 
                  src={images[1]} 
                  alt="Félicité 2" 
                  className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
            </div>

            {/* Deuxième section du poème */}
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
                <img 
                  src={images[2]} 
                  alt="Félicité 3" 
                  className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="bg-white/50 p-8 rounded-2xl">
                <p className="italic leading-relaxed text-lg">
                  Que cette année t'apporte des joies infinies,<br />
                  Des rêves fous, des souvenirs éternels.<br />
                  Que la joie emplisse chaque instant de ta vie,<br />
                  Et que l'amour soit ton guide et ton abri.
                </p>
              </div>
            </div>
          </div>
        )}

            {activeSection === 2 && (
              <div className="bg-white rounded-xl p-6 shadow-lg max-w-3xl mx-auto mb-10">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">Laissez un vœu pour Audrey ✍️</h2>
                <form onSubmit={handleSubmitWish} className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={newWish.name}
                    onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring focus:border-purple-400"
                    required
                  />
                  <textarea
                    placeholder="Votre message"
                    value={newWish.message}
                    onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                    className="w-full p-3 rounded-lg border h-28 resize-none focus:outline-none focus:ring focus:border-purple-400"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le vœu'}
                  </button>
                </form>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {wishes.map((wish) => (
                    <div key={wish.id} className="p-4 rounded-lg border bg-gray-50 shadow-sm">
                      <p className="font-semibold text-purple-700">{wish.name}</p>
                      <p className="text-gray-700 italic">"{wish.message}"</p>
                      <p className="text-xs text-gray-500 text-right">{new Date(wish.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
