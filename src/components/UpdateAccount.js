import React, { useState } from 'react'

const UpdateAccount = (props) => {

    const [firstName, setFirstName] = useState(props.account.firstName);
    const [lastName, setLastName] = useState(props.account.lastName);
    const [mobile, setMobile] = useState(props.account.mobile);
    const [address, setAddress] = useState(props.account.address);
    const [city, setCity] = useState(props.account.city);


    return (
        <div>
            <label className="form-label">First name <span style={{ color: '#880000' }}>*</span></label>
            <input
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
                type="email"
                className="form-control" />

            <label className="form-label">Last name <span style={{ color: '#880000' }}>*</span></label>
            <input
                value={lastName}
                onChange={(e) => { setLastName(e.target.value) }}
                type="email"
                className="form-control" />

            <label className="form-label">Mobile</label>
            <input
                value={mobile}
                onChange={(e) => { setMobile(e.target.value) }}
                type="email"
                className="form-control" />

            <label className="form-label">Address</label>
            <input
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
                type="email"
                className="form-control" />

            <label className="form-label">City</label>
            <input
                value={city}
                onChange={(e) => { setCity(e.target.value) }}
                type="email"
                className="form-control" />


            <button
            onClick={() => props.updateMyAccount(
                firstName, lastName, city, address, mobile, props.account.id
            )}
            className='btn btn-success'>Update</button>
        </div>
    )
}

export default UpdateAccount