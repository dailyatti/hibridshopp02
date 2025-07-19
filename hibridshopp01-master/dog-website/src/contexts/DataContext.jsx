import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [availablePuppies, setAvailablePuppies] = useState([]);
  const [siteContent, setSiteContent] = useState({
    heroTitle: 'Hibrid Shopp',
    heroSubtitle: 'Prémium hibrid kutyafajták szeretettel és gondossággal',
    aboutText: 'Több mint 10 éves tapasztalattal rendelkezünk a hibrid kutyafajták tenyésztésében',
    contactPhone: '+36 70 217 8885',
    contactEmail: 'shoppdogg583@gmail.com',
    instagram: '@hibridshopp',
    openingHours: 'Hétfő-Péntek 8:00-22:00',
    address: 'Budapest, Magyarország'
  });
  const [slideshowImages, setSlideshowImages] = useState([]);
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Főoldal', path: '/', visible: true, order: 1 },
    { id: 2, name: 'Galéria', path: '/gallery', visible: true, order: 2 },
    { id: 3, name: 'Kiskutyák', path: '/puppies', visible: true, order: 3 },
    { id: 4, name: 'Időpontfoglalás', path: '/booking', visible: true, order: 4 },
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedGalleryImages = localStorage.getItem('hibridshop_gallery_images');
    const savedBookings = localStorage.getItem('hibridshop_bookings');
    const savedBreeds = localStorage.getItem('hibridshop_breeds');
    const savedPuppies = localStorage.getItem('hibridshop_puppies');
    const savedSiteContent = localStorage.getItem('hibridshop_site_content');
    const savedSlideshowImages = localStorage.getItem('hibridshop_slideshow_images');
    const savedMenuItems = localStorage.getItem('hibridshop_menu_items');

    if (savedGalleryImages) {
      setGalleryImages(JSON.parse(savedGalleryImages));
    }
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    if (savedBreeds) {
      setBreeds(JSON.parse(savedBreeds));
    }
    if (savedPuppies) {
      setAvailablePuppies(JSON.parse(savedPuppies));
    }
    if (savedSiteContent) {
      setSiteContent(JSON.parse(savedSiteContent));
    }
    if (savedSlideshowImages) {
      setSlideshowImages(JSON.parse(savedSlideshowImages));
    }
    if (savedMenuItems) {
      setMenuItems(JSON.parse(savedMenuItems));
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('hibridshop_gallery_images', JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem('hibridshop_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('hibridshop_breeds', JSON.stringify(breeds));
  }, [breeds]);

  useEffect(() => {
    localStorage.setItem('hibridshop_puppies', JSON.stringify(availablePuppies));
  }, [availablePuppies]);

  useEffect(() => {
    localStorage.setItem('hibridshop_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('hibridshop_slideshow_images', JSON.stringify(slideshowImages));
  }, [slideshowImages]);

  useEffect(() => {
    localStorage.setItem('hibridshop_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  // Add new booking
  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  // Add new breed
  const addBreed = (breed) => {
    const newBreed = {
      id: Date.now(),
      ...breed,
      created_at: new Date().toISOString()
    };
    setBreeds(prev => [...prev, newBreed]);
    return newBreed;
  };

  // Add new puppy
  const addPuppy = (puppy) => {
    const newPuppy = {
      id: Date.now(),
      ...puppy,
      available: true,
      created_at: new Date().toISOString()
    };
    setAvailablePuppies(prev => [...prev, newPuppy]);
    return newPuppy;
  };

  // Add new menu item
  const addMenuItem = (menuItem) => {
    const newMenuItem = {
      id: Date.now(),
      ...menuItem,
      visible: true,
      order: menuItems.length + 1
    };
    setMenuItems(prev => [...prev, newMenuItem]);
    return newMenuItem;
  };

  // Add slideshow image
  const addSlideshowImage = (image) => {
    const newImage = {
      id: Date.now(),
      ...image,
      created_at: new Date().toISOString()
    };
    setSlideshowImages(prev => [...prev, newImage]);
    return newImage;
  };

  const value = {
    galleryImages,
    setGalleryImages,
    bookings,
    setBookings,
    addBooking,
    breeds,
    setBreeds,
    addBreed,
    availablePuppies,
    setAvailablePuppies,
    addPuppy,
    siteContent,
    setSiteContent,
    slideshowImages,
    setSlideshowImages,
    addSlideshowImage,
    menuItems,
    setMenuItems,
    addMenuItem
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};