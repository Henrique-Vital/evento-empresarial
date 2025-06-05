// Component-specific JavaScript functionality

// Speaker Card Component
class SpeakerCard {
  constructor(element) {
    this.element = element
    this.image = element.querySelector(".speaker-image")
    this.content = element.querySelector(".speaker-content")
    this.name = element.querySelector(".speaker-name")
    this.line = element.querySelector(".speaker-line")

    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener("mouseenter", () => this.onHover())
    this.element.addEventListener("mouseleave", () => this.onLeave())
    this.element.addEventListener("click", () => this.onClick())
  }

  onHover() {
    this.element.style.transform = "scale(1.02)"
    this.image.style.transform = "scale(1.1)"
    this.content.style.backgroundColor = "#4a4949"
    this.name.style.color = "#e6c875"
    this.line.style.width = window.innerWidth >= 576 ? "5rem" : "4rem"
  }

  onLeave() {
    this.element.style.transform = "scale(1)"
    this.image.style.transform = "scale(1)"
    this.content.style.backgroundColor = "#434242"
    this.name.style.color = "#D7B56D"
    this.line.style.width = window.innerWidth >= 576 ? "3rem" : "2rem"
  }

  onClick() {
    // Add click functionality if needed
    console.log(`Clicked on ${this.name.textContent}`)
  }
}

// Benefit Item Component
class BenefitItem {
  constructor(element) {
    this.element = element
    this.icon = element.querySelector(".benefit-icon")

    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener("mouseenter", () => this.onHover())
    this.element.addEventListener("mouseleave", () => this.onLeave())
  }

  onHover() {
    this.element.style.backgroundColor = "rgba(215, 181, 109, 0.05)"
    this.element.style.transform = "scale(1.02)"
    this.icon.style.transform = "rotate(12deg)"
  }

  onLeave() {
    this.element.style.backgroundColor = "transparent"
    this.element.style.transform = "scale(1)"
    this.icon.style.transform = "rotate(0deg)"
  }
}

// Target Item Component
class TargetItem {
  constructor(element) {
    this.element = element
    this.arrow = element.querySelector(".target-arrow")
    this.text = element.querySelector("p")

    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener("mouseenter", () => this.onHover())
    this.element.addEventListener("mouseleave", () => this.onLeave())
  }

  onHover() {
    this.element.style.transform = "translateX(10px)"
    this.arrow.style.transform = "scale(1.25)"
    this.text.style.color = "#D7B56D"
  }

  onLeave() {
    this.element.style.transform = "translateX(0)"
    this.arrow.style.transform = "scale(1)"
    this.text.style.color = "#ffffff"
  }
}

// Contrast Item Component
class ContrastItem {
  constructor(element, type) {
    this.element = element
    this.icon = element.querySelector(".contrast-icon")
    this.title = element.querySelector(".contrast-title")
    this.description = element.querySelector(".contrast-description")
    this.type = type // 'negative' or 'positive'

    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener("mouseenter", () => this.onHover())
    this.element.addEventListener("mouseleave", () => this.onLeave())
  }

  onHover() {
    this.icon.style.transform = "rotate(12deg)"

    if (this.type === "negative" && this.title) {
      this.title.style.color = "#ef4444"
    } else if (this.type === "positive" && this.description) {
      this.description.style.color = "#22c55e"
    }
  }

  onLeave() {
    this.icon.style.transform = "rotate(0deg)"

    if (this.title) {
      this.title.style.color = "#ffffff"
    }
    if (this.description) {
      this.description.style.color = "#ffffff"
    }
  }
}

// Location Image Component
class LocationImage {
  constructor(element) {
    this.element = element
    this.image = element.querySelector(".location-image")

    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener("mouseenter", () => this.onHover())
    this.element.addEventListener("mouseleave", () => this.onLeave())
  }

  onHover() {
    this.element.style.transform = "scale(1.02)"
    this.image.style.transform = "scale(1.1)"
  }

  onLeave() {
    this.element.style.transform = "scale(1)"
    this.image.style.transform = "scale(1)"
  }
}

// Initialize all components
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Speaker Cards
  const speakerCards = document.querySelectorAll(".speaker-card")
  speakerCards.forEach((card) => new SpeakerCard(card))

  // Initialize Benefit Items
  const benefitItems = document.querySelectorAll(".benefit-item")
  benefitItems.forEach((item) => new BenefitItem(item))

  // Initialize Target Items
  const targetItems = document.querySelectorAll(".target-item")
  targetItems.forEach((item) => new TargetItem(item))

  // Initialize Contrast Items
  const contrastItems = document.querySelectorAll(".contrast-item")
  contrastItems.forEach((item, index) => {
    const type = index === 0 ? "negative" : "positive"
    new ContrastItem(item, type)
  })

  // Initialize Location Images
  const locationImages = document.querySelectorAll(".location-image-container")
  locationImages.forEach((container) => new LocationImage(container))
})

// Utility component functions
function createRippleEffect(button, event) {
  const ripple = document.createElement("span")
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `

  button.style.position = "relative"
  button.style.overflow = "hidden"
  button.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Add ripple animation CSS
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(rippleStyle)
