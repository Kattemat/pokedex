import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//legger farge etter pokemon element type
export class ColorService {
  getColor(type: string) {
    switch (type) {
      case 'normal':
        return '#A8A77A';
      case 'fire':
        return '#EE8130';
      case 'water':
        return '#6390F0';
      case 'electric':
        return '#F7D02C';
      case 'grass':
        return '#7AC74C';
      case 'ice':
        return '#96D9D6';
      case 'ground':
        return '#E2BF65';
      case 'flying':
        return '#A98FF3';
      case 'fighting':
        return '#C22E28';
      case 'psychic':
        return '#F95587';
      case 'rock':
        return '#F95587';
      case 'ghost':
        return '#E2BF65';
      case 'dragon':
        return '#6F35FC';
      case 'fairy':
        return '#D685AD';
      case 'bug':
        return '#789860';
      case 'poison':
        return '#A33EA1';
      default:
        return 'white';
    }
  }
}
