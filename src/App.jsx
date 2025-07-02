import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Instagram, Facebook, ShoppingBag, Heart, Plus, Menu, X, ArrowRight, Award, Clock, Shield } from 'lucide-react';
import './App.css';

// Product data
const products = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    price: "₹899",
    shortDescription: "Rich chocolate cake with truffle layers",
    fullDescription: "Indulge in our signature chocolate truffle cake made with premium Belgian chocolate. Layered with silky chocolate ganache and topped with chocolate shavings. Perfect for chocolate lovers and special celebrations.",
    rating: 4.8,
    reviews: 245,
    category: "Cake",
    calories: 320,
    fat: "18g",
    cholesterol: "45mg"
  },
  {
    id: 2,
    name: "Vanilla Bean Delight",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    price: "₹749",
    shortDescription: "Classic vanilla cake with fresh cream",
    fullDescription: "Our classic vanilla bean cake is made with real vanilla extract and topped with fresh whipped cream. Light, fluffy, and perfect for any occasion. A timeless favorite that never goes out of style.",
    rating: 4.6,
    reviews: 189,
    category: "Cake",
    calories: 280,
    fat: "15g",
    cholesterol: "38mg"
  },
  {
    id: 3,
    name: "Red Velvet Supreme",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
    price: "₹949",
    shortDescription: "Velvety red cake with cream cheese frosting",
    fullDescription: "Our red velvet cake features a stunning crimson color with a subtle cocoa flavor, topped with rich cream cheese frosting. Moist, tender, and visually striking - perfect for romantic occasions.",
    rating: 4.9,
    reviews: 312,
    category: "Cake",
    calories: 350,
    fat: "20g",
    cholesterol: "52mg"
  },
  {
    id: 4,
    name: "Strawberry Shortcake",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    price: "₹849",
    shortDescription: "Fresh strawberries with fluffy sponge",
    fullDescription: "Light and airy sponge cake layered with fresh strawberries and whipped cream. Made with seasonal strawberries for the perfect balance of sweetness and tartness. A refreshing summer treat.",
    rating: 4.7,
    reviews: 156,
    category: "Cake",
    calories: 260,
    fat: "12g",
    cholesterol: "35mg"
  },
  {
    id: 5,
    name: "Black Forest Cake",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    price: "₹999",
    shortDescription: "Chocolate cake with cherries and cream",
    fullDescription: "Traditional German-style black forest cake with layers of chocolate sponge, fresh cherries, and whipped cream. Finished with chocolate shavings and maraschino cherries for an authentic taste.",
    rating: 4.8,
    reviews: 203,
    category: "Cake",
    calories: 380,
    fat: "22g",
    cholesterol: "48mg"
  },
  {
    id: 6,
    name: "Glazed Donut Delight",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    price: "₹299",
    shortDescription: "Classic glazed donut with sweet coating",
    fullDescription: "Our signature glazed donut features a perfectly soft and fluffy texture with a sweet glaze coating. Made fresh daily with premium ingredients for the perfect balance of sweetness and texture.",
    rating: 4.5,
    reviews: 421,
    category: "Donut",
    calories: 220,
    fat: "12g",
    cholesterol: "25mg"
  },
  {
    id: 7,
    name: "Chocolate Glazed Donut",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop",
    price: "₹329",
    shortDescription: "Rich chocolate donut with chocolate glaze",
    fullDescription: "Crafted with care and baked to perfection, this delectable treat features a moist and rich chocolate cake base that will satisfy your sweet cravings.",
    rating: 4.7,
    reviews: 298,
    category: "Donut",
    calories: 250,
    fat: "14g",
    cholesterol: "28mg"
  },
  {
    id: 8,
    name: "Rainbow Sprinkle Donut",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop",
    price: "₹349",
    shortDescription: "Colorful donut with rainbow sprinkles",
    fullDescription: "Brighten up your day with our rainbow sprinkle donut! A classic vanilla donut base topped with sweet glaze and colorful rainbow sprinkles that bring joy to every bite.",
    rating: 4.6,
    reviews: 187,
    category: "Donut",
    calories: 240,
    fat: "13g",
    cholesterol: "26mg"
  },
  {
    id: 9,
    name: "Classic Cupcake Collection",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop",
    price: "₹199",
    shortDescription: "Assorted cupcakes with colorful frosting",
    fullDescription: "Nothing beats a classic cupcake. Our recipe has had this pastry flying off of our shelves for over 20 years and has been awarded America's most beloved cupcake.",
    rating: 4.9,
    reviews: 534,
    category: "Cupcake",
    calories: 180,
    fat: "8g",
    cholesterol: "22mg"
  },
  {
    id: 10,
    name: "Peach Paradise Tart",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&h=300&fit=crop",
    price: "₹649",
    shortDescription: "Fresh peach tart with vanilla cream",
    fullDescription: "Organic peaches and icing set this tart apart from all others. As one of our most requested items it's clearly a fan favorite and will not disappoint.",
    rating: 4.7,
    reviews: 156,
    category: "Tart",
    calories: 190,
    fat: "9g",
    cholesterol: "18mg"
  }
];

