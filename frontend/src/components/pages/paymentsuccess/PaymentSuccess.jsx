
import React from 'react'
import "./paymentSuccess.css";
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = ({user}) => {

    const params = useParams();


  return (
    <div className='payment-success-page'>
        {user && (
            <div className='success-message'>
                <h2>Payment successfull</h2>
                <p>Your Course Subscription has been activated</p>
                <p>Reference number - {params.id}</p>
                <Link to={`/${user._id}/dashboard`} className='common-btn'> Go to dashboard</Link>
            </div>
        )}
    </div>
  )
}

export default PaymentSuccess