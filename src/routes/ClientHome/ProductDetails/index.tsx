import './style.css';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonPrimary from '../../../components/ButtonPrimary';
import CardDetails from '../../../components/CardDetails';
import * as productService from '../../../service/product-service'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ProductDetails() {

    const params = useParams();
    const product = productService.findById(Number(params.productId));

    return (
        <>
            <main>
                <section id="product-details-section" className="dsc-container">
                    {
                        product &&
                        <CardDetails key={product.id} product={product}/>
                    }
                    <div className="dsc-btn-page-container">
                        <ButtonPrimary text='Comprar'/>
                        <Link to={'/'}>
                            <ButtonInverse text='Início'/>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}