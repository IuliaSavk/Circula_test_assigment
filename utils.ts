import { Locator, expect } from '@playwright/test';

export function generateRandomEmail() {
    return `test${Date.now()}@test.com`;
  }
  
export function generateRandomPassword() {
    return `Password${Math.floor(Math.random() * 10000)}`;
  }
  
export function generateRandomCompanyName() {
    return `TEST${Date.now()}`;
  }

export function generateRandomName(length: number = 6): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    
    return result;
  }

  export async function checkOnlyOneVisible(locator: Locator) {
    const elements = await locator.all();
    let visibleCount = 0;
  
    for (const element of elements) {
      if (await element.isVisible()) {
        visibleCount++;
      }
    }
  
    expect(visibleCount).toBe(1);
  }