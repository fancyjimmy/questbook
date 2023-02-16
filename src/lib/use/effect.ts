export function blurOnEnter(node: HTMLElement) {
    const handleKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && node && typeof node.blur === 'function') {
            node.blur();
        }
    };

    node.addEventListener('keydown', handleKey);

    return {
        destroy() {
            node.removeEventListener('keydown', handleKey);
        }
    };
}
