import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBottomTabDirective]',
  standalone: true
})
export class appBottomTabDirective {
  @Input() backgroundColor: string = '#00C2FF' || '#FFFFFF';

  constructor(
    private elementRef: ElementRef, 
  ) {
    this.applyStyles();
  }

  private applyStyles(): void {
    const element: HTMLElement = this.elementRef.nativeElement;

    element.style.backgroundColor = this.backgroundColor;

    // Apply other styles as needed
    // For example:
    // element.style.padding = '20px';
    // element.style.borderRadius = '10px';
    // Add more styles as necessary
  }
}