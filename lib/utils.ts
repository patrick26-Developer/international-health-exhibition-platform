import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Couleurs vertes pour la marque SIS
export const brandColors = {
  primary: {
    light: "from-emerald-600 to-emerald-700",
    dark: "from-emerald-700 to-emerald-800",
    hover: {
      light: "hover:from-emerald-700 hover:to-emerald-800",
      dark: "dark:hover:from-emerald-800 dark:hover:to-emerald-900"
    }
  },
  outline: {
    light: "border-emerald-600 text-emerald-700",
    dark: "dark:border-emerald-500 dark:text-emerald-300",
    hover: {
      light: "hover:bg-emerald-50",
      dark: "dark:hover:bg-emerald-900/20"
    }
  }
}

// Ripple effect utility
export function createRipple(event: React.MouseEvent<HTMLButtonElement>) {
  const button = event.currentTarget
  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add("ripple")

  const ripple = button.getElementsByClassName("ripple")[0]

  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}