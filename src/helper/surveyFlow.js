import store from './store';

export function screenState(currentScreen, questionCount) {
    switch (currentScreen) {
        case 5: {
            const currentState = store.getState();
            if ('isTest' in currentState && currentState['isTest'] == 1) {
                return (1 << questionCount) - 1;
            } else {
                return 17;
            }
        }
        case 6:{
            const currentState = store.getState();
            if ('isVaccine' in currentState && currentState['isVaccine'] == 1) {
                return (1 << questionCount) - 1;
            } else {
                return 1;
            }
        }
        default: {
            return (1 << questionCount) - 1;
        }
    }
}

export function nextScreen(currentScreen) {
    return currentScreen + 1;
}

export function privatizeResult() {
    return store.getState();
}