// Modern Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Pruu Cakes
              </span>
              <div className="text-xs text-gray-500 font-medium">Premium Bakery</div>
            </div>
          </div>
          {/* Desktop Menu - right aligned */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <a href="#home" className="text-gray-700 hover:text-rose-600 font-medium transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#about" className="text-gray-700 hover:text-rose-600 font-medium transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#products" className="text-gray-700 hover:text-rose-600 font-medium transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-700 hover:text-rose-600 font-medium transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </a>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-rose-600 transition-colors ml-auto"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-rose-600 font-medium transition-colors">Home</a>
              <a href="#about" className="block text-gray-700 hover:text-rose-600 font-medium transition-colors">About</a>
              <a href="#products" className="block text-gray-700 hover:text-rose-600 font-medium transition-colors">Products</a>
              <a href="#contact" className="block text-gray-700 hover:text-rose-600 font-medium transition-colors">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Modern Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
      </div>
      
      <Navigation />
      
      <div className="relative w-full px-4 py-32 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium border border-rose-200">
              <Award className="w-4 h-4" />
              Certified Premium Bakery
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Crafting Sweet
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent block">
                Memories
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              From our kitchen to your celebrations - experience the artistry of handcrafted cakes, 
              pastries, and desserts made with premium ingredients and boundless creativity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Explore Menu
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 hover:border-rose-500 text-gray-700 hover:text-rose-600 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop"
                alt="Premium Cake"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">100% Fresh</div>
                    <div className="text-sm text-gray-600">Daily Baked</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Fast Delivery</div>
                    <div className="text-sm text-gray-600">Same Day</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-3xl transform rotate-6 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modern About Section
const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full px-4">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium border border-rose-200 mb-6">
              <Award className="w-4 h-4" />
              Our Story
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet the Artist Behind
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent block">
                Every Creation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Where passion meets precision, and every cake tells a story of dedication, 
              creativity, and the finest ingredients crafted with love.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=600&fit=crop"
                  alt="Baker at work"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-3xl transform -rotate-6 scale-105 -z-10"></div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    PP
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Prutha Pandya</h3>
                    <p className="text-rose-600 font-medium">Certified Master Baker</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  With over 5 years of passionate dedication to the art of baking, I've transformed 
                  countless celebrations into unforgettable memories. Every cake that leaves my kitchen 
                  carries a piece of my heart and represents my commitment to excellence.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Cakes Created</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">4.9★</div>
                    <div className="text-sm text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Certified Excellence</h4>
              <p className="text-gray-600 leading-relaxed">
                Professional certification with proven expertise in artisanal baking techniques and food safety standards.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Handcrafted with Love</h4>
              <p className="text-gray-600 leading-relaxed">
                Every creation is meticulously handcrafted with attention to detail and a passion for perfection.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Premium Quality</h4>
              <p className="text-gray-600 leading-relaxed">
                Only the finest ingredients and highest hygiene standards ensure exceptional taste and safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modern Product Card
const ProductCard = ({ product, onViewMore }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-rose-400 text-rose-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-rose-400 text-rose-400 opacity-50" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative overflow-hidden h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {product.category}
          </span>
        </div>
        <button className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-rose-500 hover:text-white">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.shortDescription}</p>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {product.price}
          </span>
          <button
            onClick={() => onViewMore(product)}
            className="bg-gradient-to-r from-gray-800 to-gray-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Product Modal
const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-rose-400 text-rose-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-rose-400 text-rose-400 opacity-50" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-rose-100 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-100 transition-colors shadow-lg z-10"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex flex-col md:flex-row gap-8 p-8">
          <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-2xl shadow-xl border border-gray-100 mb-4"
            />
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
              {product.category}
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-lg font-medium text-gray-700">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">{product.fullDescription}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-gray-50 rounded-xl p-3">
                  <div className="text-xl font-bold text-gray-900">{product.calories}</div>
                  <div className="text-xs text-gray-600">Calories</div>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-3">
                  <div className="text-xl font-bold text-gray-900">{product.fat}</div>
                  <div className="text-xs text-gray-600">Total Fat</div>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-3">
                  <div className="text-xl font-bold text-gray-900">{product.cholesterol}</div>
                  <div className="text-xs text-gray-600">Cholesterol</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                {product.price}
              </span>
              <button className="border-2 border-gray-300 hover:border-rose-500 text-gray-700 hover:text-rose-600 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Products Section
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Cake', 'Donut', 'Cupcake', 'Tart'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full px-4">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium border border-rose-200 mb-6">
              <ShoppingBag className="w-4 h-4" />
              Our Menu
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Delicious Creations
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent block">
                Made Fresh Daily
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our handcrafted collection of premium cakes, pastries, and desserts, 
              each made with the finest ingredients and utmost care.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:text-rose-600 border border-gray-200 hover:border-rose-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewMore={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

// Modern Contact Section
const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium border border-rose-200 mb-6">
              <Phone className="w-4 h-4" />
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Create Something
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent block">
                Sweet Together
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to make your celebration unforgettable? Contact us for custom orders, 
              consultations, or any questions about our delicious creations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">Ready to take your order</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">+91 88500 61007</p>
                <p className="text-gray-600">Mon - Sun: 8:00 AM - 10:00 PM</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">Send us your requirements</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900">hello@pruucakes.com</p>
                <p className="text-gray-600">We'll respond within 24 hours</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">Come taste our creations</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">Mumbai, Maharashtra</p>
                <p className="text-gray-600">Home-based premium bakery</p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/_pruu_cakes_/"
                  className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your phone"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300">
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Anniversary</option>
                    <option>Corporate Event</option>
                    <option>Custom Order</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                
                <button
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => alert('Message sent! We will contact you soon.')}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modern Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">P</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">Pruu Cakes</span>
                  <div className="text-sm text-gray-400">Premium Bakery</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Crafting sweet memories with premium ingredients and boundless creativity. 
                Your celebration deserves nothing less than perfection.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/_pruu_cakes_/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-rose-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-rose-400 transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-rose-400 transition-colors">About</a></li>
                <li><a href="#products" className="text-gray-300 hover:text-rose-400 transition-colors">Products</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-rose-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-rose-400" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-rose-400" />
                  hello@pruucakes.com
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  Mumbai, Maharashtra
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Pruu Cakes. Made with ❤️ for sweet celebrations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <About />
      <Products />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;