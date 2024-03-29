import './style.css'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../../service/auth-service';
import * as forms from '../../../utils/forms'
import { ContextToken } from '../../../utils/context-token';
import FormInput from '../../../components/FormInput';


export default function Login() {

    const navigate = useNavigate();
    const { setContextTokenPayload } = useContext(ContextToken);

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const [formData, setFormData] = useState<any>({
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            placeholder: "Email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Favor informar um email válido",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Senha",
        }
    })
    
    function handleSubmit(event: any) {
        event.preventDefault();

        setSubmitResponseFail(false);

        const formDataValidated = forms.dirtyAndValidateAll(formData);
        console.log(formDataValidated)
        if(forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        authService.loginRequest(forms.toValues(formData))
            .then((response) => {
                authService.saveAccessToken(response.data.access_token);
                setContextTokenPayload(authService.getAccessTokenPayload());
                navigate('/cart');
            })
            .catch(error => {
                setSubmitResponseFail(true);
            })
    }

    function handleInputChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(forms.updateAndValidate(formData, name, value));
    }

    function handleTurnDirty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    return (
        <main>
            <section id="login-section" className="dsc-container">
                <div className="dsc-login-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput {...formData.username} className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                                <div className="dsc-form-error">{formData.username.message}</div>
                            </div>
                            <div>
                                <FormInput  {...formData.password} className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                                <div className="dsc-form-error">{formData.password.message}</div>
                            </div>
                        </div>


                        {
                            submitResponseFail &&
                            <div className='dsc-form-global-error'>
                                Email ou Senha invalidos
                            </div>
                        }

                        <div className="dsc-login-form-buttons dsc-mt20">
                            <button type="submit" className="dsc-btn dsc-btn-blue">Entrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}