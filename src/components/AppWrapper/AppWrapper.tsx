import s from './AppWrapper.scss';
import type { ComponentChildren } from 'preact';
import { h } from 'preact';

type Props = {
	children: ComponentChildren;
};
const AppWrapper = ({ children }: Props) => {
	return <div className={s.Wrapper}>{children}</div>;
};

export default AppWrapper;
