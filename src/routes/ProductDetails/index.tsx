import './style.css';
import ButtonInverse from "../../components/ButtonInverse";
import ButtonPrimary from "../../components/ButtonPrimary";
import CardDetails from "../../components/CardDetails";
import HeaderClient from "../../components/HeaderClient";
import { ProductDTO } from '../../models/product';

const product: ProductDTO =  {
    id: 1,
    name: 'Smart TV',
    description: 'TV gamer muito bonita 144hz e 1ms de resposta.',
    imgUrl: 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
    price: 2500.99,
    categories: [
        {
            id:2,
            name:'Eletrônicos'
        }, 
        {
            id:3,
            name:'Compuatdores'
        }, 
        {
            id: 4,
            name: 'Importados'
        }
    ]
}

export default function ProductDetails() {

    return (
        <>
            <HeaderClient />
            <main>
                <section id="product-details-section" className="dsc-container">
                    <CardDetails product={product}/>
                    <div className="dsc-btn-page-container">
                        <ButtonPrimary />
                        <ButtonInverse />
                    </div>
                </section>
            </main>
        </>
    );
}