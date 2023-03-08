import './style.css';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonPrimary from '../../../components/ButtonPrimary';
import CardDetails from '../../../components/CardDetails';
import * as productService from '../../../service/product-service'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';
import axios from 'axios';

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

    return (
        <>
            <main>
                <section id="product-details-section" className="dsc-container">
                    {
                        product &&
                        <CardDetails key={product.id} product={product} />
                    }
                    <div className="dsc-btn-page-container">
                        <ButtonPrimary text='Comprar' />
                        <Link to={'/'}>
                            <ButtonInverse text='Início' />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}