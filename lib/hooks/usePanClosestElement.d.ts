declare type panEvent = {
    panX: number;
    panY: number;
    width: number;
    height: number;
    dpi: number;
    elementId: string;
};
declare type usePanClosestElementProps = {
    className: string;
    onPanStart?: (event: panEvent) => void;
    onPan?: (event: panEvent) => void;
    onPanEnd?: (event: panEvent) => void;
};
export default function usePanClosestElement({ className, onPanStart, onPan, onPanEnd, }: usePanClosestElementProps): void;
export {};
