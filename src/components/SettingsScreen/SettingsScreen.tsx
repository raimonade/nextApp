import { useEffect, useState } from 'react';
import s from './SettingsScreen.module.scss';
import BackArrow from 'assets/svgs/back.svg';
import Link from 'next/link';
import axios from 'axios';

const SettingsScreen = () => {
	const [number, setnumber] = useState(0);
	const [status, setstatus] = useState(false);
	const [sent, setsent] = useState(false);
	let timeout;

	const postSettings = () => {
		setstatus(false);
		setsent(false);
		axios
			.post('/changeVals', {
				maxPeople: number,
			})
			.then(() => onSuccess())
			.catch(() => onError());
	};

	useEffect(() => {
		return () => clearTimeout(timeout);
	}, []);

	function onSuccess() {
		setstatus(true);
		setsent(true)
	}

	function onError() {
		setstatus(false);
		setsent(true)
	}

	function parsenum(evt) {
		if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
			evt.preventDefault();
		}
	}

	return (
		<div className={s.Wrapper}>
			<div className={s.SettingsWindow}>
				<Link href="/">
					<a className={s.BackArrow}>
						<BackArrow />
					</a>
				</Link>
				<div className={s.SettingsContainer}>
					<div className={s.SettingsInput}>
						<label htmlFor="">Ievadiet maksimālo cilvēku skaitu</label>
						<input
							type="number"
							onChange={(e) => setnumber(Number(e.target.value))}
							onKeyPress={(e) => parsenum(e)}
						/>
					</div>
					<button
						className={s.SettingsConfirm}
						onClick={() => postSettings()}
						disabled={number === 0}
					>
						Saglabāt
					</button>
					{sent ? (
						<span className={s.SettingsStatus} data-status={status.toString()}>
							{status ? 'Izmaiņas saglabātas' : 'Izmaiņas netika saglabātas'}
						</span>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default SettingsScreen;
