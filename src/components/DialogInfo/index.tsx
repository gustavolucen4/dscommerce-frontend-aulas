import ButtonPrimary from "../ButtonPrimary";

type Props = {
    message: string;
    onDiologClose: Function;
}

export default function DialogInfo({ message, onDiologClose }: Props) {

    return (
        <div className="dsc-dialog-page" onClick={() => onDiologClose()}>
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-button" onClick={() => onDiologClose()}>
                    <ButtonPrimary text={'OK'} />
                </div>
            </div>
        </div>
    );
}