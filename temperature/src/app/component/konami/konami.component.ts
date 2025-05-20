import { Component, Output, EventEmitter, HostListener, Renderer2, ElementRef } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-konami',
  templateUrl: './konami.component.html',
  styleUrls: ['./konami.component.scss']
})
export class KonamiComponent {
  @Output() activatedEvent = new EventEmitter<void>();

  private konamiSequence = [38,38,40,40,37,39,37,39,66,65];
  private inputSequence: number[] = [];
  activated = false;
  private flameAudio!: HTMLAudioElement;
  private confettiInterval!: ReturnType<typeof setInterval>;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.inputSequence.push(event.keyCode);
    if (this.inputSequence.length > this.konamiSequence.length) {
      this.inputSequence.shift();
    }
    if (this.inputSequence.toString() === this.konamiSequence.toString()) {
      this.showEffects();
      this.activatedEvent.emit();
    }
  }

  private showEffects() {
    this.activated = true;
    this.playSounds();
    this.launchConfetti();

    setTimeout(() => {
      this.activated = false;
      this.stopConfetti();
      this.stopFlameSound();
    }, 30000);
  }

  private playSounds() {
    const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
    audio.play();

    this.flameAudio = new Audio('assets/lol.ogg');
    this.flameAudio.loop = true;
    this.flameAudio.volume = 0.3;
    this.flameAudio.play();
  }

  private stopFlameSound() {
    if (this.flameAudio) {
      this.flameAudio.pause();
      this.flameAudio.currentTime = 0;
    }
  }

  private launchConfetti() {
    this.confettiInterval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 120,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.6,
        }
      });
    }, 100);
  }

  private stopConfetti() {
    clearInterval(this.confettiInterval);
  }
}
