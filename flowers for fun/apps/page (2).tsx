"use client"

import type React from "react"

import { useState } from "react"

export default function App() {
  const [flower1, setFlower1] = useState("")
  const [flower2, setFlower2] = useState("")
  const [pollinationResult, setPollinationResult] = useState("Select two flowers and watch the magic happen! 🌟")
  const [currentQuote, setCurrentQuote] = useState("Click the button below for some flower-powered fun! 🌈")
  const [isBloomed, setIsBloomed] = useState(false)

  const flowers = ["Rose", "Sunflower", "Lavender", "Daisy", "Marigold", "Hydrangea"]

  const quotes = [
    "I'm just pollen your leg! 🌼",
    "You grow, girl! 🌸",
    "Bee yourself, everyone else is taken! 🐝",
    "Don't worry, bee happy! 🌻",
    "I'm rooting for you! 🌱",
    "You're absolutely blooming marvelous! 🌺",
    "Life is better with a little flower power! 🌈",
    "Stop and smell the roses... seriously, they smell amazing! 🌹",
    "I'm having a pollen-tastic day! 🌼",
    "You make my heart bloom! 💖",
    "Thistle be the best day ever! 🌿",
    "I'm not a regular flower, I'm a cool flower! 😎",
    "Petal to the metal! 🌸",
    "You're one in a melon... wait, that's not a flower! 🍉",
    "I'm blooming with excitement! 🌺",
    "Flower power is the best superpower! ⚡",
    "You're the pick of the bunch! 🌻",
    "I'm having a rose-y outlook on life! 🌹",
    "Don't be a wallflower, shine bright! ✨",
    "You're absolutely daffodil-ightful! 🌼",
  ]

  const crossPollinate = () => {
    if (!flower1 || !flower2) {
      setPollinationResult("Please select both flowers first! 🌺")
      return
    }

    const colors = ["Pink", "Purple", "Golden", "Rainbow", "Sparkly", "Magical", "Dreamy", "Cosmic"]
    const adjectives = ["Magnificent", "Enchanted", "Whimsical", "Dazzling", "Mystical", "Radiant", "Celestial"]
    const suffixes = ["bloom", "blossom", "petal", "flower", "beauty", "wonder", "delight"]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)]

    const hybridName = `${randomColor} ${randomAdjective} ${flower1}${randomSuffix}`

    setPollinationResult(
      `🎉 Congratulations! You've created the ${hybridName}! 🎉\nA magical hybrid of ${flower1} and ${flower2}!`,
    )
  }

  const bloomFlower = () => {
    if (!isBloomed) {
      setIsBloomed(true)
    }
  }

  const resetBloom = () => {
    setIsBloomed(false)
  }

  const showRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setCurrentQuote(randomQuote)
  }

  const createSparkles = (e: React.MouseEvent<HTMLButtonElement>) => {
    const sparkleEmojis = ["✨", "🌟", "💫", "⭐"]
    const button = e.currentTarget

    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement("div")
      sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)]
      sparkle.style.position = "fixed"
      sparkle.style.pointerEvents = "none"
      sparkle.style.fontSize = "1.2rem"
      sparkle.style.zIndex = "1000"
      sparkle.style.animation = "sparkle 1s ease-out forwards"

      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const angle = (i / 8) * 2 * Math.PI
      const radius = 30
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      sparkle.style.left = x + "px"
      sparkle.style.top = y + "px"

      document.body.appendChild(sparkle)

      setTimeout(() => {
        if (document.body.contains(sparkle)) {
          document.body.removeChild(sparkle)
        }
      }, 1000)
    }
  }

  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        background: "linear-gradient(135deg, #ffeef8 0%, #e8f5ff 100%)",
        minHeight: "100vh",
        color: "#5a4b6b",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* Header */}
        <header
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              color: "#ff6b9d",
              textShadow: "2px 2px 4px rgba(255, 107, 157, 0.3)",
              marginBottom: "10px",
              margin: 0,
            }}
          >
            🌸 Blooming Garden 🌸
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#7b68a2",
              marginBottom: "20px",
            }}
          >
            Welcome to the most delightful flower paradise!
          </p>
        </header>

        {/* Image Gallery Section */}
        <section
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#ff6b9d",
              fontSize: "2rem",
              marginBottom: "20px",
              textAlign: "center",
              margin: "0 0 20px 0",
            }}
          >
            🌺 Flower Gallery 🌺
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {flowers.map((flower, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "15px",
                  boxShadow: "0 4px 15px rgba(255, 107, 157, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <img
                  src={`/abstract-geometric-shapes.png?height=150&width=200&query=${flower} flower`}
                  alt={flower}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    fontWeight: "bold",
                    color: "#7b68a2",
                  }}
                >
                  {flower}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Pollination Section */}
        <section
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#ff6b9d",
              fontSize: "2rem",
              marginBottom: "20px",
              textAlign: "center",
              margin: "0 0 20px 0",
            }}
          >
            🌼 Cross-Pollination Magic 🌼
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>First Flower:</label>
              <select
                value={flower1}
                onChange={(e) => setFlower1(e.target.value)}
                style={{
                  padding: "12px 20px",
                  border: "3px solid #ff6b9d",
                  borderRadius: "25px",
                  background: "white",
                  color: "#5a4b6b",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <option value="">Choose a flower...</option>
                {flowers.map((flower) => (
                  <option key={flower} value={flower}>
                    {flower}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: "2rem" }}>💕</div>

            <div style={{ textAlign: "center" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>Second Flower:</label>
              <select
                value={flower2}
                onChange={(e) => setFlower2(e.target.value)}
                style={{
                  padding: "12px 20px",
                  border: "3px solid #ff6b9d",
                  borderRadius: "25px",
                  background: "white",
                  color: "#5a4b6b",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <option value="">Choose a flower...</option>
                {flowers.map((flower) => (
                  <option key={flower} value={flower}>
                    {flower}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <button
              onClick={(e) => {
                crossPollinate()
                createSparkles(e)
              }}
              style={{
                background: "linear-gradient(45deg, #ff6b9d, #ffa8cc)",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "25px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(255, 107, 157, 0.3)",
              }}
            >
              ✨ Cross Pollinate! ✨
            </button>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "linear-gradient(45deg, #e8f5ff, #ffeef8)",
              borderRadius: "15px",
              textAlign: "center",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#7b68a2",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "pre-line",
            }}
          >
            {pollinationResult}
          </div>
        </section>

        {/* Blooming Flower Section */}
        <section
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#ff6b9d",
              fontSize: "2rem",
              marginBottom: "20px",
              textAlign: "center",
              margin: "0 0 20px 0",
            }}
          >
            🌱 Watch Me Bloom! 🌱
          </h2>
          <div style={{ textAlign: "center", margin: "30px 0" }}>
            <p style={{ marginBottom: "20px" }}>Click on the flower bud to watch it bloom! 🌸</p>
            <div
              onClick={bloomFlower}
              style={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {/* Stem */}
              <div
                style={{
                  width: "8px",
                  height: "100px",
                  background: "linear-gradient(to top, #4a7c59, #6b8e5a)",
                  margin: "0 auto",
                  borderRadius: "4px",
                }}
              />

              {/* Bud */}
              <div
                style={{
                  width: "30px",
                  height: "40px",
                  background: "linear-gradient(45deg, #90ee90, #98fb98)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  margin: "-5px auto 0",
                  transition: "all 0.8s ease",
                  position: "relative",
                  zIndex: 2,
                  transform: isBloomed ? "scale(0)" : "scale(1)",
                  opacity: isBloomed ? 0 : 1,
                }}
              />

              {/* Flower */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  position: "absolute",
                  top: "-45px",
                  left: "50%",
                  transform: isBloomed ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0)",
                  transition: "all 0.8s ease",
                  zIndex: 1,
                }}
              >
                {/* Petals */}
                {[0, 72, 144, 216, 288].map((rotation, index) => (
                  <div
                    key={index}
                    style={{
                      width: "25px",
                      height: "35px",
                      background: "linear-gradient(45deg, #ff69b4, #ffc0cb)",
                      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                      position: "absolute",
                      transformOrigin: "bottom center",
                      transform: `rotate(${rotation}deg) translateY(-20px)`,
                    }}
                  />
                ))}

                {/* Center */}
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    background: "#ffd700",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            </div>

            <p style={{ marginTop: "20px", fontStyle: "italic" }}>
              <button
                onClick={(e) => {
                  resetBloom()
                  createSparkles(e)
                }}
                style={{
                  background: "linear-gradient(45deg, #4a7c59, #6b8e5a)",
                  color: "white",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(123, 104, 162, 0.3)",
                }}
              >
                🌱 Reset Bloom
              </button>
            </p>
          </div>
        </section>

        {/* Quotes Section */}
        <section
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#ff6b9d",
              fontSize: "2rem",
              marginBottom: "20px",
              textAlign: "center",
              margin: "0 0 20px 0",
            }}
          >
            🌻 Flower Wisdom & Giggles 🌻
          </h2>
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <div
              style={{
                fontSize: "1.3rem",
                color: "#7b68a2",
                fontStyle: "italic",
                marginBottom: "15px",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(45deg, #ffeef8, #e8f5ff)",
                borderRadius: "15px",
                padding: "20px",
                transition: "opacity 0.3s ease",
              }}
            >
              {currentQuote}
            </div>
            <button
              onClick={(e) => {
                showRandomQuote()
                createSparkles(e)
              }}
              style={{
                background: "linear-gradient(45deg, #7b68a2, #9b7fb7)",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "20px",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(123, 104, 162, 0.3)",
              }}
            >
              🌸 Get New Quote 🌸
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
