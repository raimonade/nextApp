import { FunctionalComponent, h } from 'preact';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import SettingsScreen from '../../components/SettingsScreen/SettingsScreen';

const Settings: FunctionalComponent = () => {
	return (
		<AppWrapper>
			<SettingsScreen />
		</AppWrapper>
	);
};

export default Settings;
