import './style.css';
import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtonNextPage from '../../../components/ButtonNextPage';
import * as productService from '../../../service/product-service'
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';

type QueryParams = {
    page: number;
    name: string;
}

export default function Catalog() {

    const [isLastPage, setIsLastPage] = useState(false);

    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ''
    });

    useEffect(() => {
        productService.findPageRequest(queryParams.page, queryParams.name)
            .then(result => {
                const nextPage = result.data.content
                setProducts(products.concat(nextPage));
                setIsLastPage(result.data.last);
            })
    }, [queryParams])

    function handleSearchSubmit(value: string) {
        setProducts([]);
        setQueryParams({ page: 0, name: value });
    }

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }

    return (
        <>
            <main>
                <section id="catalog-section" className="dsc-container">
                    <SearchBar onNewValue={handleSearchSubmit} />

                    <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                        {
                            products.map(product =>
                                <CatalogCard key={product.id} product={product} />
                            )
                        }
                    </div>


                    {
                        !isLastPage &&
                        <ButtonNextPage onNextPage={handleNextPageClick}/>
                    }
                    
                </section>
            </main>
        </>
    );
}