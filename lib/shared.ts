export function dispatchCustomEvent(name, elm, detail, cancelable = true) {
    return !elm.dispatchEvent(
        new CustomEvent(`ezg${name}`, { detail, cancelable })
    );
}
