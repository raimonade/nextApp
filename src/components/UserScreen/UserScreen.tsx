import React, { useState, useEffect, useRef } from 'react';
import People from '../../assets/svgs/users';
import Hexagon from '../../assets/svgs/hexagon';
import Pedestrian from '../../assets/svgs/walking';
import Hand from '../../assets/svgs/hand-paper';
import axios from 'axios';
import { Fragment, h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';
import s from './UserScreen.module.css';
import { a, useSpring } from 'react-spring';

const colors = {
	green: '#0DB246',
	red: '#EA3232',
};

const UserScreen: FunctionalComponent = () => {
	const [resp, setresp] = useState({} as any);
	const [allowed, _setAllowed] = useState(false);
	let timeout: NodeJS.Timeout;
	const allowedRef = React.useRef(allowed);
	const setAllowed = (data: boolean) => {
		allowedRef.current = data;
		_setAllowed(data);
	};

	const allowedSound = useRef(null);
	const notAllowedSound = useRef(null);
	const background = useSpring({
		backgroundColor: allowed ? colors.green : colors.red,
		config: {
			duration:0.3
		},
	});

	// On Component Mount
	useEffect(() => {
		axios.get('/firstboot');
		window.addEventListener('keydown', onKeydown);
		// On component unmount
		timeout = setTimeout(() => getCameraData(), 333);
		return () => {
			window.removeEventListener('keydown', onKeydown);
			clearTimeout(timeout);
		};
	}, []);

	function onKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft':
				setAllowed(false);
				break;
			case 'ArrowRight':
				setAllowed(true);
				break;
			default:
				return;
		}
		setSound();
	}

	function getCameraData(url = '/api') {
		// tas pats fetch requests, tikai ar moduli
		// kuram labaks error handlings utt,
		// bet ideja nemainas
		axios
			.get(url)
			.then(({ data }) => onSuccess(data))
			.catch((err) => onError(err));
	}

	function setSound(isAllowed = allowedRef.current) {
		// @ts-ignore
		notAllowedSound.current.currentTime = 0;
		// @ts-ignore
		notAllowedSound.current.pause();
		// @ts-ignore
		allowedSound.current.pause();
		// @ts-ignore
		allowedSound.current.currentTime = 0;

		if (!isAllowed) {
			// @ts-ignore
			notAllowedSound.current.play();
			return;
		}
		// @ts-ignore
		allowedSound.current.play();
	}

	function onSuccess(res: any) {
		const all = res.MaxPeople - res.PeopleCount > 0;

		if (allowedRef.current !== all) {
			setSound(all);
			setAllowed(all);
		}
		setresp(res);

		timeout = setTimeout(() => getCameraData(), 333);
	}

	function onError(err: any) {
		clearTimeout(timeout);
	}

	return (
		<a.div className={s.Screen} style={background}>
			<audio ref={allowedSound} src="sounds/ding.mp3"></audio>
			<audio ref={notAllowedSound} src="sounds/VeikalsPilns.wav"></audio>

			<div className={s.PeopleCount}>
				<Link href="/settings">
					<a>
						<People />
					</a>
				</Link>
				<span>
					{resp.PeopleCount > 0 ? resp.PeopleCount : 0} / {resp.MaxPeople}
				</span>
			</div>
			<div className={s.Body}>
				<div className={s.Icon}>
					{allowed ? (
						<Pedestrian />
					) : (
						<Fragment>
							<Hexagon />
							<Hand className={s.Hand} />
						</Fragment>
					)}
				</div>
				<h1>{allowed ? 'IEEJA ATĻAUTA' : 'IEEJA AIZLIEGTA'}</h1>
			</div>
		</a.div>
	);
};

export default UserScreen;
