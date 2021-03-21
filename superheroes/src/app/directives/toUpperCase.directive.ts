import { AfterContentChecked, AfterViewChecked, Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
 
@Directive({
  selector: '[toUpperCase]'
})
export class ToUpperCaseDirective {

    @Input() set inputValue(value: string) {
        this.sendtoUpperCaseValue(value);
    }

    @Output() sendToUpperCaseValue = new EventEmitter<string>();

    sendtoUpperCaseValue(inputValue: string) {
        this.sendToUpperCaseValue.next(inputValue.toUpperCase());
    }
 
}