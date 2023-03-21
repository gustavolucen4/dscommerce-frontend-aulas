import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
    message: string;
    onDiologAnswer: Function;
}

export default function DialogConfirmation({ message, onDiologAnswer }: Props) {

    return (
        <div className="dsc-dialog-page" onClick={() => onDiologAnswer(false)}>
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>

                <div className="dsc-dialog-button-container" >
                    <div onClick={() => onDiologAnswer(true)}>
                        <ButtonPrimary text={'Sim'} />
                    </div>
                    <div onClick={() => onDiologAnswer(false)}>
                        <ButtonInverse text={'Não'} />
                    </div>
                </div>
            </div>
        </div>
    );
}