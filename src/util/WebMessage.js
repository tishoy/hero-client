
/**
 * 向服务器发送消息
 * @param {*} router 
 * @param {*} json 
 * @param {*} callback 
 * @param {*} args 
 */
export function getData(router, json, callback = null, args = {}) {
    fetch(router.url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www.form-urlencoded'
        },
        body: JSON.stringify(json)
    }).then(function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (callback !== null) {
            callback(router, data, args);
        }
        return data;
    }).catch(function (e) {
        console.log(e);
    });
    return
}

export const socketInstance = {
    instance: undefined,
    init: () => {
        var url = getFromDetail('url');
        if (url === "") {
            console.log("没有定义战场服务器地址")
        }
        var socket = new WebSocket(url);
        socket.onerror = function (event) {
            console.log("战场服务器连接失败")
        }
        socket.onclose = function (event) {
        }
        this.instance = socket
    },
    getInstance: () => {
        if (this.instance === undefined) {
            socket_instance.init()
        }
        return this.instance
    }
}