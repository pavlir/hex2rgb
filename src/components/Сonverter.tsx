import {useState } from 'react'

const ERROR_COLOR = '#E94B35';
const ERROR_TEXT = 'Ошибка!';

export const Сonverter : React.FC = () => {
	const [hex, setHex] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	const handleHexChange = ({target} : {target : HTMLInputElement}) : void => {
		const value = target.value;
		setHex(value);
		setError(value.length === 7 && !/^#[0-9A-F]{6}$/i.test(value));
	};

	const hex2rgb = (hexValue: string) : string => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);

		if (!result) {
			return '';
		}

		return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
	};

	const rgb = hex2rgb(hex);
	const background = error ? ERROR_COLOR : rgb;
	const convertValue = error ? ERROR_TEXT :  rgb;

  return (
		<div className='converter-background' style={{backgroundColor: background}}>
			<form className='converter'>
				<input id='hex' name='hex' value={hex} onChange={handleHexChange} placeholder='#FFFFFF' maxLength={7}/>
				<input id='rgb' name='rgb' value={convertValue} readOnly/>
			</form>
		</div>
  )
}