import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, Download } from 'lucide-react';

export const ContactSection = ({ cvUrl }) => {
  const theme = 'dark';

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5678/webhook/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Message envoyé ✅");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("Erreur lors de l'envoi ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau ❌");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            On discute de votre <span className="text-gradient">prochain défi ?</span>
          </motion.h2>

          <p className="text-slate-400 text-lg mb-10 max-w-md">
            Je suis toujours ouvert à de nouvelles opportunités, collaborations ou simplement pour échanger sur la tech.
          </p>

          <div className="space-y-6">
            <a href="mailto:baidookoffimartin@gmail.com" className="flex items-center gap-4 group">
              <div className="p-4 glass-card rounded-2xl">
                <Mail className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                <p className="text-white">baidookoffimartin@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        <motion.div className="glass-card p-8 rounded-3xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <input
                type="text"
                name="name"
                placeholder="Nom"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Sujet"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white"
            />

            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white"
              required
            />

            <button className="w-full py-5 bg-orange-500 text-white rounded-xl flex justify-center gap-2">
              Envoyer <Send className="w-5 h-5" />
            </button>

          </form>
        </motion.div>
      </div>
    </section>
  );
};