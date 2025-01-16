export function extractBasename(url) {
    const urlWithoutTrailingSlash = url.replace(/\/$/, '');
    const paths = urlWithoutTrailingSlash.split('/');
    const filename = paths.pop();
    const fileAndExtension = filename.split('.');
    const basename = fileAndExtension.shift();
    return basename;
}
