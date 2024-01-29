import { Fragment, useEffect, /* useRef, */ useState } from "react"
import Button from "../components/Elements/Button/Index";
import CardProduct from "../components/Fragments/CardProduct"
import { getProducts } from "../services/products.service";
import { useLogin } from "../hooks/useLogin";
import { useCookies } from "react-cookie";

const ProductPages = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState([])
    const username = useLogin()
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    useEffect(() => {
        
    },[])

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')) || [])
    }, [])

    useEffect(() => {
        getProducts((data) => {
            setProducts(data)
        })
    })

    useEffect(() => {
        if(products.length>0 && cart.length > 0){
            const sum = cart.reduce((acc, item) => {
                const product = products.find(product => product.id === item.id);
                return acc + product.price * item.qty
            }, 0)
            setTotalPrice(sum)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart, products])

    const handleLogout = () => {
        removeCookie('token', {path: '/'});
        window.location.href = '/login';
    }

    const handleAddToCart = (id) => {
        if(cart.find(item => item.id === id)){
            setCart(
                cart.map(item => item.id === id ? {...item, qty: item.qty + 1} : item)
            )
        } else{
            setCart([...cart, {id, qty: 1}])
        }
    }

    // usRef

    // const cartRef = useRef(JSON.parse(localStorage.getItem('cart')) || []);

    // const handleAddToCartRef = (id) => {
    //     cartRef.current = [...cartRef.current, {id, qty: 1}];
    //     localStorage.setItem('cart', JSON.stringify(cartRef.current));
    // }

    return (
        <Fragment>
            <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
                {username}
                <Button classname="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="flex justify-center py-5">            
                <div className="w-2/3 flex flex-wrap">
                    {products.length> 0 && 
                    products.map((product) => (
                    <CardProduct key={product.id}>
                        <CardProduct.Header images={product.image} id={product.id} />
                        <CardProduct.Body title={product.title}>{product.description}</CardProduct.Body>
                        <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCart} />
                    </CardProduct>
                    ))}
                </div>
                <div className="w-1/3">
                    <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>
                    <table className="text-left table-auto border-separate border-spacing-x-5">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length>0 && 
                            cart.map((item) => {
                                const product = products.find((product) => product.id === item.id);
                                return (
                                    <tr key={item.id}>
                                        <td>{product.title.substring(0,10)}...</td>
                                        <td>{product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                                        <td>{item.qty}</td>
                                        <td>{(item.qty * product.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={3}>
                                    <b>
                                        Total Price
                                    </b>
                                </td>
                                <td>
                                    <b>{totalPrice.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductPages