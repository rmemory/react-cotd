import React, { Fragment } from 'react';

class EditFishForm extends React.Component {
	handleChange = (event) => {
		//1. make copy of current fish
		const updatedFish = {...this.props.fish}
		//2. Update the field
		updatedFish[event.currentTarget.name]=event.currentTarget.value;
		//3. Save the updated fish into state
		this.props.editFishStateFunc(this.props.fishKey, updatedFish);
	}

	render() {
		const { name, price, status, desc, image } = this.props.fish;
		return (
			<Fragment>
				<div className="fish-edit">
					<input type="text" name="name" onChange={this.handleChange} value={name}/>
					<input type="text" name="price" onChange={this.handleChange} 
						value={price}/>
					<select name="status" onChange={this.handleChange} value={status}>
						<option value="available">Fresh!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
					<textarea name="desc" onChange={this.handleChange} value={desc}></textarea>
					<input type="text" name="image" onChange={this.handleChange} value={image}/>
					<button onClick={() => this.props.deleteFishStateFunc(this.props.fishKey)}>Remove Fish</button>
				</div>
			</Fragment>
		)
	}
}

export default EditFishForm;