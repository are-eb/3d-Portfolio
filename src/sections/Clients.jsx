import { useEffect, useState } from 'react';

import { clientReviews } from '../constants/index.js';

const Clients = () => {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((prev) => (prev === clientReviews.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="c-space my-20">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Testimonials</p>
        <h3 className="head-text">What clients say about working with me</h3>
      </div>

      <div className="client-container">
        {clientReviews.map((item, index) => {
          const isActive = index === activeReview;

          return (
            <div
              key={`review-${item.id}`}
              className={`client-review section-card ${isActive ? 'ring-1 ring-cyan-400/40 shadow-[0_0_45px_rgba(34,211,238,0.14)]' : 'opacity-80'}`}
              data-reveal
            >
              <div>
                <p className="font-light text-[color:var(--text)]">{item.review}</p>

                <div className="client-content">
                  <div className="flex gap-3">
                    <img src={item.img} alt="reviewer" className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <p className="font-semibold text-[color:var(--text)]">{item.name}</p>
                      <p className="text-sm font-light text-[color:var(--muted)] md:text-base">{item.position}</p>
                    </div>
                  </div>

                  <div className="flex self-end items-center gap-2">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <img key={`${item.id}-${starIndex}`} src="/assets/star.png" alt="star" className="h-5 w-5" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Clients;
