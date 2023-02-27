import computerImg from '../../assets/computer.png';
import { ProductDTO } from '../../models/product';
import { CategoryCardDeteils } from '../CategoryCardDetalis';
import './style.css';

type Props = {
    product: ProductDTO
}

export default function CardDetails({ product }: Props) {

    return (
        <>
            <div className="dsc-card dsc-mb20">
                <div className="dsc-product-details-top dsc-line-bottom">
                    <img src={product.imgUrl} alt="Computador" />
                </div>
                <div className="dsc-product-details-bottom">
                    <h3>{product.price}</h3>
                    <h4>{product.name}</h4>
                    <p>
                        {product.description}
                    </p>
                    <div className="dsc-category-container">
                        {
                            product.categories.map(item => (
                                <CategoryCardDeteils key={item.id} name={item.name}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}