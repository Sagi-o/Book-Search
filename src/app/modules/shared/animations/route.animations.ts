import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
    keyframes
} from '@angular/animations';

export const fader =
    trigger('routeAnimations', [
        // New page start with :enter, Old page go to :leave
        transition('* <=> *', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    opacity: 0,
                    width: '100%'

                    // left: 0,
                    // transform: 'scale(0) translateY(100%)'
                })
            ], { optional: true }),
            // Actual transition for new page on :enter
            query(':enter', [
                animate('300ms ease',
                    style({ opacity: 1 })
                )
            ], { optional: true })
        ]),
    ]);

export const slider =
    trigger('slider', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(-100%)' }),
            animate('0.3s ease-in', style({ opacity: '1', transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ opacity: 1, transform: 'translateY(0%)' }),
            animate('0.3s ease-out', style({ opacity: '0', transform: 'translateY(-100%)' }))
        ])
    ]);

