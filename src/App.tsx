import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Star, Users, TrendingUp, Shield, Sparkles, ArrowRight, Check, Instagram, Twitter, Mail, Play, DollarSign, Calendar, MessageCircle, Heart, Eye, Zap, ChevronLeft, ChevronRight, Quote, Award, Target, Briefcase, Globe, Camera, Video, Mic, X } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSuccess, setCurrentSuccess] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    revenue: '',
    platforms: [],
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Banner rotation data with realistic earnings
  const bannerData = [
    {
      title: "Unleash Creative Mastery",
      platforms: [
        { name: "OnlyFans", icon: <Heart className="h-5 w-5" />, color: "bg-blue-500" },
        { name: "Instagram", icon: <Instagram className="h-5 w-5" />, color: "bg-pink-500" },
        { name: "TikTok", icon: <Video className="h-5 w-5" />, color: "bg-black" },
        { name: "Twitter", icon: <Twitter className="h-5 w-5" />, color: "bg-blue-400" },
      ],
      earnings: {
        subscription: "$18,613.41",
        messages: "$25,524.23",
        tips: "$33,620.52",
        total: "$77,758.16"
      }
    },
    {
      title: "Scale Your Digital Empire",
      platforms: [
        { name: "Fansly", icon: <Star className="h-5 w-5" />, color: "bg-purple-500" },
        { name: "YouTube", icon: <Play className="h-5 w-5" />, color: "bg-red-500" },
        { name: "Twitch", icon: <Video className="h-5 w-5" />, color: "bg-purple-600" },
        { name: "Snapchat", icon: <Camera className="h-5 w-5" />, color: "bg-yellow-400" },
      ],
      earnings: {
        subscription: "$22,891.15",
        messages: "$19,234.67",
        tips: "$31,456.89",
        total: "$73,582.71"
      }
    },
    {
      title: "Maximize Revenue Streams",
      platforms: [
        { name: "Patreon", icon: <Briefcase className="h-5 w-5" />, color: "bg-orange-500" },
        { name: "Discord", icon: <MessageCircle className="h-5 w-5" />, color: "bg-indigo-500" },
        { name: "Reddit", icon: <Globe className="h-5 w-5" />, color: "bg-orange-600" },
        { name: "Telegram", icon: <Mic className="h-5 w-5" />, color: "bg-blue-500" },
      ],
      earnings: {
        subscription: "$35,247.83",
        messages: "$24,567.91",
        tips: "$28,923.45",
        total: "$88,739.19"
      }
    }
  ];

  // Testimonials carousel data
  const testimonials = [
    {
      quote: "Gal Scout transformed my entire approach to content creation. My revenue increased by 300% in just 6 months while maintaining my authentic voice.",
      author: "Luna M.",
      role: "Content Creator",
      avatar: null,
      gradient: "from-rose-pink to-lavender",
      earnings: "$45K/month"
    },
    {
      quote: "The team's expertise in brand strategy helped me build a loyal community of over 100K followers. Their support is unmatched in the industry.",
      author: "Aria K.",
      role: "Digital Influencer",
      avatar: null,
      gradient: "from-lavender to-rose-pink",
      earnings: "$38K/month"
    },
    {
      quote: "Working with Gal Scout has been life-changing. They helped me scale from $5K to $50K monthly while keeping my content strategy authentic.",
      author: "Sophia R.",
      role: "Creator & Entrepreneur",
      avatar: null,
      gradient: "from-purple-500 to-pink-500",
      earnings: "$52K/month"
    }
  ];

  // Success stories carousel data
  const successStories = [
    {
      title: "From Zero to Hero",
      description: "Luna started with 500 followers and now earns $45K monthly",
      gradient: "from-rose-pink to-lavender",
      icon: <TrendingUp className="h-12 w-12" />,
      stats: { followers: "150K", revenue: "$45K/mo", growth: "300%" }
    },
    {
      title: "Brand Transformation",
      description: "Aria's strategic rebrand led to explosive growth",
      gradient: "from-lavender to-purple-500",
      icon: <Star className="h-12 w-12" />,
      stats: { followers: "200K", revenue: "$38K/mo", growth: "250%" }
    },
    {
      title: "Multi-Platform Success",
      description: "Sophia's diversified approach across 5 platforms",
      gradient: "from-purple-500 to-pink-500",
      icon: <Users className="h-12 w-12" />,
      stats: { followers: "300K", revenue: "$52K/mo", growth: "400%" }
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Much slower banner rotation - 12 seconds
    const bannerInterval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentBanner((prev) => (prev + 1) % bannerData.length);
          setTimeout(() => setIsTransitioning(false), 500);
        }, 200);
      }
    }, 12000);

    // Testimonials carousel - 8 seconds
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    // Success stories carousel - 10 seconds
    const successInterval = setInterval(() => {
      setCurrentSuccess((prev) => (prev + 1) % successStories.length);
    }, 10000);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(bannerInterval);
      clearInterval(testimonialInterval);
      clearInterval(successInterval);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isTransitioning]);

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSuccess = () => {
    setCurrentSuccess((prev) => (prev + 1) % successStories.length);
  };

  const prevSuccess = () => {
    setCurrentSuccess((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Using Formspree with your form ID
      const response = await fetch('https://formspree.io/f/mvgrnwbw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          revenue: formData.revenue,
          platforms: formData.platforms.join(', '),
          goals: formData.goals,
          timestamp: new Date().toISOString(),
          source: 'Gal Scout Website'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          revenue: '',
          platforms: [],
          goals: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-cream font-inter overflow-x-hidden">
      {/* Animated Background Elements - Much Slower */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-rose-pink/2 to-lavender/2 rounded-full blur-3xl animate-float-background opacity-60"
          style={{
            left: mousePosition.x * 0.01 + 'px',
            top: mousePosition.y * 0.01 + 'px',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-lavender/2 to-rose-pink/2 rounded-full blur-3xl animate-float-background opacity-40"
          style={{
            right: mousePosition.x * -0.005 + 'px',
            bottom: mousePosition.y * -0.005 + 'px',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Navigation - Fixed Alignment */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-slide-in-left">
              <Sparkles className="h-7 w-7 text-rose-pink animate-pulse-slow" />
              <span className="text-xl font-playfair font-bold text-rich-black">Gal Scout</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <a href="#services" className="text-rich-black/80 hover:text-rose-pink transition-all duration-500 text-sm font-medium hover-lift">Services</a>
              <a href="#success" className="text-rich-black/80 hover:text-rose-pink transition-all duration-500 text-sm font-medium hover-lift">Success</a>
              <a href="#apply" className="btn-primary bg-rich-black text-white px-6 py-2.5 rounded-full hover:bg-rich-black/80 transition-all duration-500 text-sm font-medium transform hover:scale-105 hover:shadow-lg">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slower Rotating Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cream/50 to-lavender/5 pt-20 md:pt-16">
        {/* Slower Floating Platform Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {bannerData[currentBanner].platforms.map((platform, index) => (
            <div
              key={`${currentBanner}-${index}`}
              className={`absolute w-16 h-16 ${platform.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-1000 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-20 animate-float-enhanced'
              }`}
              style={{
                left: `${15 + index * 20}%`,
                top: `${20 + index * 15}%`,
                animationDelay: `${index * 1}s`,
                animationDuration: '15s'
              }}
            >
              {platform.icon}
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-rich-black mb-6 leading-tight">
                {bannerData[currentBanner].title.split(' ').map((word, index) => (
                  <span key={index} className={`transition-all duration-1000 ${
                    index === bannerData[currentBanner].title.split(' ').length - 1 
                      ? 'text-transparent bg-gradient-to-r from-rose-pink to-lavender bg-clip-text' 
                      : ''
                  } ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-base md:text-lg text-rich-black/70 mb-8 max-w-lg leading-relaxed transition-all duration-700">
                Transform your photos and videos into a thriving online empire with our premium agency support and proven monetization strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#apply" className="group btn-primary bg-rich-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-rich-black/80 transition-all duration-500 transform hover:scale-105 relative overflow-hidden hover:shadow-xl text-center">
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Start Your Journey
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
                <a href="#success" className="group border border-rich-black/20 text-rich-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-rich-black/5 transition-all duration-500 transform hover:scale-105 hover:shadow-lg text-center">
                  <span className="flex items-center gap-2">
                    <Play className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    View Success Stories
                  </span>
                </a>
              </div>
            </div>

            {/* Right Side - Slower Rotating Banner */}
            <div className="relative">
              {/* Main Platform Cards */}
              <div className={`grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 transition-all duration-1000 ${
                isTransitioning ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
              }`}>
                {bannerData[currentBanner].platforms.map((platform, index) => (
                  <div
                    key={`platform-${currentBanner}-${index}`}
                    className="card-enhanced p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg cursor-pointer"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${platform.color} rounded-xl flex items-center justify-center text-white text-lg md:text-xl mb-3 platform-logo`}>
                      {platform.icon}
                    </div>
                    <h3 className="font-semibold text-rich-black text-sm md:text-base text-smooth">{platform.name}</h3>
                  </div>
                ))}
              </div>

              {/* OnlyFans-Style Earnings Dashboard */}
              <div className={`bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 transition-all duration-1000 hover:shadow-lg ${
                isTransitioning ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
              }`}>
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-semibold text-rich-black text-sm md:text-base">Successful payout</h3>
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-rich-black/60 mb-3 md:mb-4">The money is on route to your bank!</p>
                <div className="text-xs text-rich-black/60 mb-2 md:mb-3">From Dec 2024 to Jan 2025</div>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="earnings-item flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs md:text-sm text-rich-black/70">Subscription</span>
                    </div>
                    <span className="font-semibold text-rich-black text-xs md:text-sm">{bannerData[currentBanner].earnings.subscription}</span>
                  </div>
                  <div className="earnings-item flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs md:text-sm text-rich-black/70">Messages</span>
                    </div>
                    <span className="font-semibold text-rich-black text-xs md:text-sm">{bannerData[currentBanner].earnings.messages}</span>
                  </div>
                  <div className="earnings-item flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-rose-pink rounded-full"></div>
                      <span className="text-xs md:text-sm text-rich-black/70">Tips</span>
                    </div>
                    <span className="font-semibold text-rich-black text-xs md:text-sm">{bannerData[currentBanner].earnings.tips}</span>
                  </div>
                  <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                    <div className="earnings-item flex justify-between items-center">
                      <span className="text-xs md:text-sm font-semibold text-rich-black">Total</span>
                      <span className="font-bold text-rich-black text-base md:text-lg text-transparent bg-gradient-to-r from-rose-pink to-lavender bg-clip-text">
                        {bannerData[currentBanner].earnings.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner Indicators */}
              <div className="flex justify-center mt-4 md:mt-6 space-x-2">
                {bannerData.map((_, index) => (
                  <button
                    key={index}
                    className={`banner-indicator w-2 h-2 rounded-full transition-all duration-700 ${
                      index === currentBanner ? 'bg-rose-pink w-8' : 'bg-gray-300'
                    }`}
                    onClick={() => !isTransitioning && setCurrentBanner(index)}
                    disabled={isTransitioning}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section id="services" className="py-20 bg-white relative" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-rich-black mb-4">
              Premium Services
            </h2>
            <p className="text-base md:text-lg text-rich-black/70 max-w-2xl mx-auto px-4">
              Comprehensive support designed to amplify your success while protecting your autonomy and voice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: <Star className="h-6 w-6" />,
                title: "Brand Strategy",
                description: "Develop a compelling personal brand that resonates with your audience and drives engagement.",
                delay: '0s'
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Fan Engagement",
                description: "Build lasting relationships with your community through strategic content and interaction.",
                delay: '0.2s'
              },
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: "Monetization",
                description: "Maximize revenue through proven strategies tailored to your unique audience.",
                delay: '0.4s'
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Content Strategy",
                description: "Create compelling content that drives growth and maintains your authentic voice.",
                delay: '0.6s'
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "Digital Growth",
                description: "Scale your platform with data-driven growth strategies and optimization.",
                delay: '0.8s'
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "24/7 Support",
                description: "Access to our team whenever you need guidance, support, or strategic advice.",
                delay: '1s'
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`group card-enhanced p-4 md:p-6 bg-white rounded-xl md:rounded-2xl border border-gray-100 cursor-pointer ${
                  isVisible('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  animationDelay: service.delay,
                  transitionDelay: isVisible('services') ? service.delay : '0s'
                }}
              >
                <div className="text-rose-pink mb-4 group-hover:text-lavender transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                  {service.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-rich-black mb-3 group-hover:text-rose-pink transition-all duration-500 text-smooth">
                  {service.title}
                </h3>
                <p className="text-rich-black/70 text-sm leading-relaxed group-hover:text-rich-black transition-all duration-500">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Success Stories Carousel */}
      <section id="success" className="py-20 bg-white relative" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible('success') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-rich-black mb-4">
              Client Success Stories
            </h2>
            <p className="text-base md:text-lg text-rich-black/70 max-w-2xl mx-auto px-4">
              Real results from creators who transformed their platforms with Gal Scout.
            </p>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
            {[
              { number: "300%", label: "Average Revenue Growth", delay: '0s' },
              { number: "50K+", label: "New Fans Generated", delay: '0.2s' },
              { number: "15+", label: "Platforms Supported", delay: '0.4s' },
              { number: "24/7", label: "Support Availability", delay: '0.6s' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group cursor-pointer transition-all duration-1000 transform hover:scale-110 ${
                  isVisible('success') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible('success') ? stat.delay : '0s'
                }}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-transparent bg-gradient-to-r from-rose-pink to-lavender bg-clip-text mb-2 group-hover:animate-pulse">
                  {stat.number}
                </div>
                <div className="text-rich-black/70 text-xs md:text-sm group-hover:text-rich-black transition-colors duration-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Success Stories Carousel */}
          <div className="relative mb-12 md:mb-16">
            <div className="overflow-hidden rounded-xl md:rounded-2xl">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSuccess * 100}%)` }}
              >
                {successStories.map((story, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center p-4 md:p-0">
                      <div className="relative overflow-hidden rounded-xl md:rounded-2xl h-64 md:h-80">
                        <div className={`w-full h-full bg-gradient-to-br ${story.gradient} flex items-center justify-center relative group cursor-pointer`}>
                          <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
                            {story.icon}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-rich-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                            <h3 className="text-xl md:text-2xl font-playfair font-bold mb-2">{story.title}</h3>
                            <p className="text-white/90 text-sm md:text-base">{story.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                          <div className="text-center p-3 md:p-4 bg-cream/50 rounded-lg md:rounded-xl hover:bg-cream transition-colors duration-500">
                            <div className="text-lg md:text-2xl font-bold text-rose-pink mb-1">{story.stats.followers}</div>
                            <div className="text-xs md:text-sm text-rich-black/70">Followers</div>
                          </div>
                          <div className="text-center p-3 md:p-4 bg-cream/50 rounded-lg md:rounded-xl hover:bg-cream transition-colors duration-500">
                            <div className="text-lg md:text-2xl font-bold text-lavender mb-1">{story.stats.revenue}</div>
                            <div className="text-xs md:text-sm text-rich-black/70">Revenue</div>
                          </div>
                          <div className="text-center p-3 md:p-4 bg-cream/50 rounded-lg md:rounded-xl hover:bg-cream transition-colors duration-500">
                            <div className="text-lg md:text-2xl font-bold text-rich-black mb-1">{story.stats.growth}</div>
                            <div className="text-xs md:text-sm text-rich-black/70">Growth</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls - Desktop Only */}
            <div className="hidden md:block">
              <button 
                onClick={prevSuccess}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5 text-rich-black" />
              </button>
              <button 
                onClick={nextSuccess}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5 text-rich-black" />
              </button>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-4 md:mt-6 space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentSuccess ? 'bg-rose-pink w-8' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSuccess(index)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Enhanced Apply Section */}
      <section id="apply" className="py-20 bg-gradient-to-br from-lavender/5 to-rose-pink/5 relative" data-animate>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible('apply') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-rich-black mb-6">
              Ready to Transform Your Platform?
            </h2>
            <p className="text-base md:text-lg text-rich-black/70 mb-8 max-w-2xl mx-auto">
              Join an exclusive community of creators who've partnered with Gal Scout to build their digital empires.
            </p>
          </div>

          {/* Application Form */}
          <div className={`bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8 transition-all duration-1000 hover:shadow-lg ${
            isVisible('apply') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{transitionDelay: '0.2s'}}>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-medium">Application submitted successfully!</p>
                </div>
                <p className="text-green-700 text-sm mt-1">We'll review your application and get back to you within 48 hours.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <X className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-red-800 font-medium">There was an error submitting your application.</p>
                </div>
                <p className="text-red-700 text-sm mt-1">Please try again or contact us directly at hello@galscout.com</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-rich-black mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-pink/20 focus:border-rose-pink transition-all duration-300 text-sm md:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rich-black mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-pink/20 focus:border-rose-pink transition-all duration-300 text-sm md:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-rich-black mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-pink/20 focus:border-rose-pink transition-all duration-300 text-sm md:text-base"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rich-black mb-2">Current Monthly Revenue</label>
                  <select 
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-pink/20 focus:border-rose-pink transition-all duration-300 text-sm md:text-base"
                  >
                    <option>Select range</option>
                    <option value="0-1000">$0 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-25000">$10,000 - $25,000</option>
                    <option value="25000+">$25,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rich-black mb-3">Platforms (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  {['OnlyFans', 'Instagram', 'TikTok', 'Twitter', 'YouTube', 'Twitch', 'Snapchat', 'Other'].map((platform) => (
                    <label key={platform} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300">
                      <input 
                        type="checkbox" 
                        checked={formData.platforms.includes(platform)}
                        onChange={(e) => handlePlatformChange(platform, e.target.checked)}
                        className="rounded border-gray-300 text-rose-pink focus:ring-rose-pink" 
                      />
                      <span className="text-sm text-rich-black">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rich-black mb-2">Tell us about your goals</label>
                <textarea 
                  rows={3}
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-pink/20 focus:border-rose-pink transition-all duration-300 text-sm md:text-base"
                  placeholder="What are you hoping to achieve with Gal Scout? What challenges are you facing?"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary bg-rich-black text-white py-3 md:py-4 rounded-lg font-medium hover:bg-rich-black/80 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>

          <div className={`text-center transition-all duration-1000 ${
            isVisible('apply') ? 'opacity-100' : 'opacity-0'
          }`} style={{transitionDelay: '0.4s'}}>
            <p className="text-xs text-rich-black/60 px-4">
              Applications reviewed within 48 hours. Serious inquiries only.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-rich-black text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-pink/5 to-lavender/5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-2 animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-rose-pink animate-pulse-slow" />
                <span className="text-xl font-playfair font-bold">Gal Scout</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md text-sm leading-relaxed">
                Empowering creators to build successful digital businesses through premium agency support and strategic guidance.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/galscout" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-white/70 hover:text-rose-pink cursor-pointer transition-all duration-500 transform hover:scale-125" />
                </a>
                <a href="https://twitter.com/galscout" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-white/70 hover:text-rose-pink cursor-pointer transition-all duration-500 transform hover:scale-125" />
                </a>
                <a href="mailto:hello@galscout.com">
                  <Mail className="h-5 w-5 text-white/70 hover:text-rose-pink cursor-pointer transition-all duration-500 transform hover:scale-125" />
                </a>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h4 className="font-semibold mb-4 text-sm">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#services" className="hover:text-rose-pink transition-all duration-500 hover-lift">Brand Strategy</a></li>
                <li><a href="#services" className="hover:text-rose-pink transition-all duration-500 hover-lift">Fan Engagement</a></li>
                <li><a href="#services" className="hover:text-rose-pink transition-all duration-500 hover-lift">Monetization</a></li>
                <li><a href="#services" className="hover:text-rose-pink transition-all duration-500 hover-lift">Content Strategy</a></li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <h4 className="font-semibold mb-4 text-sm">Get Started</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#apply" className="hover:text-rose-pink transition-all duration-500 hover-lift">Apply Now</a></li>
                <li><a href="#success" className="hover:text-rose-pink transition-all duration-500 hover-lift">Success Stories</a></li>
                <li><a href="#services" className="hover:text-rose-pink transition-all duration-500 hover-lift">Our Services</a></li>
                <li><a href="mailto:hello@galscout.com" className="hover:text-rose-pink transition-all duration-500 hover-lift">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-white/60 animate-fade-in-up text-xs md:text-sm" style={{animationDelay: '0.6s'}}>
            <p>&copy; 2024 Gal Scout. All rights reserved. Empowering creators, one success story at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;