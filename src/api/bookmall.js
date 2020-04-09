import axios from 'axios'
import { setLocalForage } from '../utils/localForage'


export function home() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_REQ_URL}/bookmall/home`
    })
}

export function detail(book) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_REQ_URL}/bookmall/detail`,
        params: {
            fileName: book.fileName
        }
    })
}

export function list() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_REQ_URL}/bookmall/list`
    })
}

export function shelf() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_REQ_URL}/bookmall/shelf`
    })
}

export function download(book, onSuccess, onError, onProgress) {
    if (!onProgress) {
        onProgress = onError
        onError = null
    }
    return axios.create({
        baseURL: process.env.VUE_APP_EPUB_URL,
        method: 'get',
        responseType: 'blob',
        timeout: 240 * 1000,
        onDownloadProgress: ProgressEvent => {
            if (onProgress) onProgress(ProgressEvent)
        }
    }).get(`${book.fileName}.epub`).then(res => {
        const blob = new Blob([res.data])
        setLocalForage(book.fileName, blob, () => {
            if(onSuccess) onSuccess(book)
        }, err => {
            if(onError) onError(err) 
        })
    }).catch(err => {
        if(onError) onError(err)
    })
}