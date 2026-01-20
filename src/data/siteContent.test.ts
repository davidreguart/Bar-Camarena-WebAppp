import { describe, it, expect } from 'vitest';
import siteContent from './siteContent.json';

describe('siteContent data integrity', () => {
  it('should have the carta section', () => {
    expect(siteContent).toHaveProperty('carta');
    expect(siteContent.carta).toHaveProperty('title', 'Nuestra Carta');
    expect(siteContent.carta).toHaveProperty('categories');
    expect(Array.isArray(siteContent.carta.categories)).toBe(true);
  });

  it('should have the "Esmorzar Popular" category', () => {
    const bocadillosCategory = siteContent.carta.categories.find(
      (cat) => cat.name === 'Esmorzar Popular (Bocadillos)'
    );
    expect(bocadillosCategory).toBeDefined();
    expect(bocadillosCategory).toHaveProperty('items');
    expect(Array.isArray(bocadillosCategory?.items)).toBe(true);
    // There are 20 items in the list provided by the user
    expect(bocadillosCategory?.items.length).toBe(20);
  });

  it('should have valid items in the bocadillos category', () => {
    const bocadillosCategory = siteContent.carta.categories.find(
      (cat) => cat.name === 'Esmorzar Popular (Bocadillos)'
    );

    bocadillosCategory?.items.forEach((item) => {
      expect(item).toHaveProperty('name');
      expect(typeof item.name).toBe('string');
      expect(item).toHaveProperty('ingredients');
      expect(typeof item.ingredients).toBe('string');
      expect(item).toHaveProperty('priceHalf');
      expect(item.priceHalf).toMatch(/^\d+€$/);
      expect(item).toHaveProperty('priceWhole');
      expect(item.priceWhole).toMatch(/^\d+€$/);
    });
  });

  it('should contain specific bocadillos', () => {
    const bocadillosCategory = siteContent.carta.categories.find(
      (cat) => cat.name === 'Esmorzar Popular (Bocadillos)'
    );

    const itemNames = bocadillosCategory?.items.map(i => i.name);

    expect(itemNames).toContain('El chivito'); // User provided "El chivito"
    // Let's check a few from the user list:
    expect(itemNames).toContain('EL VEGETAL');
    expect(itemNames).toContain('El Macerado');
    expect(itemNames).toContain('La Brascada');
  });
});
