import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Breakpoints {
    'XS' = 'xs',
    'SM' = 'sm',
    'MD' = 'md',
    'LG' = 'lg',
    'XL' = 'xl',
    'XXL' = 'xxl',
}

@Injectable({
    providedIn: 'root',
})
export class BreakpointObserverService {
    xsBreakpoint = ['(max-width:374.98px)'];
    smBreakpoint = ['(min-width:375px) and (max-width:767.98px)'];
    mdBreakpoint = ['(min-width:768px) and (max-width:1023.98px)'];
    lgBreakpoint = ['(min-width:1024px) and (max-width:1279.98px)'];
    xlBreakpoint = ['(min-width:1280px) and (max-width:1919.98px)'];
    xxlBreakpoint = '(min-width:1920px)';

    public screenSizeObserver = new BehaviorSubject<Breakpoints[]>([Breakpoints.XS]);

    constructor(private breakpointObserver: BreakpointObserver) {
        this.initObservers();
    }

    private initObservers() {
        this.breakpointObserver.observe(this.xsBreakpoint).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.screenSizeObserver.next([Breakpoints.XS]);
            }
        });

        this.breakpointObserver.observe(this.smBreakpoint).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.screenSizeObserver.next([Breakpoints.XS, Breakpoints.SM]);
            }
        });
        this.breakpointObserver.observe(this.mdBreakpoint).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.screenSizeObserver.next([Breakpoints.XS, Breakpoints.SM, Breakpoints.MD]);
            }
        });
        this.breakpointObserver.observe(this.lgBreakpoint).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.screenSizeObserver.next([
                    Breakpoints.XS,
                    Breakpoints.SM,
                    Breakpoints.MD,
                    Breakpoints.LG,
                ]);
            }
        });
        this.breakpointObserver.observe(this.xlBreakpoint).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.screenSizeObserver.next([
                    Breakpoints.XS,
                    Breakpoints.SM,
                    Breakpoints.MD,
                    Breakpoints.LG,
                    Breakpoints.XL,
                ]);
            }
        });
        this.breakpointObserver.observe(this.xxlBreakpoint).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.screenSizeObserver.next([
                    Breakpoints.XS,
                    Breakpoints.SM,
                    Breakpoints.MD,
                    Breakpoints.LG,
                    Breakpoints.XL,
                    Breakpoints.XXL,
                ]);
            }
        });
    }
}
