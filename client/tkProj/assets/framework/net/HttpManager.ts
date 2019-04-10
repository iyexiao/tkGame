export default class HttpManager {
    public static getInstance(): HttpManager {
        if (HttpManager.instance == null) {
            HttpManager.instance = new HttpManager();
        }
        return HttpManager.instance;
    }
    private static instance: HttpManager = null;

    public get(url: string, path: string, params: string, callback: any) {
        const xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        let requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }
        xhr.open("GET", requestURL, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept", "text/html");
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

// tslint:disable-next-line: only-arrow-functions
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
// tslint:disable-next-line: no-console
                console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    const ret = xhr.responseText;
                    if (callback !== null) {
                        callback(null, ret);
                    }
                    return;
                } catch (e) {
                    callback(e, null);
                }
            } else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        xhr.send();
        return xhr;
    }

    public post(url: string, path: string, params: string, body: any, callback: any) {
        const xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        let requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }
        xhr.open("POST", requestURL, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept", "text/html");
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        if (body) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-Length", body.length);
        }

// tslint:disable-next-line: only-arrow-functions
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    const ret = xhr.responseText;
                    if ( callback !== null) {
                        callback(null, ret);
                    }
                    return;
                } catch (e) {
                    callback(e, null);
                }
            } else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        if (body) {
            xhr.send(body);
        }
        return xhr;
    }

    public download(url: string, path: string, params: string, callback: any) {
        const xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        let requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.responseType = "arraybuffer";
        xhr.open("GET", requestURL, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept", "text/html");
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

// tslint:disable-next-line: only-arrow-functions
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                const buffer = xhr.response;
                const dataview = new DataView(buffer);
                const ints = new Uint8Array(buffer.byteLength);
                for (let i = 0; i < ints.length; i++) {
                    ints[i] = dataview.getUint8(i);
                }
                callback(null, ints);
            } else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        xhr.send();
        return xhr;
    }
}
