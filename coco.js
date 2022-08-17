import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const cocoElem = document.querySelector("[data-coco]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const COCO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let cocoFrame
let currentFrameTime
let yVelocity
export function setupCoco() {
  isJumping = false
  cocoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(cocoElem, "--bottom", 4)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateCoco(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getCocoRect() {
  return cocoElem.getBoundingClientRect()
}

export function setCocoLose() {
  cocoElem.src = "imgs/coco-lose.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    cocoElem.src = `imgs/coco-fly-0.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    cocoFrame = (cocoFrame + 1) % COCO_FRAME_COUNT
    cocoElem.src = `imgs/coco-fly-${cocoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(cocoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(cocoElem, "--bottom") <= 4) {
    setCustomProperty(cocoElem, "--bottom", 4)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (isJumping) return
  
  yVelocity = JUMP_SPEED
  isJumping = true
}
