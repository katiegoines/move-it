import React from 'react'
import axios from 'axios'
import clientAuth from '../clientAuth'

class EditProfile extends React.Component {
	state = {
        currentUser: clientAuth.getCurrentUser(),
		fields: { name: clientAuth.getCurrentUser().name, email: clientAuth.getCurrentUser().email, password: ''}
    }
    
    componentDidMount() {
        const id = this.state.currentUser._id
        axios({method: 'get', url: `/api/users/${id}`})
        .then((res) => {
            // console.log(res.data.password)
            this.setState({fields: {
                name: res.data.name, 
                email: res.data.email, 
                password: res.data.password }
            })
        })
    }

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
    }
    
    deleteButton() {
        console.log("Clicked delete.")
        const id = this.state.currentUser._id
        if(window.confirm("Are you sure?") === true) {
            axios({method: "delete", url:`/api/users/${id}`})
            .then((res) => {
                clientAuth.getCurrentUser()
            })
            .then(() => {
                this.props.history.push(`/logout`)
            })
         }
    }

    cancelButton() {
        this.props.history.push(`/profile`)
    }

	onFormSubmit(evt) {
        evt.preventDefault()
        const id = this.state.currentUser._id
        axios({method: 'patch', url: `/api/users/${id}`, data: this.state.fields})
        .then((res) => {
            console.log(res)
            this.setState({fields: {
                name: res.data.user.name,
                email: res.data.user.email,
                password: res.data.user.password
            }})
            this.props.history.push(`/profile`)
        })
	}
	
	render() {
		const { name, email, password } = this.state.fields
		return (
			<div className='SignUp'>
                <div className="container">
				<h1>Edit Profile</h1>
				<form  onSubmit={this.onFormSubmit.bind(this)}>
					<input onChange={this.onInputChange.bind(this)} type="text" placeholder="Name" name="name" value={name} />
					<input onChange={this.onInputChange.bind(this)} type="text" placeholder="Email" name="email" value={email} />
					<input onChange={this.onInputChange.bind(this)} type="password" placeholder="Password" name="password" value={password} />
					
                    
				</form>
                <button className="button button-outline left-button" onClick={this.onFormSubmit.bind(this)}>Save Changes</button> 
                <button className="button button-outline middle-button" onClick={this.cancelButton.bind(this)}>Cancel</button>
                <button className="button button-outline right-button" onClick={this.deleteButton.bind(this)} >Delete Account</button>
                
			</div>
            </div>
		)
	}
}

export default EditProfile