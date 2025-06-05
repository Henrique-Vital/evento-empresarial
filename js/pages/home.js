// Home page specific JavaScript functionality

document.addEventListener("DOMContentLoaded", () => {
  // Initialize home page features
  initializeHeroSection()
  initializeCTAButtons()
  initializeScrollAnimations()
  initializeFormValidation()
  initializeAnalytics()
})

// Hero section functionality
function initializeHeroSection() {
  const heroSection = document.querySelector(".hero-section")
  const heroImage = document.querySelector(".hero-image")
  const heroTitle = document.querySelector(".hero-title")

  // Typing effect for hero title (optional enhancement)
  if (heroTitle) {
    const titleSpans = heroTitle.querySelectorAll("span")
    titleSpans.forEach((span, index) => {
      span.style.animationDelay = `${0.4 + index * 0.1}s`
    })
  }

  // REMOVIDO: Efeito parallax que causava o problema da imagem se mover ao rolar

  // Limited spots pulsing effect
  const limitedSpots = document.querySelector(".limited-spots")
  if (limitedSpots) {
    setInterval(() => {
      limitedSpots.style.animation = "none"
      setTimeout(() => {
        limitedSpots.style.animation = "pulse 2s infinite"
      }, 10)
    }, 3000)
  }
}

// CTA buttons functionality
function initializeCTAButtons() {
  const ctaButtons = document.querySelectorAll('[class*="cta-btn"]')

  ctaButtons.forEach((button) => {
    // Add click tracking
    button.addEventListener("click", function (e) {
      // Add ripple effect
      createRippleEffect(this, e)

      // Track button click
      trackButtonClick(this.textContent.trim())

      // Simulate form submission or redirect
      handleCTAClick(this)
    })

    // Enhanced hover effects
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
      this.style.boxShadow = "0 6px 20px rgba(215, 181, 109, 0.4)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "0 4px 15px rgba(215, 181, 109, 0.3)"
    })
  })
}

// Handle CTA button clicks
function handleCTAClick(button) {
  const buttonText = button.textContent.trim()

  // Show loading state
  const originalText = buttonText
  button.textContent = "Carregando..."
  button.disabled = true

  // Simulate API call or redirect
  setTimeout(() => {
    // Reset button state
    button.textContent = originalText
    button.disabled = false

    // Show success message or redirect
    showSuccessMessage()

    // In a real application, you would redirect to a registration form
    // window.location.href = '/inscricao';
  }, 2000)
}

// Show success message
function showSuccessMessage() {
  const message = document.createElement("div")
  message.className = "alert alert-success position-fixed"
  message.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        animation: slideInRight 0.5s ease-out;
    `
  message.textContent = "Interesse registrado! Em breve entraremos em contato."

  document.body.appendChild(message)

  setTimeout(() => {
    message.style.animation = "slideOutRight 0.5s ease-out"
    setTimeout(() => message.remove(), 500)
  }, 3000)
}

// Scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible")

        // Special handling for different sections
        const section = entry.target.closest("section")
        if (section) {
          handleSectionAnimation(section)
        }
      }
    })
  }, observerOptions)

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('[class*="animate-"]')
  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Handle section-specific animations
function handleSectionAnimation(section) {
  if (section.classList.contains("speakers-section")) {
    // Stagger speaker card animations
    const speakerCards = section.querySelectorAll(".speaker-card")
    speakerCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-visible")
      }, index * 200)
    })
  }

  if (section.classList.contains("problem-section")) {
    // Animate benefit items with stagger
    const benefitItems = section.querySelectorAll(".benefit-item")
    benefitItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate-visible")
      }, index * 100)
    })
  }
}

// Form validation (for future use)
function initializeFormValidation() {
  // This would be used if you add a contact form
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      if (validateForm(this)) {
        submitForm(this)
      }
    })
  })
}

function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      showFieldError(input, "Este campo é obrigatório")
      isValid = false
    } else {
      clearFieldError(input)
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(input.value)) {
        showFieldError(input, "Email inválido")
        isValid = false
      }
    }

    // Phone validation
    if (input.type === "tel" && input.value) {
      const phoneRegex = /^$$\d{2}$$\s\d{4,5}-\d{4}$/
      if (!phoneRegex.test(input.value)) {
        showFieldError(input, "Telefone inválido. Use o formato (11) 99999-9999")
        isValid = false
      }
    }
  })

  return isValid
}

function showFieldError(input, message) {
  clearFieldError(input)

  const errorDiv = document.createElement("div")
  errorDiv.className = "field-error text-danger small mt-1"
  errorDiv.textContent = message

  input.parentNode.appendChild(errorDiv)
  input.classList.add("is-invalid")
}

function clearFieldError(input) {
  const existingError = input.parentNode.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }
  input.classList.remove("is-invalid")
}

function submitForm(form) {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Enviando..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Reset form
    form.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false

    // Show success message
    showSuccessMessage()

    // Track form submission
    trackFormSubmission(data)
  }, 2000)
}

// Analytics and tracking
function initializeAnalytics() {
  // Track page view
  trackPageView("home")

  // Track scroll depth
  let maxScroll = 0
  const trackScrollDepth = throttle(() => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      if (maxScroll % 25 === 0) {
        // Track at 25%, 50%, 75%, 100%
        trackEvent("scroll_depth", { percent: maxScroll })
      }
    }
  }, 1000)

  window.addEventListener("scroll", trackScrollDepth)

  // Track time on page
  const startTime = Date.now()
  window.addEventListener("beforeunload", () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000)
    trackEvent("time_on_page", { seconds: timeOnPage })
  })
}

// Tracking functions
function trackPageView(page) {
  console.log("Page view:", page)
  // Integrate with your analytics service (Google Analytics, etc.)
}

function trackEvent(eventName, data) {
  console.log("Event:", eventName, data)
  // Integrate with your analytics service
}

function trackButtonClick(buttonText) {
  trackEvent("button_click", { button: buttonText })
}

function trackFormSubmission(formData) {
  trackEvent("form_submission", { form: "contact" })
}

// Utility functions
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

// Add slide animations for success messages
const slideAnimations = document.createElement("style")
slideAnimations.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(slideAnimations)

// Declare createRippleEffect function
function createRippleEffect(button, event) {
  const circle = document.createElement("div")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.style.background = "rgba(255, 255, 255, 0.7)"
  circle.style.borderRadius = "50%"
  circle.style.pointerEvents = "none"
  circle.style.position = "absolute"
  circle.style.transform = "scale(0)"
  circle.style.transition = "transform 0.5s ease-out"

  button.appendChild(circle)

  setTimeout(() => {
    circle.style.transform = "scale(4)"
    setTimeout(() => circle.remove(), 500)
  }, 10)
}
