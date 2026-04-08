'use client';

import MainLayout from '@/components/layout/MainLayout';
import {
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  FileText,
  Smartphone,
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CONTACTS = [
  {
    label: 'Email',
    icon: <Mail size={18} />,
    href: 'mailto:aimeserge512@gmail.com',
    display: 'aimeserge512@gmail.com',
  },
  {
    label: 'LinkedIn',
    icon: <Linkedin size={18} />,
    href: 'https://www.linkedin.com/in/aime-serge-ukobizaba-945705347/',
    display: 'linkedin.com/in/Aime-Serge-Ukobizaba',
  },
  {
    label: 'Twitter/X',
    icon: <Twitter size={18} />,
    href: 'https://twitter.com/AimeSerge_Uk60',
    display: '@AimeSerge_Uk60',
  },
  {
    label: 'Instagram',
    icon: <Instagram size={18} />,
    href: 'https://www.instagram.com/aimeserge_02/',
    display: '@aimeserge_02',
  },
  {
    label: 'Facebook',
    icon: <Facebook size={18} />,
    href: 'https://www.facebook.com/AimeSerge',
    display: 'facebook.com/AimeSerge',
  },
  {
    label: 'GitHub',
    icon: <Github size={18} />,
    href: 'https://github.com/Aime-Serge',
    display: 'github.com/Aime-Serge',
  },
  {
    label: 'Discord',
    icon: <FaDiscord size={18} />,
    href: 'https://discord.com/users/AimeSergeUKOBIZABA',
    display: 'Aime Serge UKOBIZABA',
  },
  {
    label: 'WhatsApp',
    icon: <Smartphone size={18} />,
    href: 'https://wa.me/250792957513',
    display: '+250 792957513',
  },
  {
    label: 'Resume',
    icon: <FileText size={18} />,
    href: '/uploads/AimeSergeUkobizabaResume.pdf',
    display: 'View Resume PDF',
  },
];

export default function ContactPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    // 👇 Header removed only here
    <MainLayout showHeader={false}>
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-3xl font-bold mb-4">📨 Contact Me</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          I’m always open to opportunities, collaborations, or just a thoughtful
          chat about Computer Science, software engineering, or research.
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto">
          I welcome opportunities for collaboration, research discussions,
          mentorship, or software engineering projects. Connect with me through
          any of the channels below or send a message directly.
        </p>
      </section>

      {/* Divider */}
      <hr className="border-gray-300 my-12 max-w-4xl mx-auto" />

      {/* Connect With Me */}
      <section className="py-12 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Connect With Me
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CONTACTS.map((contact, i) => (
            <motion.a
              key={i}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className={`flex items-center justify-center gap-3 p-4 border rounded-xl shadow-sm transition ${
                contact.label === 'Resume'
                  ? 'border-2 border-green-500 bg-green-50 text-green-700 font-semibold hover:shadow-lg hover:-translate-y-1'
                  : 'bg-gray-50 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {contact.icon}
              <span>{contact.display}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr className="border-gray-300 my-12 max-w-4xl mx-auto" />

      {/* Academic & Research Links */}
      <motion.section
        className="py-12 bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          📚 Academic & Research Links
        </h2>
        <p className="text-gray-700 text-center mb-4">
          Explore my academic contributions, research papers, and professional
          publications.
        </p>
        <ul className="list-disc list-inside text-gray-800 max-w-2xl mx-auto space-y-2 text-center">
          <li>
            <a
              href="https://scholar.google.com/citations?user=yourID"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800 transition-colors"
            >
              Google Scholar
            </a>
          </li>
          <li>
            <a
              href="https://www.researchgate.net/profile/YourName"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800 transition-colors"
            >
              ResearchGate
            </a>
          </li>
          <li>
            <a
              href="https://orcid.org/0000-0000-0000-0000"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800 transition-colors"
            >
              ORCID
            </a>
          </li>
        </ul>
      </motion.section>

      {/* Divider */}
      <hr className="border-gray-300 my-12 max-w-4xl mx-auto" />

      {/* Contact Form */}
      <motion.section
        className="py-12 bg-white max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          ✉️ Send Me a Message
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows={5}
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.section>

      {/* Divider */}
      <hr className="border-gray-300 my-12 max-w-4xl mx-auto" />

      {/* Google Map */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-6">
          📍 My Location
        </h2>
        <div className="max-w-4xl mx-auto h-80 border rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.123456789!2d30.061697!3d-1.944099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1xxxxxxxxxxxxxxx%3A0x123456789abcdef!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1695000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/250792957513"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center group"
        aria-label="Chat on WhatsApp"
      >
        <Smartphone size={28} />
        <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 bg-green-600 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap shadow-lg">
          Chat with me
        </span>
      </a>
    </MainLayout>
  );
}
