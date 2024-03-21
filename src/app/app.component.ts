import {Component} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        'transform': 'translateX(0%)',
      })),
      state('highlighted', style({
        'background-color': 'blue',
        'transform': 'translateX(100px)',
      })),
      transition('* => *', [animate('0.3s ease-in-out')]),
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        'transform': 'translateX(0%) scale(1)',
        'border-radius': '0',
      })),
      state('highlighted', style({
        'background-color': 'blue',
        'transform': 'translateX(100px) scale(1)',
        'border-radius': '0',
      })),
      state('shrunken', style({
        'background-color': 'blue',
        'transform': 'translateX(0px) scale(0.5)',
        'border-radius': '0',
      })),
      transition('normal <=> highlighted', [animate('0.3s ease-in-out')]),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
        }),
        animate('1s', style({
          'border-radius': '50%',
        })),
        animate('0.5s'),
      ]),
    ]),
    trigger('list1', [
      transition(':enter', [
        style({
          opacity: '0',
          'transform': 'translateX(-100%)',
        }),
        animate('0.5s ease-in-out'),
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({
          opacity: '0',
          'transform': 'translateX(100%)',
        })),
      ]),
    ]),
    trigger('list2', [
      transition(':enter', [
        animate('1s ease-in-out', keyframes([
          style({
            opacity: 0,
            'transform': 'translateX(-100%)',
            offset: 0,
          }),
          style({
            opacity: 0.5,
            'transform': 'translateX(-50px)',
            offset: 0.3,
          }),
          style({
            opacity: 1,
            'transform': 'translateX(-20px)',
            offset: 0.7,
          }),
          style({
            opacity: 1,
            'transform': 'translateX(0)',
            offset: 1,
          }),
        ])),
      ]),
      transition(':leave', [
        group([
          animate('0.5s ease-in-out', style({
            color: 'red',
          })),
          animate('1s ease-in-out', style({
            opacity: '0',
            'transform': 'translateX(100%)',
          })),
        ]),
      ]),
    ]),

  ],
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    this.wildState === 'normal' ? this.wildState = "shrunken" : this.wildState = "normal";
    this.state === 'normal' ? this.state = "highlighted" : this.state = "normal";
  }

  onShrink() {
    this.wildState === 'normal' ? this.wildState = "shrunken" : this.wildState = "normal";
  }


}
