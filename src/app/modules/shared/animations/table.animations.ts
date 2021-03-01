// background: white;
// transform: scale(1.03);

import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
    keyframes,
    stagger
} from '@angular/animations';

export const tableAnimation =
    trigger('tableAnimation', [
        transition('* <=> *', [
            query(':enter', style({ opacity: 0, transform: 'scale(1.03)' }), { optional: true }),
            query(':enter', stagger('80ms', [
                animate('200ms ease-in', keyframes([
                    style({ opacity: 0, transform: 'scale(1.03)', offset: 0 }),
                    // style({ opacity: .5, transform: 'translateY(9px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'scale(1)',  offset: 1 })
                ]))
            ]), { optional: true }),
        ]),
    ]);

// export const tableAnimation =
//     trigger('tableAnimation', [
//         transition('* <=> *', [
//             query(':enter', style({ opacity: 0 }), { optional: true }),
//             query(':enter', stagger('100ms', [
//                 animate('150ms ease-in', keyframes([
//                     style({ opacity: 0, transform: 'translateY(-9px)', offset: 0 }),
//                     style({ opacity: .5, transform: 'translateY(3px)', offset: 0.3 }),
//                     style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
//                 ]))
//             ]), { optional: true }),
//         ]),
//     ]);

