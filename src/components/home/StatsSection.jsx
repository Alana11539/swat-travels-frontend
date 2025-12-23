
import { useEffect, useRef, useState } from "react"

const stats = [
  {
    value: 650,
    suffix: "+",
    label: "NO. OF TRIPS",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1l5.2 3L7 13l-2.5-.3c-.4 0-.8.2-.9.6l-.2.4c-.2.4 0 .8.3 1l3.3 2.3 2.3 3.3c.2.3.6.5 1 .3l.4-.2c.4-.1.6-.5.6-.9L11 17l1.6-1.9 3 5.2c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z" />
      </svg>
    ),
  },
  {
    value: 168,
    suffix: "+",
    label: "GLOBAL GUESTS",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: 500,
    suffix: "+",
    label: "REVIEWS",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    value: 4.8,
    suffix: "+",
    label: "RATINGS",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

function AnimatedCounter({ value, suffix, shouldAnimate }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldAnimate) return
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start * 10) / 10)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, shouldAnimate])

  return (
    <span>
      {shouldAnimate ? count : 0}
      {suffix}
    </span>
  )
}

function StatsSection() {
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animate) {
          setAnimate(true)
        }
      },
      { threshold: 0.5 },
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [animate])

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-content">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-item"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ease ${index * 0.1}s`,
            }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <h3>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} shouldAnimate={animate} />
            </h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
export default StatsSection;