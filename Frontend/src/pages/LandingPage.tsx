import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { 
  Brain, 
  Users, 
  Shield, 
  Clock, 
  Heart, 
  Stethoscope, 
  FileText, 
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// Define slideshow image URLs
const heroImages = [
  '/images/slide1.webp',
  '/images/slide2.jpeg',
  '/images/slide3.jpeg',
];
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
     <section className="relative overflow-hidden text-white min-h-[90vh]">
      {/* Background Slideshow */}
<div className="absolute inset-0 z-0 slideshow opacity-20"></div>

      
  {/* Slideshow Background */}
  <div className="absolute inset-0 z-0">
    <Slide
      autoplay
      duration={5000}
      transitionDuration={1000}
      infinite
      arrows={false}
      indicators={false}
    >
      {heroImages.map((img, index) => (
        <div key={index} className="w-full h-full">
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Slide>
<div className="absolute inset-0 bg-black opacity-30"></div>

  </div>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        AI-Powered Healthcare
        <span className="block text-teal-200">at Your Fingertips</span>
      </h1>
      <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
        Connect with certified doctors, get AI-powered health predictions, 
        and manage your medical journey with our comprehensive healthcare portal.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/register" 
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center group"
        >
          Get Started Free
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          to="#features" 
          className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Cancer Prognosis Does
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive healthcare platform combines cutting-edge AI technology 
              with expert medical care to provide you with personalized health insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Predictions */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Health Predictions</h3>
              <p className="text-gray-600 mb-4">
                Upload symptoms and medical reports to receive AI-powered health predictions, 
                risk assessments, and personalized recommendations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Disease stage prediction
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Risk assessment analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Treatment recommendations
                </li>
              </ul>
            </div>

            {/* Doctor Network */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors">
                <Stethoscope className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Doctor Network</h3>
              <p className="text-gray-600 mb-4">
                Connect with certified healthcare professionals for consultations, 
                second opinions, and ongoing medical care.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Verified medical professionals
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Instant consultation booking
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Secure communication platform
                </li>
              </ul>
            </div>

            {/* Medical Records */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Medical Records</h3>
              <p className="text-gray-600 mb-4">
                Securely store, manage, and share your complete medical history 
                with healthcare providers in one centralized location.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Secure cloud storage
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Easy report sharing
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  PDF export functionality
                </li>
              </ul>
            </div>

            {/* Real-time Monitoring */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Monitoring</h3>
              <p className="text-gray-600">
                Track your health progress over time with detailed analytics, 
                trend analysis, and personalized health insights.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Availability</h3>
              <p className="text-gray-600">
                Access your health data and connect with healthcare professionals 
                anytime, anywhere, with our round-the-clock platform.
              </p>
            </div>

            {/* Security */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Compliant</h3>
              <p className="text-gray-600">
                Your medical data is protected with enterprise-grade security, 
                encryption, and full HIPAA compliance standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Cancer Prognosis</h2>
              <p className="text-xl text-gray-600 mb-6">
                Founded by a team of healthcare professionals and AI researchers, 
                MedPortal is revolutionizing the way patients and doctors interact 
                with medical information.
              </p>
              <p className="text-gray-600 mb-8">
                Our mission is to democratize healthcare access through intelligent 
                technology, making quality medical care available to everyone, everywhere. 
                We combine the expertise of certified medical professionals with the 
                power of artificial intelligence to provide accurate, timely, and 
                personalized healthcare solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-600">Active Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
                  <div className="text-gray-600">Certified Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Users className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Patient-Centered</h3>
                  <p className="text-sm text-gray-600">Designed with patient needs at the core</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Heart className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Compassionate Care</h3>
                  <p className="text-sm text-gray-600">Empathetic approach to healthcare</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Brain className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                  <p className="text-sm text-gray-600">Cutting-edge artificial intelligence</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Shield className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
                  <p className="text-sm text-gray-600">Your data is always protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients and doctors who trust MedPortal for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Already Have Account?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;