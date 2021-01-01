export default {
    clearUrl (url) {
        url = url.replace('www.', '');
        url = url.replace('http://', '');
        url = url.replace('https://', '');
        url = url.replace('/', '');
        return url;
    }
}