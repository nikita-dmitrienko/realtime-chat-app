import { BrowserRoute as Router, Route } from 'react-router-dom';

const App = () => (
	<Router>
		<Route path="/" exact component={Join} />
		<Route path="/chat" component={Chat} />
	</Router>
);

export default App;