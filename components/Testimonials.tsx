'use client';

import { useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Testimonials.module.css';

const ASSETS = '/assets';
const logos = [
  '36-BYmUdUVup2YUUxOfGwxy8YwQeA.svg', '37-OWtLujOOix0n4pxqKT1LAd1ZQ.svg',
  '38-nxHl5Bg1kSZaTBj270c6qQSVJw.svg', '39-alYYFBOOgdz1vmYeHfepPw5oUY.svg',
  '40-hSA21XpPY3l60xXg9NxgBLM2f5Y.svg', '41-QY4Cv32HUNzie3i29eP2hglNeyg.svg',
  '42-paL0gmozCQPt7FarFcmJgRk0Iio.svg', '43-J5TmYx4jX1KXLXYb5nWKGQkFY.svg',
  '44-Rft04Iq3DF5HTEPAepMwAGHsc.svg', '45-BtPdnahBj4skjbKS7JN8pnQq70Y.svg',
];
const testimonials = [
  { quote: 'Strong leadership support improved how we plan for the future. We finally feel confident about our direction.', name: 'Michael Turner', role: ' CFO, BrightCore Solutions (USA)', image: '12-cGxorl1hAIehOBiq5qhM8L1tY.jpg' },
  { quote: 'Expert advice completely reshaped how we plan for long-term growth. We finally feel confident about our next steps.', name: 'Daniel Carter', role: 'Chief Marketing Officer', image: '49-5DcbALNUnjJXHIyj3uyYtCsL0g.jpg' },
  { quote: 'Clear strategic direction changed the way we approach scaling. We now feel secure and aligned with our goals.', name: 'Olivia Bennett', role: 'Chief Executive Officer', image: '51-wuxDBNpxLOTsnRV3sxMnbEkVI.jpg' },
  { quote: 'Professional guidance transformed how we structure our expansion plans. We finally feel confident about where we’re heading.', name: 'Sophia Mitchell', role: 'Operations Manager', image: '52-8wT49sb1A8pbDkeMwDepXNp4h4.jpg' },
  { quote: 'Smart insights refined the way we handle growth decisions. We now feel confident about our overall strategy.', name: 'Daniel Harper', role: 'Chief Financial Officer', image: '53-4yYDow1rE6OFVt65ahYPwjN3Jw.jpg' },
];

type RailStyle = CSSProperties & { '--active': number };

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const previous = () => setActive((value) => (value - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((value) => (value + 1) % testimonials.length);

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div
            className={styles.partners}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.67, ease: 'linear' }}
          >
            <h2 id="testimonials-title">Trusted by businesses that value clarity</h2>
            <div className={styles.partnerProof}>
              <span className={styles.eyebrow}>Proven by partnerships</span>
              <div className={styles.logos} aria-label="Empresas colaboradoras">
                {logos.map((logo, index) => <img key={logo} src={`${ASSETS}/${logo}`} alt={`Partner ${index + 1}`} />)}
              </div>
            </div>
          </motion.div>
          <motion.div
            className={styles.carousel}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.67, delay: 0.2, ease: 'linear' }}
          >
            <button className={`${styles.control} ${styles.previous}`} type="button" aria-label="Testimonio anterior" onClick={previous}>
              <img src={`${ASSETS}/46-IjL4EmcVXiIUQMiGDdHoBwJqfY.svg`} alt="" />
            </button>
            <div className={styles.viewport}>
              <div className={styles.rail} style={{ '--active': active } as RailStyle}>
                {testimonials.map((item, index) => (
                  <motion.article
                    className={styles.card}
                    key={item.name}
                    aria-hidden={index !== active}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.67, delay: 0.35, ease: 'linear' }}
                  >
                    <img className={styles.portrait} src={`${ASSETS}/${item.image}`} alt={`Retrato de ${item.name}`} />
                    <div className={styles.cardBody}>
                      <img className={styles.stars} src={`${ASSETS}/${index === 0 ? '48-X4jhwPKTiAIXFfkNXa9xUFnzM.svg' : '50-DX7yUhEf2pLcrmSgU9Zh6g9ME.svg'}`} alt="5 estrellas" />
                      <blockquote>{item.quote}</blockquote>
                      <strong>{item.name}</strong><span>{item.role}</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
            <button className={`${styles.control} ${styles.next}`} type="button" aria-label="Testimonio siguiente" onClick={next}>
              <img src={`${ASSETS}/47-aNFIfVtdpkJdKia3n3G5ajZHQbo.svg`} alt="" />
            </button>
            <p className={styles.status} aria-live="polite">Testimonio {active + 1} de {testimonials.length}: {testimonials[active].name}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
