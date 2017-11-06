import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
    render(props) {
        return (
		<div className='NavBar'>
			<Link to="/">Home</Link>
			{props.currentUser
				? (
					<span>
						<Link to="/vip">VIP</Link>
						<Link to="/logout">Log Out</Link>
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
		</div>
	)
    }
}

// const NavBar = (props) => {
// 	return (
// 		<div className='NavBar'>
// 			<Link to="/">Home</Link>
// 			{props.currentUser
// 				? (
// 					<span>
// 						<Link to="/vip">VIP</Link>
// 						<Link to="/logout">Log Out</Link>
// 					</span>
// 				)
// 				: (
// 					<span>
// 						<Link to="/login">Log In</Link>
// 						<Link to="/signup">Sign Up</Link>
// 					</span>
// 				)
// 			}
// 		</div>
// 	)
// }

export default NavBar