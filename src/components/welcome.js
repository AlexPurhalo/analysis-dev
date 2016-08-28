import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
	render() {
		return <div>
			<br/>
			<p>Hi, want to say "Welcome!" and give respect for interesting issue.</p>
			<p>
				If you read this that means that I dealt with task.
				Hope you love React and Redux... <Link className="nav-link" to="/feature">Let's check how it works...</Link>
			</p>
			<br/>
			<p>Feel free to contact me if you have any question, skype: alexpuhralo.</p>
			<p>Repositories:
				<a href="https://github.com/AlexPurhalo/analysis-server"> Back-end </a>
				<a href="https://github.com/AlexPurhalo/analysis-dev">Front-end</a>
			</p>
		</div>;
	}
}
