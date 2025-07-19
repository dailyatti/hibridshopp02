import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useData } from '../contexts/DataContext';

const BookingForm = () => {
  const { addBooking } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
    dog_name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'
  ];

  const availableDogs = [
    'Luna - Maltipoo',
    'Max - Cavapoo',
    'Általános érdeklődés'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'A név megadása kötelező';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'A telefonszám megadása kötelező';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Érvénytelen telefonszám formátum';
    }
    
    if (!formData.preferred_date) {
      newErrors.preferred_date = 'A dátum megadása kötelező';
    } else {
      const selectedDate = new Date(formData.preferred_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferred_date = 'A dátum nem lehet múltbeli';
      }
    }
    
    if (!formData.preferred_time) {
      newErrors.preferred_time = 'Az időpont megadása kötelező';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Add booking to context
      addBooking(formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
        dog_name: ''
      });
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto p-6"
        >
          <Card className="text-center shadow-2xl border-0 bg-white">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="h-8 w-8 text-green-600" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Foglalás elküldve!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Köszönjük a foglalását! Hamarosan felvesszük Önnel a kapcsolatot a részletek egyeztetéséhez.
              </p>
              
              <div className="space-y-3 text-sm text-gray-500 mb-6">
                <p>📞 Telefonon: 0036 70 217 8885</p>
                <p>⏰ Munkaidőben: Hétfő-Péntek 8:00-22:00</p>
              </div>
              
              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-amber-600 hover:bg-amber-700"
              >
                Új foglalás
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Időpontfoglalás
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Foglaljon időpontot kiskutyáink megtekintésére és ismerkedjen meg velünk személyesen
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <Calendar className="mr-3 h-6 w-6 text-amber-600" />
                  Foglalási űrlap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                      <User className="mr-2 h-5 w-5 text-amber-600" />
                      Személyes adatok
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Név *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Az Ön neve"
                        className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefonszám *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0036 70 123 4567"
                        className={`h-12 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email cím
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-amber-600" />
                      Időpont részletei
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Előnyben részesített dátum *
                      </label>
                      <Input
                        name="preferred_date"
                        type="date"
                        value={formData.preferred_date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`h-12 ${errors.preferred_date ? 'border-red-500' : ''}`}
                      />
                      {errors.preferred_date && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferred_date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Előnyben részesített időpont *
                      </label>
                      <select
                        name="preferred_time"
                        value={formData.preferred_time}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-3 border rounded-md ${errors.preferred_time ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Válasszon időpontot</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {errors.preferred_time && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferred_time}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Érdeklődés
                      </label>
                      <select
                        name="dog_name"
                        value={formData.dog_name}
                        onChange={handleInputChange}
                        className="w-full h-12 px-3 border border-gray-300 rounded-md"
                      >
                        <option value="">Válasszon...</option>
                        {availableDogs.map((dog) => (
                          <option key={dog} value={dog}>
                            {dog}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4 text-amber-600" />
                      További üzenet
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Írja le kérdéseit vagy speciális kéréseit..."
                      className="min-h-24"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:transform-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Heart className="mr-2 h-5 w-5" />
                        Foglalás elküldése
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Kapcsolat</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5" />
                    <span>0036 70 217 8885</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5" />
                    <span>shoppdogg583@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-3 h-5 w-5" />
                    <span>Hétfő-Péntek 8:00-22:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fontos információk</h3>
                <div className="space-y-3 text-gray-600">
                  <Alert>
                    <Heart className="h-4 w-4" />
                    <AlertDescription>
                      A látogatás előtt kérjük, hogy telefonon egyeztessük a részleteket.
                    </AlertDescription>
                  </Alert>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      A látogatás időtartama általában 30-60 perc
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      Kérjük, hogy kényelmes ruhában érkezzen
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      A kiskutyák egészségügyi papírjai megtekinthetők
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      Szívesen válaszolunk minden kérdésére
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="shadow-xl border-0 bg-gray-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Sürgős esetben hívjon most!
                </h3>
                <Button
                  onClick={() => window.location.href = 'tel:0036702178885'}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Azonnali hívás
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;