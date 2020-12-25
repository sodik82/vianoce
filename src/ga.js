/* globals ga */

export function reportEG(name) {
  ga('send', 'event', 'EasterEgg', name);
}
