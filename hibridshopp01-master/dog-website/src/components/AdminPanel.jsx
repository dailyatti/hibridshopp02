import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Image, 
  Calendar, 
  FileText, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Upload,
  X,
  Eye,
  LogOut,
  Home,
  Menu,
  Dog,
  Phone,
  Mail,
  Instagram,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { logout } = useAuth();
  const { 
    galleryImages, setGalleryImages, 
    bookings, setBookings,
    breeds, setBreeds, addBreed,
    availablePuppies, setAvailablePuppies, addPuppy,
    siteContent, setSiteContent,
    slideshowImages, setSlideshowImages, addSlideshowImage,
    menuItems, setMenuItems, addMenuItem
  } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Form states
  const [newImage, setNewImage] = useState({ src: '', alt: '', category: 'puppies' });
  const [newBreed, setNewBreed] = useState({ name: '', description: '', size: '', lifespan: '', characteristics: [] });
  const [newPuppy, setNewPuppy] = useState({ name: '', breed: '', age: '', price: '', description: '', image: '' });
  const [newMenuItem, setNewMenuItem] = useState({ name: '', path: '' });
  const [editingContent, setEditingContent] = useState({ ...siteContent });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveChanges = () => {
    setSiteContent(editingContent);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setter(prev => ({ ...prev, src: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    if (newImage.src && newImage.alt) {
      const image = { id: Date.now(), ...newImage };
      setGalleryImages(prev => [...prev, image]);
      setNewImage({ src: '', alt: '', category: 'puppies' });
    }
  };

  const addSlideshowImage = () => {
    if (newImage.src && newImage.alt) {
      const image = { id: Date.now(), ...newImage, type: 'slideshow' };
      setSlideshowImages(prev => [...prev, image]);
      setNewImage({ src: '', alt: '', category: 'slideshow' });
    }
  };

  const deleteImage = (id, setter, array) => {
    setter(prev => prev.filter(img => img.id !== id));
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const addNewBreed = () => {
    if (newBreed.name && newBreed.description) {
      addBreed(newBreed);
      setNewBreed({ name: '', description: '', size: '', lifespan: '', characteristics: [] });
    }
  };

  const addNewPuppy = () => {
    if (newPuppy.name && newPuppy.breed) {
      addPuppy(newPuppy);
      setNewPuppy({ name: '', breed: '', age: '', price: '', description: '', image: '' });
    }
  };

  const addNewMenuItem = () => {
    if (newMenuItem.name && newMenuItem.path) {
      addMenuItem(newMenuItem);
      setNewMenuItem({ name: '', path: '' });
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Áttekintés', icon: Home },
    { id: 'gallery', label: 'Galéria', icon: Image },
    { id: 'slideshow', label: 'Slideshow', icon: Image },
    { id: 'breeds', label: 'Fajták', icon: Dog },
    { id: 'puppies', label: 'Kiskutyák', icon: Dog },
    { id: 'bookings', label: 'Foglalások', icon: Calendar },
    { id: 'content', label: 'Tartalom', icon: FileText },
    { id: 'menu', label: 'Menü', icon: Menu },
    { id: 'contact', label: 'Kapcsolat', icon: Phone },
    { id: 'settings', label: 'Beállítások', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="hidden sm:flex"
            >
              <Eye className="mr-2 h-4 w-4" />
              Weboldal megtekintése
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Kijelentkezés
            </Button>
          </div>
        </div>
      </header>

      {/* Save Alert */}
      <AnimatePresence>
        {showSaveAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <Check className="h-4 w-4" />
              <AlertDescription>Változtatások sikeresen mentve!</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-amber-100 text-amber-700 border-r-2 border-amber-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800">Áttekintés</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Galéria képek</p>
                            <p className="text-3xl font-bold text-gray-800">{galleryImages.length}</p>
                          </div>
                          <Image className="h-8 w-8 text-amber-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Slideshow képek</p>
                            <p className="text-3xl font-bold text-gray-800">{slideshowImages.length}</p>
                          </div>
                          <Image className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Foglalások</p>
                            <p className="text-3xl font-bold text-gray-800">{bookings.length}</p>
                          </div>
                          <Calendar className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Kiskutyák</p>
                            <p className="text-3xl font-bold text-gray-800">{availablePuppies.length}</p>
                          </div>
                          <Dog className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Bookings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Legutóbbi foglalások</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bookings.slice(0, 5).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold">{booking.name}</p>
                              <p className="text-sm text-gray-600">{booking.phone}</p>
                              <p className="text-sm text-gray-500">{booking.preferred_date}</p>
                            </div>
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            >
                              {booking.status === 'confirmed' ? 'Megerősítve' : 'Függő'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Gallery Management */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Galéria kezelése</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Új kép hozzáadása
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Új kép hozzáadása</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Kép feltöltése</label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setNewImage)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Leírás</label>
                            <Input
                              value={newImage.alt}
                              onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                              placeholder="Kép leírása"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Kategória</label>
                            <select
                              value={newImage.category}
                              onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="puppies">Kiskutyák</option>
                              <option value="maltipoo">Maltipoo</option>
                              <option value="cavapoo">Cavapoo</option>
                              <option value="goldendoodle">Goldendoodle</option>
                              <option value="family">Családi</option>
                            </select>
                          </div>
                          {newImage.src && (
                            <div>
                              <img src={newImage.src} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                            </div>
                          )}
                          <Button onClick={addImage} className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Mentés
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {galleryImages.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => deleteImage(image.id, setGalleryImages, galleryImages)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm font-medium">{image.alt}</p>
                          <Badge variant="outline" className="mt-2">
                            {image.category}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Slideshow Management */}
              {activeTab === 'slideshow' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Slideshow kezelése</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Új slideshow kép
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Új slideshow kép hozzáadása</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Kép feltöltése</label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setNewImage)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Leírás</label>
                            <Input
                              value={newImage.alt}
                              onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                              placeholder="Kép leírása"
                            />
                          </div>
                          {newImage.src && (
                            <div>
                              <img src={newImage.src} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                            </div>
                          )}
                          <Button onClick={addSlideshowImage} className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Mentés
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {slideshowImages.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => deleteImage(image.id, setSlideshowImages, slideshowImages)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm font-medium">{image.alt}</p>
                          <Badge variant="outline" className="mt-2">
                            Slideshow
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Breeds Management */}
              {activeTab === 'breeds' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Fajták kezelése</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Új fajta
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Új fajta hozzáadása</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Fajta neve</label>
                            <Input
                              value={newBreed.name}
                              onChange={(e) => setNewBreed(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="pl. Maltipoo"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Leírás</label>
                            <Textarea
                              value={newBreed.description}
                              onChange={(e) => setNewBreed(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Fajta leírása"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Méret</label>
                              <Input
                                value={newBreed.size}
                                onChange={(e) => setNewBreed(prev => ({ ...prev, size: e.target.value }))}
                                placeholder="pl. Kicsi (3-7 kg)"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Élettartam</label>
                              <Input
                                value={newBreed.lifespan}
                                onChange={(e) => setNewBreed(prev => ({ ...prev, lifespan: e.target.value }))}
                                placeholder="pl. 12-15 év"
                              />
                            </div>
                          </div>
                          <Button onClick={addNewBreed} className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Mentés
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {breeds.map((breed) => (
                      <Card key={breed.id}>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{breed.name}</h3>
                          <p className="text-gray-600 mb-4">{breed.description}</p>
                          <div className="space-y-2">
                            <p className="text-sm"><strong>Méret:</strong> {breed.size}</p>
                            <p className="text-sm"><strong>Élettartam:</strong> {breed.lifespan}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Puppies Management */}
              {activeTab === 'puppies' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Kiskutyák kezelése</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Új kiskutya
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Új kiskutya hozzáadása</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Név</label>
                              <Input
                                value={newPuppy.name}
                                onChange={(e) => setNewPuppy(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="pl. Luna"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Fajta</label>
                              <Input
                                value={newPuppy.breed}
                                onChange={(e) => setNewPuppy(prev => ({ ...prev, breed: e.target.value }))}
                                placeholder="pl. Maltipoo"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Kor</label>
                              <Input
                                value={newPuppy.age}
                                onChange={(e) => setNewPuppy(prev => ({ ...prev, age: e.target.value }))}
                                placeholder="pl. 8 hét"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Ár</label>
                              <Input
                                value={newPuppy.price}
                                onChange={(e) => setNewPuppy(prev => ({ ...prev, price: e.target.value }))}
                                placeholder="pl. 350.000 Ft"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Leírás</label>
                            <Textarea
                              value={newPuppy.description}
                              onChange={(e) => setNewPuppy(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Kiskutya leírása"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Kép feltöltése</label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setNewPuppy)}
                            />
                          </div>
                          <Button onClick={addNewPuppy} className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Mentés
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availablePuppies.map((puppy) => (
                      <Card key={puppy.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold">{puppy.name}</h3>
                              <p className="text-gray-600">{puppy.breed}</p>
                              <p className="text-sm text-gray-500">Kor: {puppy.age}</p>
                              <p className="text-lg font-semibold text-amber-600">{puppy.price}</p>
                              <p className="text-gray-600 mt-2">{puppy.description}</p>
                            </div>
                            {puppy.image && (
                              <img src={puppy.image} alt={puppy.name} className="w-20 h-20 object-cover rounded-md" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Bookings Management */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800">Foglalások kezelése</h2>
                  
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold">{booking.name}</h3>
                              <p className="text-gray-600">📞 {booking.phone}</p>
                              {booking.email && <p className="text-gray-600">✉️ {booking.email}</p>}
                              <p className="text-gray-600">📅 {booking.preferred_date} - {booking.preferred_time}</p>
                              {booking.message && (
                                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                                  💬 {booking.message}
                                </p>
                              )}
                              {booking.dog_name && (
                                <p className="text-gray-600">🐕 Érdeklődés: {booking.dog_name}</p>
                              )}
                            </div>
                            
                            <div className="flex flex-col space-y-2">
                              <Badge 
                                variant={booking.status === 'confirmed' ? 'default' : 
                                        booking.status === 'cancelled' ? 'destructive' : 'secondary'}
                              >
                                {booking.status === 'confirmed' ? 'Megerősítve' : 
                                 booking.status === 'cancelled' ? 'Törölve' : 'Függő'}
                              </Badge>
                              
                              <div className="flex space-x-2">
                                {booking.status === 'pending' && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Megerősít
                                  </Button>
                                )}
                                {booking.status !== 'cancelled' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    Töröl
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteBooking(booking.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {bookings.length === 0 && (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            Nincsenek foglalások
                          </h3>
                          <p className="text-gray-500">
                            A foglalások itt fognak megjelenni
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {/* Content Management */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Tartalom kezelése</h2>
                    <Button onClick={handleSaveChanges} className="bg-amber-600 hover:bg-amber-700">
                      <Save className="mr-2 h-4 w-4" />
                      Változtatások mentése
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Weboldal szövegek</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Főcím</label>
                        <Input
                          value={editingContent.heroTitle}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Alcím</label>
                        <Textarea
                          value={editingContent.heroSubtitle}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Rólunk szöveg</label>
                        <Textarea
                          value={editingContent.aboutText}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, aboutText: e.target.value }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Menu Management */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Menü kezelése</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Új menüpont
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Új menüpont hozzáadása</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Menüpont neve</label>
                            <Input
                              value={newMenuItem.name}
                              onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="pl. Kapcsolat"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Útvonal</label>
                            <Input
                              value={newMenuItem.path}
                              onChange={(e) => setNewMenuItem(prev => ({ ...prev, path: e.target.value }))}
                              placeholder="pl. /contact"
                            />
                          </div>
                          <Button onClick={addNewMenuItem} className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Mentés
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{item.name}</h3>
                              <p className="text-gray-600">{item.path}</p>
                              <Badge variant={item.visible ? 'default' : 'secondary'} className="mt-2">
                                {item.visible ? 'Látható' : 'Rejtett'}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setMenuItems(prev => prev.filter(i => i.id !== item.id))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Management */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Kapcsolat kezelése</h2>
                    <Button onClick={handleSaveChanges} className="bg-amber-600 hover:bg-amber-700">
                      <Save className="mr-2 h-4 w-4" />
                      Változtatások mentése
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Kapcsolati információk</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Telefon</label>
                          <Input
                            value={editingContent.contactPhone}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, contactPhone: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <Input
                            value={editingContent.contactEmail}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, contactEmail: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Instagram</label>
                          <Input
                            value={editingContent.instagram}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, instagram: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Nyitvatartás</label>
                          <Input
                            value={editingContent.openingHours}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, openingHours: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Cím</label>
                        <Input
                          value={editingContent.address}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800">Beállítások</h2>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin beállítások</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Alert>
                        <Settings className="h-4 w-4" />
                        <AlertDescription>
                          Itt tudod módosítani az admin panel beállításait és a weboldal konfigurációját.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;