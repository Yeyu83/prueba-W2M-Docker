import { AfterViewChecked, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
 
@Directive({
  selector: '[toUpperCase]'
})
export class ToUpperCaseDirective {

    @Input() set inputValue(value: string) {
        this.setUpperCase(value);
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    setUpperCase(inputValue: string) {
        // this.renderer.setProperty(this.el.nativeElement, 'value', inputValue.toUpperCase());
        this.el.nativeElement.value = inputValue.toUpperCase();
    }
 
}