import axios from "axios"

export const getProducts = async (callback) => {
    await axios.get('https://fakestoreapi.com/products').then((res)=>{
        callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getDetailProduct = async (id, callback) => {
    await axios.get('https://fakestoreapi.com/products/' + id).then((res)=>{
        callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    })
}
