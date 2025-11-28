import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { motion } from 'framer-motion';
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

const heroImages = [
  '/images/slide1.webp',
  '/images/slide2.jpeg',
  '/images/slide3.jpeg',
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-screen">
        {/* Background Slideshow */}
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
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center min-h-[90vh]">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your AI Partner
              <span className="block text-teal-200">in the Fight Against Cancer</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-xl mx-auto px-2">
              From early-stage detection to personalized treatment suggestions,
              our system combines AI precision with expert medical guidance to improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Cancer Prognosis Does
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive healthcare platform combines cutting-edge AI technology
              with expert medical care to provide you with personalized health insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-blue-600" />,
                title: 'AI Health Predictions',
                desc: 'Upload symptoms and medical reports to receive AI-powered health predictions, risk assessments, and personalized recommendations.',
                points: ['Disease stage prediction', 'Risk assessment analysis', 'Treatment recommendations'],
                color: 'bg-blue-100 group-hover:bg-blue-200'
              },
              {
                icon: <Stethoscope className="h-8 w-8 text-teal-600" />,
                title: 'Expert Doctor Network',
                desc: 'Connect with certified healthcare professionals for consultations, second opinions, and ongoing medical care.',
                points: ['Verified medical professionals', 'Instant consultation booking', 'Secure communication platform'],
                color: 'bg-teal-100 group-hover:bg-teal-200'
              },
              {
                icon: <FileText className="h-8 w-8 text-indigo-600" />,
                title: 'Digital Medical Records',
                desc: 'Securely store, manage, and share your complete medical history with healthcare providers in one centralized location.',
                points: ['Secure cloud storage', 'Easy report sharing', 'PDF export functionality'],
                color: 'bg-indigo-100 group-hover:bg-indigo-200'
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
                title: 'Health Monitoring',
                desc: 'Track your health progress over time with detailed analytics, trend analysis, and personalized health insights.',
                points: [],
                color: 'bg-emerald-100 group-hover:bg-emerald-200'
              },
              {
                icon: <Clock className="h-8 w-8 text-orange-600" />,
                title: '24/7 Availability',
                desc: 'Access your health data and connect with healthcare professionals anytime, anywhere, with our round-the-clock platform.',
                points: [],
                color: 'bg-orange-100 group-hover:bg-orange-200'
              },
              {
                icon: <Shield className="h-8 w-8 text-red-600" />,
                title: 'HIPAA Compliance ',
                desc: 'Your medical data is safeguarded with advanced encryption, strict access controls, and compliance with healthcare privacy regulations worldwide. ',
                points: [],
                color: 'bg-red-100 group-hover:bg-red-200'
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`${card.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.desc}</p>
                {card.points.length > 0 && (
                  <ul className="space-y-2">
                    {card.points.map((p, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> {p}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Cancer Prognosis</h2>
              <p className="text-xl text-gray-600 mb-6">
                Built by a team of passionate developers, CancerPrognosis leverages modern web technologies and AI techniques to transform the way patients and doctors manage and interact with healthcare information.
              </p>
              <p className="text-gray-600 mb-8">
                Our mission is to democratize healthcare access through intelligent technology,
                making quality medical care available to everyone, everywhere.
                We combine the expertise of certified medical professionals with the power of artificial intelligence
                to provide accurate, timely, and personalized healthcare solutions.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                  <div className="text-gray-600">Active Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">20+</div>
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
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users className="h-8 w-8 text-blue-600 mb-3" />, title: 'Patient-Centered', desc: 'Designed with patient needs at the core' },
                  { icon: <Heart className="h-8 w-8 text-red-600 mb-3" />, title: 'Compassionate Care', desc: 'Empathetic approach to healthcare' },
                  { icon: <Brain className="h-8 w-8 text-purple-600 mb-3" />, title: 'AI-Powered', desc: 'Cutting-edge artificial intelligence' },
                  { icon: <Shield className="h-8 w-8 text-green-600 mb-3" />, title: 'Secure & Private', desc: 'Your data is always protected' }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform">
                    {card.icon}
                    <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <motion.div
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients and doctors who trust CancerPrognosis for their healthcare needs.
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
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
