import {
    trigger,
    transition,
    style,
    query,
    animate,
    keyframes,
    stagger
} from '@angular/animations';

export const listAnimation =
    trigger('listAnimation', [
        transition('* <=> *', [
            query(':enter', style({ opacity: 0 }), { optional: true }),
            query(':enter', stagger('200ms', [
                animate('350ms ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(20px)', offset: 0 }),
                    // style({ opacity: .5, transform: 'translateY(9px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
                ]))
            ]), { optional: true }),
        ]),
    ]);

export const listAnimationFast =
    trigger('listAnimationFast', [
        transition('* <=> *', [
            query(':enter', style({ opacity: 0 }), { optional: true }),
            query(':enter', stagger('200ms', [
                animate('200ms linear', keyframes([
                    style({ opacity: 0, transform: 'translateY(45px)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
                ]))
            ]), { optional: true }),
        ]),
    ]);

export const dropdownAnimation =
    trigger('dropdownAnimation', [
        transition('* <=> *', [
            query(':enter', style({ opacity: 0 }), { optional: true }),
            query(':enter', stagger('180ms', [
                animate('180ms ease-out', keyframes([
                    style({ opacity: 0, transform: 'translateY(15px) scale(1.02)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 })
                ]))
            ]), { optional: true }),
        ]),
    ]);
