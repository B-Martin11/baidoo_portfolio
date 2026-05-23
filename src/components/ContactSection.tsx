import React from 'react';
import { motion } from 'motion/react';
import { Mail, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactSectionProps {
  cvUrl?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ cvUrl }) => {
  const theme = 'dark';

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      title: formData.subject || 'Nouveau message'
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xxxxxx',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxxxxx',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'
      );

      setStatus({
        type: 'success',
        message: 'Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais. ✅'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou me contacter directement par e-mail. ❌"
      });
    } finally {
      setIsSubmitting(false);
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
                className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                required
                disabled={isSubmitting}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                required
                disabled={isSubmitting}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Sujet"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
              disabled={isSubmitting}
            />

            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 resize-none"
              required
              disabled={isSubmitting}
            />

            {status.type && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm font-medium ${
                  status.type === 'success' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 text-white rounded-xl flex justify-center items-center gap-2 font-semibold transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-slate-700 cursor-not-allowed opacity-70' 
                  : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.98] cursor-pointer shadow-lg shadow-orange-500/25'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer <Send className="w-5 h-5" />
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </section>
  );
};