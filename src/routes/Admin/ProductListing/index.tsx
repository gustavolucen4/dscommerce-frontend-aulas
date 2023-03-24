import './style.css';
import deleteImg from '../../../assets/delete.svg';
import editeImg from '../../../assets/edite.svg';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';
import * as productService from '../../../service/product-service'
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';
import DialogConfirmation from '../../../components/DialogConfirmation';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';

type QueryParams = {
    page: number;
    name: string;
}

export default function ProductListing() {

    const navigate = useNavigate();

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

    const [dialogConfirmData, setDialogConfirmData] = useState({
        visible: false,
        id: 0,
        message: "Você tem certeza ?"
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
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    function handleUpdateProductClick(productId: number) {
        navigate(`/admin/products/${productId}`);
    }

    function handleDeleteProductClick(productId: number) {
        setDialogConfirmData({ ...dialogConfirmData, visible: true, id: productId });
    }

    function handleConfirmationDialogClose(answer: boolean, productId: number) {
        if (answer) {
            productService.deleteProduct(productId)
                .then(() => {
                    setProducts([]);
                    setQueryParams({ page: 0, name: '' });

                }).catch((error) => {
                    setDialogInfoData({ visible: true, message: error.response.data.error })
                })
        }

        setDialogConfirmData({ ...dialogConfirmData, visible: false });
    }

    function handleNewProductClick() {
        navigate('/admin/products/create')
    }


    return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div onClick={handleNewProductClick}>
                        <ButtonInverse text={'Novo'} />
                    </div>
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
                                        <td className="dsc-tb768">R$ {item.price.toFixed(2)}</td>
                                        <td className="dsc-txt-left">{item.name}</td>
                                        <td><img onClick={() => handleUpdateProductClick(item.id)} className="dsc-product-listing-btn" src={editeImg} alt="Editar" /></td>
                                        <td><img onClick={() => handleDeleteProductClick(item.id)} className="dsc-product-listing-btn" src={deleteImg} alt="Deletar" /></td>
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
                <DialogInfo message={dialogInfoData.message} onDiologClose={handleDialogClose} />
            }
            {
                dialogConfirmData.visible &&
                <DialogConfirmation id={dialogConfirmData.id} message={dialogConfirmData.message} onDiologAnswer={handleConfirmationDialogClose} />
            }

        </main>
    );
}