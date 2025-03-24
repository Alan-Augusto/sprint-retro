import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserData() {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
}

export function setUserData(data: { teamId: string; teamName: string | null; sprintId?: string }) {
  if (typeof window !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(data));
  }
}

export function clearUserData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userData");
    window.location.reload();
  }
}
