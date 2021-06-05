import React, { Component } from 'react';
import './styles.scss';
import FormInput from './../Forms/FormInput';

const initialState = {
    required: false,
    name: '',
    address: '',
    secondaryAddress: '',
    cityTown: '',
    regionStateProvince: '',
    postalCode: '',
    country: '',
    googleMapLink: ''
}

class Address extends Component {
    constructor(props) {
        super(props)

        if (!this.props.address) {
            this.state = { ...initialState };
        } else if (this.props.required) {
            if (!this.props.address) {
                this.state = { ...initialState };
                // THEN SET REQUIRED TO TRUE
            } else if (this.props.address) {
                // THEN ASSIGN state with address
            }
        } else {
            this.state = { ...initialState };
        }

        this.handleChange = this.handleChange.bind(this);
        // some thing to shoot it up!???
        this.handleSubmit = this.handleSubmit.bind(this);
        this.autocomplete = null;
    }

    componentDidMount() {
        // this.autocomplete = new google.maps.places.autocomplete(document.getElementById('autocomplete'), {});
        // this.autocomplete.addListener("place_changed", this.handlePlaceSelected);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.clearForm();
        // this.props.dispatch(addParlor(this.state))
        // this is just some redux.
        // just trust that it does what it's supposed to do,
        // send an ajax request to my server
    }

    /*handlePlaceSelected(index) {
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
        this.setState({
            name: addressObject.name,
            address: `${address[0].long_name} ${address[1].long_name}`,
            cityTown: address[4].long_name,
            regionStateProvince: address[6].short_name,
            postalCode: address[8].short_name,
            googleMapLink: addressObject.url
        })
    }*/

    render() {
        const { name, address, secondaryAddress, cityTown, regionStateProvince, postalCode, country } = this.state;
        return (
            <div>
                <FormInput
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Addressee"
                    onChange={this.handleChange}
                />

                <FormInput
                    id="autocomplete"
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Address"
                    onChange={this.handleChange}
                />

                <FormInput
                    type="text"
                    name="secondaryAddress"
                    value={secondaryAddress}
                    placeholder="Secondary Address (Unit #, Buzz #)"
                    onChange={this.handleChange}
                />

                <FormInput
                    type="text"
                    name="cityTown"
                    value={cityTown}
                    placeholder="City / Town"
                    onChange={this.handleChange}
                />

                <FormInput
                    type="text"
                    name="regionStateProvince"
                    value={regionStateProvince}
                    placeholder="Region / State / Province"
                    onChange={this.handleChange}
                />

                <FormInput
                    type="text"
                    name="country"
                    value={country}
                    placeholder="Country"
                    onChange={this.handleChange}
                />

                <FormInput
                    type="text"
                    name="postalCode"
                    value={postalCode}
                    placeholder="Postal / ZIP Code"
                    onChange={this.handleChange}
                />

            </div>
        )
    }
}

export default Address;
