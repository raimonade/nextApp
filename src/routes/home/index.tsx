import { FunctionalComponent, h } from 'preact';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import PeopleCounter from '../../components/PeopleCounter/PeopleCounter';

const Home: FunctionalComponent = () => {
	return (
		<AppWrapper>
			<PeopleCounter />
		</AppWrapper>
	);
};

export default Home;
