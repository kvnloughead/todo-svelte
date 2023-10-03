/**
 * Adds listener to DOM node that selects all text in the node on focus.
 *
 * @param {Node} node - a DOM node
 * @returns a callback that removes the listener
 */
export function selectOnFocus(node: HTMLInputElement) {
  if (node && typeof node.select === 'function') {
    const onFocus = () => node.select();
    node.addEventListener('focus', onFocus);
    return {
      destroy: () => node.removeEventListener('focus', onFocus),
    };
  }
}

/**
 * Focus on DOM node on initialization.
 *
 * @param {Node} node - a DOM node
 */
export function focusOnInit(node: HTMLInputElement) {
  if (node && typeof node.focus === 'function') {
    node.focus();
  }
}
