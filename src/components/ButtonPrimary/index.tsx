import './style.css';

type Props = {
    text: String
}

export default function ButtonPrimary({ text }: Props) {

    return (
        <div className="dsc-btn dsc-btn-blue">
            {text}
        </div>
    );
}