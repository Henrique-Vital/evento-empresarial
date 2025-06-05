// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  initializeAnimations()

  // Initialize button interactions
  initializeButtonInteractions()

  // Initialize responsive behaviors
  initializeResponsiveBehaviors()
})

// Animation initialization
function initializeAnimations() {
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible")
      }
    })
  }, observerOptions)

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('[class*="animate-"]')
  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Button interactions
function initializeButtonInteractions() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    // Add ripple effect
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })

    // Add hover sound effect (optional)
    button.addEventListener("mouseenter", function () {
      // You can add sound effects here if needed
      this.style.transform = "scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })
}

// Responsive behaviors
function initializeResponsiveBehaviors() {
  let resizeTimer

  function handleResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // Recalculate layouts if needed
      adjustLayoutForViewport()
    }, 250)
  }

  function adjustLayoutForViewport() {
    const viewport = window.innerWidth

    // Adjust hero section height on mobile
    const heroSection = document.querySelector(".hero-section")
    if (heroSection && viewport < 768) {
      heroSection.style.minHeight = "100vh"
    }

    // Adjust speaker cards layout
    const speakerCards = document.querySelectorAll(".speaker-card")
    speakerCards.forEach((card) => {
      if (viewport < 768) {
        card.classList.add("mobile-layout")
      } else {
        card.classList.remove("mobile-layout")
      }
    })
  }

  window.addEventListener("resize", handleResize)

  // Initial adjustment
  adjustLayoutForViewport()
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Preload critical resources
  const criticalImages = ["images/logo-empreende-mente.png", "images/hero-palestrantes.png"]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations
optimizePerformance()
