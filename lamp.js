import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const LAMP_INTERVAL_MIN = 800
const LAMP_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextLampTime
export function setupLamp() {
  nextLampTime = LAMP_INTERVAL_MIN
  document.querySelectorAll("[data-lamp]").forEach(lamp => {
    lamp.remove()
  })
}

export function updateLamp(delta, speedScale) {
  document.querySelectorAll("[data-lamp]").forEach(lamp => {
    incrementCustomProperty(lamp, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(lamp, "--left") <= -100) {
      lamp.remove()
    }
  })

  if (nextLampTime <= 0) {
    createLamp()
    nextLampTime =
      randomNumberBetween(LAMP_INTERVAL_MIN, LAMP_INTERVAL_MAX) / speedScale
  }
  nextLampTime -= delta
}

export function getLampRects() {
  return [...document.querySelectorAll("[data-lamp]")].map(lamp => {
    return lamp.getBoundingClientRect()
  })
}

function createLamp() {
  const lamp = document.createElement("img")
  lamp.dataset.lamp = true
  lamp.src = "imgs/lamp.svg"
  lamp.classList.add("lamp")
  setCustomProperty(lamp, "--left", 100)
  worldElem.append(lamp)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
