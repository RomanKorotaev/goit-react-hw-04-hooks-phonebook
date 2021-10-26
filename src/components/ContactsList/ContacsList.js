import React, { Component } from "react";
import s from "./ContactsList.module.css";
import PropTypes from 'prop-types';
import Contact from '../Contact'

class ContactsList extends Component {

  state = {
    
    contacts: [ ],
  };

  deleteContact = (contactId) => {
    this.setState ( prevState => ({
      contacts: prevState.contacts.filter ( contact=> contact.id !== contactId)
    }) )
  }


  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul className= {s.ContactsListStyle}>
        {/* <span className= {s.contactsListTitle}>Contacts</span> */}
        {contacts.map(({id, name, number}) => (
            <li  className= {s.item}  key = {id}>

              {/* ВНИМАНИЕ!  Важный синтаксис во время прокидывания пропов по цепочке: onDelete = {()=>onDeleteContact(id)} */}
                  <Contact name={name} number ={number} onDelete = {()=>onDeleteContact(id)} />
            </li>
          ))}
      </ul>

    );
  }
}

ContactsList.propTypes = {
 
  state: PropTypes.arrayOf(
    // Объект с определённой структурой
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ), 
};

export default ContactsList;

