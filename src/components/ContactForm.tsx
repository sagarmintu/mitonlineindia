import { useState } from 'react';
import {  RightArrow } from "@/utils/image-constants";
import Image from 'next/image';
import EmailIcon from "../images/email-contact.svg";
import NameIcon from "../images/name.svg";
import CommentIcon from "../images/comment.svg";


export default function ContactForm() {
  const [loading, startLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    FirstName: '',
    Email: '',
    MobileNumber: '',
    Remarks: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    startLoading(true)
    const apiData = {
      AuthToken: "MITSDE-11-06-2020",
      Source: "mitsde",
      FirstName: formData.FirstName,
      Email: formData.Email,
      MobileNumber: formData.MobileNumber,
      Remarks: formData.Remarks,
      LeadSource: "MITOnline-Form-Organic",
      LeadType: "Online",
      LeadName: "Contact us MITOnline"
    };

    try {
      const response = await fetch('https://thirdpartyapi.extraaedge.com/api/SaveRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true)
        console.error('Form submission failed');
      }
    } catch (error) {
      setError(true)
      console.error('Error submitting form:', error);
    } finally {
      startLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className='contact-form' >
      <div>
          <Image className='image-form' src={NameIcon} alt='EmailIcon' />
          <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              placeholder="Full Name"
              required
          />
      </div>
      <div>
          <Image className='image-form' src={EmailIcon} alt='EmailIcon' />
          <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Email"
              required
          />
      </div>
      <div>
          <svg className='image-form' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 25" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 5C1.5 4.20435 1.81607 3.44129 2.37868 2.87868C2.94129 2.31607 3.70435 2 4.5 2H5.872C6.732 2 7.482 2.586 7.691 3.42L8.796 7.843C8.88554 8.201 8.86746 8.57746 8.74401 8.92522C8.62055 9.27299 8.39723 9.57659 8.102 9.798L6.809 10.768C6.674 10.869 6.645 11.017 6.683 11.12C7.24738 12.6549 8.1386 14.0487 9.29495 15.2051C10.4513 16.3614 11.8451 17.2526 13.38 17.817C13.483 17.855 13.63 17.826 13.732 17.691L14.702 16.398C14.9234 16.1028 15.227 15.8794 15.5748 15.756C15.9225 15.6325 16.299 15.6145 16.657 15.704L21.08 16.809C21.914 17.018 22.5 17.768 22.5 18.629V20C22.5 20.7956 22.1839 21.5587 21.6213 22.1213C21.0587 22.6839 20.2956 23 19.5 23H17.25C8.552 23 1.5 15.948 1.5 7.25V5Z" fill="#090401"/>
          </svg>
          <input
              type="tel"
              name="MobileNumber"
              value={formData.MobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              minLength={10}
              maxLength={10}
          />
      </div>
      <div>
          <Image className='image-form' src={CommentIcon} alt='EmailIcon' />
          <textarea
              name="Remarks"
              value={formData.Remarks}
              onChange={handleChange}
              placeholder="Remarks"
              rows={5}
          ></textarea>
      </div>
      <button disabled={loading || success} type="submit" className='btn btn-primary'>
          {loading ? 'Submitting...' : success ? 'Submitted' : 'Submit'}
          <Image src={RightArrow} alt="" />
      </button>
      {error ? <p className='message error'>There was some error while sending the form!</p> : success ? <p className='message success'>Form submitted successfully!</p> : '' }
    </form>
  );
}