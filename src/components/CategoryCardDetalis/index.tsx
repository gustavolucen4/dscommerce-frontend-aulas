import './style.css';

type Props = {
    name : string;
}

export function CategoryCardDeteils( { name } : Props ) {

    return (
        <div className="dsc-category">
            {name}
        </div>
    );
}