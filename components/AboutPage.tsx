import styles from './AboutPage.module.css';

const ASSETS = '/assets';

const clientLogos = Array.from({ length: 6 }, (_, index) => `${ASSETS}/about-client-${index + 1}.svg`);
const industries = [
  ['Manufacturing', 'about-industry-manufacturing.jpg'],
  ['Healthcare', 'about-industry-healthcare.jpg'],
  ['Retail & E-commerce', 'about-industry-retail.jpg'],
  ['IT & Tech startups', 'about-industry-tech.jpg'],
  ['Education services', 'about-industry-education.jpg'],
] as const;
const team = [
  ['James Whitmore', 'Growth Consultant', 'about-team-james.jpg'],
  ['Lukas Fischer', 'Compliance Advisor', 'about-team-lukas.jpg'],
  ['Emily Carter', 'Financial Strategist', 'about-team-emily.jpg'],
  ['Chloe Nguyen', 'Financial Advisor', 'about-team-chloe.jpg'],
] as const;
const stats = [
  ['10+', 'Years of experience'],
  ['150+', 'Business empowered'],
  ['$500M', 'In transactions managed'],
  ['98%', 'Client retention rate'],
] as const;

function Arrow() {
  return <img src={`${ASSETS}/01-tlGvIWioqeKmncOXpglcDGkJfPs.svg`} alt="" aria-hidden="true" />;
}

function Socials({ name }: { name: string }) {
  return (
    <div className={styles.socials} aria-label={`${name} social profiles`}>
      {[
        ['Facebook', '58-AhxGAjEIeNgao8CDybSCqy1D0dA.svg'],
        ['YouTube', '59-6CtIV4pHXddsj7QrRk5VqzBcKo.svg'],
        ['Instagram', '60-4J3dhLFYl5Fg3bl89IEXEVRZUY.svg'],
      ].map(([label, icon]) => (
        <a href={`https://www.${label.toLowerCase()}.com/`} aria-label={`${name} on ${label}`} key={label}>
          <img src={`${ASSETS}/${icon}`} alt="" />
        </a>
      ))}
    </div>
  );
}

function IndustryCard({ index }: { index: number }) {
  const [label, image] = industries[index];
  return <article className={styles.industryCard}><img src={`${ASSETS}/${image}`} alt="" /><span>{label}</span></article>;
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.intro}>
          <h1 id="about-title"><strong>Financial clarity<br className={styles.phoneBreak} /> and</strong> precision <strong>for<br className={styles.phoneBreak} /> confident growth.</strong></h1>
          <p>We combine precise accounting, proactive compliance, and strategic financial guidance to help businesses grow with stability, control, and confidence.</p>
        </div>
        <div className={styles.heroGrid}>
          <article className={styles.heroMain}>
            <img className={styles.heroPhoto} src={`${ASSETS}/about-hero-main.jpg`} alt="Financial advisor working at a laptop" />
            <div className={styles.heroAction}>
              <span className={styles.callIcon}><img src={`${ASSETS}/about-hero-avatar.jpg`} alt="Financial adviser" /><i><img src={`${ASSETS}/about-phone-icon.svg`} alt="" /></i></span>
              <h2>Let’s bring clarity to your finances.</h2>
              <a href="/contact">Book a consultation <Arrow /></a>
            </div>
          </article>
          <article className={styles.heroSide}>
            <img className={styles.heroSidePhoto} src={`${ASSETS}/about-hero-side.jpg`} alt="Consultant working with a client" />
            <img className={styles.decoration} src={`${ASSETS}/about-hero-decoration.png`} alt="" aria-hidden="true" />
            <div className={styles.partnership}><strong>75+</strong><span>Ongoing<br />partnership</span></div>
          </article>
        </div>
      </section>

      <section className={styles.trusted} aria-labelledby="trusted-title">
        <h2 id="trusted-title">Trusted by community leaders</h2>
        <div className={styles.logoRail}>{clientLogos.map((logo, index) => <img src={logo} alt={`Community partner ${index + 1}`} key={logo} />)}</div>
      </section>

      <section className={styles.mission} aria-labelledby="mission-title">
        <div className={styles.missionGrid}>
          <img className={styles.missionPhoto} src={`${ASSETS}/about-mission.jpg`} alt="Advisory team collaborating" />
          <div className={styles.missionCopy}>
            <h2 id="mission-title"><strong>Building lasting</strong> financial<br className={styles.desktopBreak} /> <strong>clarity through accuracy, trust,<br className={styles.desktopBreak} /> and long-term partnership.</strong></h2>
            <div className={styles.pillars}>
              <article><div><img src={`${ASSETS}/about-mission-icon.svg`} alt="" /><h3>Our mission</h3></div><p>Our mission is to deliver accurate accounting, proactive compliance, and strategic financial guidance that gives businesses complete clarity and confident control over their growth.</p></article>
              <article><div><img src={`${ASSETS}/about-vision-icon.svg`} alt="" /><h3>Our vision</h3></div><ul className={styles.visionList}><li>Built on clarity, driven by long-term partnership</li><li>The purpose behind our financial guidance</li><li>Where our journey meets your growth</li><li>Committed to clarity and stability</li></ul></article>
            </div>
            <a className={styles.primaryCta} href="/service-static">See our expertise <Arrow /></a>
          </div>
        </div>
        <div className={styles.stats}>{stats.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className={styles.industries} aria-labelledby="industries-title">
        <div className={styles.sectionIntro}><h2 id="industries-title"><strong>Growth across</strong> multiple <strong>sectors</strong></h2><p>We understand that each industry has its own financial complexities, compliance demands, and growth challenges.</p></div>
        <div className={styles.industryMap}>
          <div className={styles.industryRow1}><IndustryCard index={0} /><span className={styles.industryPlaceholder} aria-hidden="true" /><IndustryCard index={1} /><span className={styles.industryPlaceholder} aria-hidden="true" /></div>
          <div className={styles.industryRow2}><IndustryCard index={2} /><span className={styles.industryHub}><img src={`${ASSETS}/05-ELpShQB6dZYiiFyzU47LqQr60.svg`} alt="" /></span><IndustryCard index={3} /></div>
          <div className={styles.industryRow3}><span className={styles.industryPlaceholder} aria-hidden="true" /><IndustryCard index={4} /><span className={styles.industryPlaceholder} aria-hidden="true" /><span className={styles.industryPlaceholder} aria-hidden="true" /></div>
        </div>
      </section>

      <section className={styles.team} aria-labelledby="team-title">
        <article className={styles.featuredMember}>
          <img src={`${ASSETS}/${team[0][2]}`} alt={team[0][0]} />
          <div><div><h3>{team[0][0]}</h3><p>{team[0][1]}</p></div><Socials name={team[0][0]} /></div>
        </article>
        <div className={styles.teamContent}>
          <div className={styles.teamIntro}><div><h2 id="team-title">We’re more than just accountants – We’re strategic partners</h2><p>At the heart of our consulting firm is a diverse team of seasoned professionals with deep expertise in accounting, financial strategy, business planning, and compliance.</p></div><a className={styles.primaryCta} href="/contact">Join our team <Arrow /></a></div>
          <div className={styles.memberGrid}>{team.slice(1).map(([name, role, image]) => <article key={name}><img src={`${ASSETS}/${image}`} alt={name} /><h3>{name}</h3><p>{role}</p><Socials name={name} /></article>)}</div>
        </div>
      </section>
    </div>
  );
}
