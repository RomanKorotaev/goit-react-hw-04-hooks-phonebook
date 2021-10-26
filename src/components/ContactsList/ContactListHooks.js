import React, { useState } from "react";
import s from "./ContactsList.module.css";
import PropTypes from 'prop-types';
// import Contact from '../Contact'
import ContactHooks from '../Contact/ContactHooks'

function ContactsListHooks ({ contactsArray, onDeleteContact }) {

    const [contacts, setContacts] = useState([]);

    const deleteContact = (contactId) => {

        setContacts  ( prevState => ({
            contacts: prevState.contacts.filter ( contact=> contact.id !== contactId)
          }) )

        // this.setState ( prevState => ({
        //   contacts: prevState.contacts.filter ( contact=> contact.id !== contactId)
        // }) )
      }

    return (
        <ul className= {s.ContactsListStyle}>
          {/* <span className= {s.contactsListTitle}>Contacts</span> */}
          {contactsArray.map(({id, name, number}) => (
              <li  className= {s.item}  key = {id}>
  
                {/* ВНИМАНИЕ!  Важный синтаксис во время прокидывания пропов по цепочке: onDelete = {()=>onDeleteContact(id)} */}
                    {/* <Contact name={name} number ={number} onDelete = {()=>onDeleteContact(id)} /> */}
                    <ContactHooks name={name} number ={number} onDelete = {()=>onDeleteContact(id)} />
              </li>
            ))}
        </ul>
  
      );
}

ContactsListHooks.propTypes = {
 
    state: PropTypes.arrayOf(
      // Объект с определённой структурой
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ), 
  };

  export default ContactsListHooks;
