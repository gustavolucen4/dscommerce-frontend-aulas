import './style.css';
import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtonNextPage from '../../../components/ButtonNextPage';
import * as productService from '../../../service/product-service'
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';

export default function Catalog() {

    const [products, setProducts] = useState<ProductDTO[]>([]);

    useEffect(() => {
        productService.findAll()
            .then(
                result => {
                    const prods = result.data.content
                    setProducts(prods)
                }
            );
    })

    return (
        <>
            <main>
                <section id="catalog-section" className="dsc-container">
                    <SearchBar />

                    <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                        {
                            products.map(product =>
                                <CatalogCard key={product.id} product={product} />
                            )
                        }
                    </div>

                    <ButtonNextPage />
                </section>
            </main>
        </>
    );
}