import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, Star, Award, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useData } from '../contexts/DataContext';

const Puppies = () => {
  const { availablePuppies, breeds } = useData();
  const [selectedBreed, setSelectedBreed] = useState('all');

  const filteredPuppies = selectedBreed === 'all' 
    ? availablePuppies 
    : availablePuppies.filter(puppy => puppy.breed === selectedBreed);

  const uniqueBreeds = [...new Set(availablePuppies.map(puppy => puppy.breed))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Elérhető Kiskutyák
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelenleg elérhető kiskutyáink, akik új családra várnak
          </p>
        </motion.div>

        {/* Breed Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            variant={selectedBreed === 'all' ? "default" : "outline"}
            className={`rounded-full px-6 py-2 transition-all duration-300 ${
              selectedBreed === 'all'
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg transform scale-105'
                : 'border-amber-600 text-amber-600 hover:bg-amber-50'
            }`}
            onClick={() => setSelectedBreed('all')}
          >
            Összes fajta
          </Button>
          {uniqueBreeds.map((breed) => (
            <Button
              key={breed}
              variant={selectedBreed === breed ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedBreed === breed
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg transform scale-105'
                  : 'border-amber-600 text-amber-600 hover:bg-amber-50'
              }`}
              onClick={() => setSelectedBreed(breed)}
            >
              {breed}
            </Button>
          ))}
        </motion.div>

        {/* Puppies Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPuppies.map((puppy, index) => (
              <motion.div
                key={puppy.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                  <div className="relative h-80 overflow-hidden">
                    {puppy.image ? (
                      <img
                        src={puppy.image}
                        alt={puppy.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                        <Heart className="h-16 w-16 text-amber-400" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white">Elérhető</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-amber-600 text-white text-lg px-3 py-1">
                        {puppy.price}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-gray-800">{puppy.name}</h3>
                      <Badge variant="outline">{puppy.breed}</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">
                      <strong>Kor:</strong> {puppy.age}
                    </p>
                    <p className="text-gray-600 mb-6">{puppy.description}</p>
                    <Button 
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
                      onClick={() => window.location.href = 'tel:+36702178885'}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Érdeklődés
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPuppies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Jelenleg nincsenek elérhető kiskutyák
            </h3>
            <p className="text-gray-500 mb-6">
              Kérjük, várj egy kicsit vagy vedd fel velünk a kapcsolatot
            </p>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8"
              onClick={() => window.location.href = 'tel:+36702178885'}
            >
              <Phone className="mr-2 h-4 w-4" />
              Kapcsolatfelvétel
            </Button>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Miért válassz minket?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Minden kiskutyánk szeretettel és gondossággal nevelkedik
            </p>
          </div>

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
        </motion.div>
      </div>
    </div>
  );
};

export default Puppies; 