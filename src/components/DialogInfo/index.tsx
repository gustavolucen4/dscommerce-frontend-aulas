import ButtonPrimary from "../ButtonPrimary";

type Props = {
    message: string;
    onDiologClose: Function;
}

export default function DialogInfo({ message, onDiologClose }: Props) {

    return (
        <div className="dsc-dialog-page" onClick={() => onDiologClose()}>
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>Operação realizada com sucesso!</h2>
                <div className="dsc-dialog-button-container" onClick={() => onDiologClose()}>
                    <ButtonPrimary text={message} />
                </div>
            </div>
        </div>
    );
}