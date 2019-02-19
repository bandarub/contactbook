import React from 'react';

const AlphaNav = props => {
	return (
		<li class="nav-item alphaNav">
			<a key={props.char} href={`#${props.char}`}>
				{props.char}
			</a>
		</li>
	);
};

export default AlphaNav;
