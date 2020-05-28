import useState from './useState/index.js';

export default function init(node) {
    return { useState: useState(node) };
}
