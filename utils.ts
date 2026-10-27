import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function orderNumber(): string {
  const rand = new Uint32Array(1);
  crypto.getRandomValues(rand);
  const suffix = (rand[0] % 46656).toString(36).toUpperCase().padStart(3, "0");
  const stamp = Date.now().toString(36).toUpperCase().slice(-4);
  return `BH-${stamp}${suffix}`;
}
