import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const delUrl = `${baseUrl}/${id}`
    const request = axios.delete(delUrl)
    return request.then(response => response.data)
}

const update = (personObject) => {
    const updateUrl = `${baseUrl}/${personObject.id}`
    const request = axios.put(updateUrl, personObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }
