import './style.css';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonPrimary from '../../../components/ButtonPrimary';
import CardDetails from '../../../components/CardDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';
import * as productService from '../../../service/product-service'
import * as cartService from '../../../service/cart-service'

export default function ProductDetails() {

    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState<ProductDTO>();

    useEffect(() => {
        productService.findById(Number(params.productId))
            .then(response => {
                setProduct(response.data);
            })
            .catch(() => {
                navigate("/");
            });

    }, [])

    function handleBuyClick(){
        if(product){
            cartService.addProduct(product);
        }
        navigate('/cart');
    }

    return (
        <>
            <main>
                <section id="product-details-section" className="dsc-container">
                    {
                        product &&
                        <CardDetails key={product.id} product={product} />
                    }
                    <div className="dsc-btn-page-container">
                        <div onClick={handleBuyClick}>
                            <ButtonPrimary text='Comprar' />
                        </div>
                        <Link to={'/'}>
                            <ButtonInverse text='Início' />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}