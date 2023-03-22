import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
    id: number;
    message: string;
    onDiologAnswer: Function;
}

export default function DialogConfirmation({ id, message, onDiologAnswer }: Props) {

    return (
        <div className="dsc-dialog-page" onClick={() => onDiologAnswer(false, id)}>
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>

                <div className="dsc-dialog-button-container" >
                    <div onClick={() => onDiologAnswer(true, id)}>
                        <ButtonPrimary text={'Sim'} />
                    </div>
                    <div onClick={() => onDiologAnswer(false, id)}>
                        <ButtonInverse text={'Não'} />
                    </div>
                </div>
            </div>
        </div>
    );
}