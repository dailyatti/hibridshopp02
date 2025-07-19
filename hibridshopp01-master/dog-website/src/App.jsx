import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, Mail, Instagram, MapPin, Clock, Star, Award, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';
import Puppies from './components/Puppies';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';

// Import images
import heroImage from './assets/371091897_839629824179864_1843142989333076425_n.jpg';
import maltipooImage from './assets/viber_kep_2025-06-12_17-54-04-740.jpg';
import cavapooImage from './assets/viber_kep_2025-06-12_17-54-15-104.jpg';
import goldendoodleImage from './assets/viber_kep_2025-06-12_17-57-51-752.jpg';
import puppy1 from './assets/viber_kep_2025-06-12_17-57-52-245.jpg';
import puppy2 from './assets/viber_kep_2025-06-12_17-57-52-976.jpg';

const breeds = [
  {
    id: 1,
    name: 'Maltipoo',
    description: 'A Maltipoo egy bájos hibrid fajta, amely a Máltai selyemkutya és a Pudli keresztezéséből született. Intelligens, barátságos és hipoallergén szőrzettel rendelkezik.',
    image: maltipooImage,
    characteristics: ['Hipoallergén', 'Intelligens', 'Barátságos', 'Könnyen tanítható'],
    size: 'Kicsi (3-7 kg)',
    lifespan: '12-15 év'
  },
  {
    id: 2,
    name: 'Cavapoo',
    description: 'A Cavapoo a Cavalier King Charles Spániel és a Pudli keresztezése. Rendkívül kedves, családbarát és alkalmazkodó természetű.',
    image: cavapooImage,
    characteristics: ['Családbarát', 'Kedves', 'Alkalmazkodó', 'Játékos'],
    size: 'Kicsi-közepes (5-12 kg)',
    lifespan: '12-16 év'
  },
  {
    id: 3,
    name: 'Goldendoodle',
    description: 'A Goldendoodle a Golden Retriever és a Pudli keresztezése. Nagy méretű, intelligens és rendkívül barátságos családi kutya.',
    image: goldendoodleImage,
    characteristics: ['Nagy méret', 'Intelligens', 'Barátságos', 'Aktív'],
    size: 'Nagy (20-35 kg)',
    lifespan: '10-15 év'
  }
];

const availablePuppies = [
  {
    id: 1,
    name: 'Luna',
    breed: 'Maltipoo',
    age: '8 hét',
    price: '350.000 Ft',
    image: puppy1,
    description: 'Gyönyörű kislány, nagyon játékos és barátságos.',
    available: true
  },
  {
    id: 2,
    name: 'Max',
    breed: 'Cavapoo',
    age: '10 hét',
    price: '380.000 Ft',
    image: puppy2,
    description: 'Energikus kisfiú, imádja a játékot és a simogatást.',
    available: true
  }
];

function HomePage() {
  const { slideshowImages, siteContent } = useData();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = slideshowImages.length > 0 
    ? slideshowImages.map(img => img.src) 
    : [heroImage, maltipooImage, cavapooImage, goldendoodleImage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide]}
              alt="Hibrid Shopp"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent"
            >
              {siteContent.heroTitle || 'Hibrid Shopp'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-amber-100"
            >
              {siteContent.heroSubtitle || 'Prémium hibrid kutyafajták szeretettel és gondossággal'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = 'tel:+36702178885'}
              >
                <Phone className="mr-2 h-5 w-5" />
                Hívás Most
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('breeds').scrollIntoView({ behavior: 'smooth' })}
              >
                Fajták Megtekintése
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/puppies')}
              >
                Kiskutyák Megtekintése
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-amber-400 scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Miért válassz minket?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {siteContent.aboutText || 'Több mint 10 éves tapasztalattal rendelkezünk a hibrid kutyafajták tenyésztésében'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Prémium Minőség', desc: 'Csak a legjobb vérvonalakból tenyésztünk' },
              { icon: Shield, title: 'Egészséggarancia', desc: 'Minden kiskutyánk egészségügyi garanciával' },
              { icon: Heart, title: 'Szeretettel', desc: 'Minden kutyánkat családtagként kezeljük' },
              { icon: Users, title: 'Szakértelem', desc: '10+ év tapasztalat a tenyésztésben' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section id="breeds" className="py-20 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Kutyafajtáink</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fedezd fel gyönyörű hibrid fajtáinkat, amelyek ötvözik a legjobb tulajdonságokat
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breeds.map((breed, index) => (
              <motion.div
                key={breed.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-amber-600 text-white">{breed.size}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{breed.name}</h3>
                    <p className="text-gray-600 mb-4">{breed.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-500">
                        <strong>Élettartam:</strong> {breed.lifespan}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {breed.characteristics.map((char, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Kapcsolat</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Vedd fel velünk a kapcsolatot bármilyen kérdéssel kapcsolatban
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: 'Telefon',
                info: siteContent.contactPhone || '+36 70 217 8885',
                action: () => window.location.href = `tel:${siteContent.contactPhone || '+36702178885'}`
              },
              {
                icon: Mail,
                title: 'Email',
                info: siteContent.contactEmail || 'shoppdogg583@gmail.com',
                action: () => window.location.href = `mailto:${siteContent.contactEmail || 'shoppdogg583@gmail.com'}`
              },
              {
                icon: Instagram,
                title: 'Instagram',
                info: siteContent.instagram || '@hibridshopp',
                action: () => window.open('https://instagram.com/hibridshopp', '_blank')
              },
              {
                icon: Clock,
                title: 'Nyitvatartás',
                info: siteContent.openingHours || 'Hétfő-Péntek 8:00-22:00',
                action: null
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`text-center h-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${
                    contact.action ? 'cursor-pointer transform hover:-translate-y-2' : ''
                  }`}
                  onClick={contact.action}
                >
                  <CardContent className="p-6">
                    <contact.icon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                    <p className="text-gray-300">{contact.info}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/puppies" element={<Puppies />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? <AdminPanel /> : <Navigate to="/admin/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;