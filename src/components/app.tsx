import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Settings from '../routes/settings';

const App: FunctionalComponent = () => {
    return (
        <div id="preact_root">
            	<style jsx>{`
				@font-face {
					font-family: system;
					font-style: normal;
					font-weight: 100;
					src: url('/fonts/Poppins-Thin.ttf') format('truetype');
				}

				@font-face {
					font-family: system;
					font-style: normal;
					font-weight: 300;
					src: url('/fonts/Poppins-Regular.ttf') format('truetype');
				}

				@font-face {
					font-family: system;
					font-style: normal;
					font-weight: 600;
					src: url('/fonts/Poppins-Bold.ttf') format('truetype');
				}
			`}</style>
            <Router>
                <Route path="/" component={Home} />
                <Route path="/settings/" component={Settings} />
            </Router>
        </div>
    );
};

export default App;
