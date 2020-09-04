export function getContainerSize(size) {
    if (size <= 480) return 'tiny';
    if (size <= 768) return 'small';
    if (size <= 1024) return 'medium';
    if (size <= 1200) return 'large';
    return 'enormous';
}
