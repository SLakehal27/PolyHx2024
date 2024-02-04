import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interface/message';

const TYPING_SPEED: number = 25;

@Component({
  selector: 'app-bubblearea',
  templateUrl: './bubblearea.component.html',
  styleUrls: ['./bubblearea.component.css'],
})
export class BubbleareaComponent implements OnInit {
  messages: Message[] = [];
  currentMessage: Message = { message: '' };
  msgIterator = 0;
  typingTimeout: NodeJS.Timeout | undefined = undefined;

  constructor(private httpClient: HttpClient, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.getMessages();

    const textElement = this.elementRef.nativeElement.querySelector('.text');
    if (textElement) {
      textElement.addEventListener('click', () => {
        this.stopTypingEffect();
        textElement.textContent = '';
        this.getMessages();
      });
    }
  }

  typeEffect(destinationText: HTMLElement, sourceText: string, i: number) {
    destinationText.textContent += sourceText[i];
    if (i === sourceText.length - 1) {
      return;
    }
    this.typingTimeout = setTimeout(
      () => this.typeEffect(destinationText, sourceText, i + 1),
      TYPING_SPEED
    );
  }

  stopTypingEffect() {
    clearTimeout(this.typingTimeout);
  }

  getMessages() {
    const jsonPath = 'assets/messages.json';
    this.httpClient.get<Message[]>(jsonPath).subscribe({
      next: (response) => {
        const target = this.elementRef.nativeElement.querySelector('.text');
        this.messages = response;
        this.currentMessage =
          this.messages[this.incrIterator(this.messages.length)];
        this.typeEffect(target, this.currentMessage.message, 0);
      },
    });
  }

  incrIterator(length: number): number {
    if (this.msgIterator < length) {
      return this.msgIterator++;
    } else {
      this.msgIterator = 0;
      return 0;
    }
  }
}
