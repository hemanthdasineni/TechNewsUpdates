import { CalendarDays, Radio, Sparkles } from 'lucide-react'

function HeroSection({ digestLabel, totalUpdates, savedCount, topCategory }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">
          <Radio size={16} aria-hidden="true" />
          Daily brief
        </span>
        <h1>Your smart daily dashboard for tech and career updates.</h1>
        <p>
          Important AI tools, product launches, company announcements, feature releases, startup
          signals, and student-friendly opportunities in one focused view.
        </p>
      </div>

      <div className="digest-panel">
        <div>
          <CalendarDays size={20} aria-hidden="true" />
          <span>{digestLabel}</span>
        </div>
        <strong>{totalUpdates}</strong>
        <p>updates loaded today</p>
        <div className="digest-row">
          <span>
            <Sparkles size={15} aria-hidden="true" />
            {topCategory || 'Tech'} leads today
          </span>
          <span>{savedCount} saved</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
