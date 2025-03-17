declare global {
  interface String {
    removeTrailingSlashes(): string | undefined | null
    getVideoJSType(): string | undefined | null
    formatNumStr(): string
  }

  interface Number {
    formatNumStr(): string
  }
}

/**
 * Remove trailing slashes from both paths
 * eg. /feeds/// -> /feeds
 */
String.prototype.removeTrailingSlashes = function () {
  return this?.replace(/\/+$/, '')
}

String.prototype.getVideoJSType = function () {
  const ext = this.split('.').pop()
  if (ext === 'mp4') {
    return 'video/mp4'
  }
  return 'application/x-mpegURL'
}

// Function to handle number formatting
export function formatNumber(num: number): string {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 'T' // Trillions
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B' // Billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' // Millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K' // Thousands
  } else {
    return num.toString() // Less than 1000, return as is
  }
}

// Implement formatNumStr for String
String.prototype.formatNumStr = function (): string {
  if (isNaN(Number(this))) {
    return this as string // If it's not a valid number, return the string itself
  }
  return formatNumber(parseFloat(this as string)) // Call formatNumber to format the number
}

// Implement formatNumStr for Number
Number.prototype.formatNumStr = function (): string {
  const num = this.valueOf() // Use the number value
  return formatNumber(num) // Call formatNumber to format the number
}

export {}
