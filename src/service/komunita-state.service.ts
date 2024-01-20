import { Injectable } from '@angular/core';
import { Komunita } from '../Intefaces/komunita-prispevok';

@Injectable({
  providedIn: 'root',
})
export class KomunitaStateService {
  private readonly storageKey = 'selectedProduct';

  selectedPrispevok: Komunita | undefined;

  constructor() {
    const storedPrispevky = localStorage.getItem(this.storageKey);
    this.selectedPrispevok = storedPrispevky ? JSON.parse(storedPrispevky) : undefined;
  }

  setSelectedPrispevok(prispevok: Komunita): void {
    if (prispevok) {
      this.selectedPrispevok = prispevok;
      localStorage.setItem(this.storageKey, JSON.stringify(prispevok));
      console.log("Prispevok is not null");
    } else {
      console.error('Invalid product object!');
    }
  }

  getSelectedPrispevok(): Komunita | undefined {
    return this.selectedPrispevok;
  }

  clearSelectedPrispevok(): void {
    this.selectedPrispevok = undefined;
    localStorage.removeItem(this.storageKey);
  }
}
