declare namespace Timer {
    type CustomTimerType = 'background' | 'foreground' | 'universal';
    type CustomTimer = {
        callback: () => void;
        timeMs: number;
        repeat: boolean;
        type: CustomTimerType;
        lastTime: number;
    };
}
