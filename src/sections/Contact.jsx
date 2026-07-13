import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Mohd Areeb',
          from_email: form.email,
          to_email: 'mohdareeb0207@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message — I will reply soon 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        },
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[0_0_80px_rgba(34,211,238,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_40%)]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6 section-card" data-reveal>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Contact</p>
              <h3 className="head-text">Let’s build something memorable</h3>
            </div>

            <p className="max-w-xl text-base text-[color:var(--muted)]">
              Whether you’re launching a product, redesigning an experience, or need a reliable frontend/backend partner,
              I’m ready to help turn your idea into a polished digital experience.
            </p>

            <div className="flex flex-wrap gap-3">
              {['Fast delivery', 'Modern UI', 'Backend ready', 'Performance focused'].map((item) => (
                <span key={item} className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text)]">
                  {item}
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-4">
              <p className="text-sm text-[color:var(--muted)]">Preferred contact</p>
              <a href="mailto:mohdareeb0207@gmail.com" className="mt-2 block text-lg font-semibold text-[color:var(--text)]">
                mohdareeb0207@gmail.com
              </a>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-5 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-5 shadow-[0_0_40px_rgba(2,6,23,0.16)] backdrop-blur-xl sm:p-7 section-card" data-reveal>
            <label className="space-y-2">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-2">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-2">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input min-h-[140px] resize-none"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
