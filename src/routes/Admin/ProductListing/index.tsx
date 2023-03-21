import './style.css';
import deleteImg from '../../../assets/delete.svg';
import editeImg from '../../../assets/edite.svg';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';
import * as productService from '../../../service/product-service'
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';

type QueryParams = {
    page: number;
    name: string;
}

export default function ProductListing() {

    const [isLastPage, setIsLastPage] = useState(false);

    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ''
    });

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Sucesso!"
    })

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

    function handleDialogClose() {
        setDialogInfoData({...dialogInfoData, visible: false})
    }

    function handleDeleteProductClick() {
        setDialogInfoData({...dialogInfoData, visible: true})
    }

    return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div className="dsc-btn dsc-btn-white">Novo</div>
                </div>

                <SearchBar onNewValue={handleSearchSubmit} />

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th className="dsc-tb576">ID</th>
                            <th></th>
                            <th className="dsc-tb768">Preço</th>
                            <th className="dsc-txt-left">Nome</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td className="dsc-tb576">{item.id}</td>
                                        <td><img className="dsc-product-listing-image" src={item.imgUrl} alt="Computer" /></td>
                                        <td className="dsc-tb768">R$ {item.price}</td>
                                        <td className="dsc-txt-left">{item.name}</td>
                                        <td><img className="dsc-product-listing-btn" src={editeImg} alt="Editar" /></td>
                                        <td><img onClick={handleDeleteProductClick} className="dsc-product-listing-btn" src={deleteImg} alt="Deletar" /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {
                    !isLastPage &&
                    <ButtonNextPage onNextPage={handleNextPageClick} />
                }
            </section>

            {
                dialogInfoData.visible &&
                <DialogInfo message={dialogInfoData.message} onDiologClose={handleDialogClose}/>
            }

        </main>
    );
}