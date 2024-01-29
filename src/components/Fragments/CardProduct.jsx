import { Link } from "react-router-dom"
import Button from "../Elements/Button/Index"

const CardProduct = (props) =>{
    const {children} = props
    return (
        <div className="w-full max-w-sm bg-gray-400 border-gray-700 rounded-lg shadow mx-2 my-2 flex flex-col justify-between">
                {children}
            </div>
    )
}

const Body = ({children, title}) =>{
    return (
        <div className="px-5 pb-5 h-full">
            <a href="">
                <h5 className="text-xl font-semibold tracking-tight text-white">{title.substring(0,20)}...</h5>
                <p className="text-s text-white">{children.substring(0,100)}...</p>
            </a>
        </div>
    )
}

const Footer = (props) =>{
    const {price, handleAddToCart, id} = props;
    return (
        <div className="flex items-center justify-between px-5 pb-5">
            <span className="text-xl font-bold text-white">{price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
            <Button classname="bg-blue-600 hover:bg-blue-900 hover:scale-110 transition-all" onClick={() => handleAddToCart(id)}>Add to Cart</Button>
        </div>
    )
}

const Header = ({images, id}) =>{
    return (
        <Link to={`/product/${id}`}>
            <img src={images} alt="shoes" className="p-8 runded-t-lg h-60 w-full object-cover transition-all ease-in-out hover:scale-110 hover:brightness-75 duration-300"></img>
        </Link>
    )
}

CardProduct.Header = Header
CardProduct.Body = Body
CardProduct.Footer = Footer

export default CardProduct