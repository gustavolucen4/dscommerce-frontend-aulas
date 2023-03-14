import { useState } from 'react';
import './style.css';

type Props = {
    onNewValue: Function
}

export default function SearchBar({ onNewValue }: Props) {

    const [text, setText] = useState('');

    function handleChange(event: any) {
        setText(event.target.value)
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        onNewValue(text);
    }

    function handleResetClick() {
        setText('');
        onNewValue(text);
    }

    return (
        <form onSubmit={handleSubmit} className="dsc-search-bar">
            <button type="submit">🔎︎</button>
            <input value={text} type="text" placeholder="Nome do produto" onChange={handleChange} />
            <button onClick={handleResetClick} className='dsc-btn-clear'>🗙</button>
        </form>
    );
}