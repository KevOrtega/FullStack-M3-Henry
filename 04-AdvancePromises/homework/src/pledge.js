'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise {
    constructor(executor) {
        if(typeof executor !== 'function') throw TypeError("executor is not a function")
        this._state = "pending"
        this._handlerGroups = []
        executor((res) => {this._internalResolve(res)}, (rej) => {this._internalReject(rej)})
    }

    _callHandlers() {
        if(this._state === "pending" || !this._handlerGroups.length) return
        const handler = this._handlerGroups.shift()

        const handlerMethods = {
            fulfilled: () => {
                let handlerValue
                if(typeof handler.successCb === 'function') handlerValue = handler.successCb(this._value)

                if(handlerValue instanceof $Promise) {
                    handlerValue.then(res => handler.downstreamPromise._internalResolve(res), rej => handler.downstreamPromise._internalReject(rej))
                    return;
                }

                handler.downstreamPromise._internalResolve(handlerValue || this._value)
            },
            rejected: () => {
                let handlerValue
                if(typeof handler.errorCb === 'function') handlerValue = handler.errorCb(this._value)

                if(handlerValue instanceof $Promise) {
                    handlerValue.then(res => handler.downstreamPromise._internalResolve(res), rej => handler.downstreamPromise._internalReject(rej))
                    return;
                }

                handlerValue ?
                handler.downstreamPromise._internalResolve(handlerValue) : 
                handler.downstreamPromise._internalReject(this._value)
            }
        }
        
        try {handlerMethods[this._state]()}
        catch(e) {handler.downstreamPromise._internalReject(e)}

        if(this._handlerGroups.length) this._callHandlers()
    }

    _internalResolve(data) {
        if(this._state !== "pending") return;
        this._state = "fulfilled"
        this._value = data
        this._callHandlers()
    }

    _internalReject(reason) {
        if(this._state !== "pending") return;
        this._state = "rejected"
        this._value = reason
        this._callHandlers()
    }

    then(successCb, errorCb) {
        const handler = {
            successCb: typeof successCb === "function" ? successCb : false,
            errorCb: typeof errorCb === "function" ? errorCb : false,
            downstreamPromise: new $Promise(() => {})
        }

        this._handlerGroups.push(handler)
        this._callHandlers()

        return handler.downstreamPromise
    }

    catch(cb) {return this.then(null, cb)}

    static resolve(value) {
        if(value instanceof $Promise) return value

        return new $Promise(function(res){res(value)})
    }

    static all(arr) {
        if(!Array.isArray(arr)) throw new TypeError('parameter must be an array')

        return new $Promise((resolve, reject) => {
            const values = {}

            arr.forEach((value, index) => {
                const promise = this.resolve(value)

                promise
                .then(res => {values[index] = res; Object.keys(values).length === arr.length && resolve(Object.values(values))})
                .catch(err => {reject(err)})
            })
        })
    }
}



module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
