
import s from "./App.module.css";
import React, {useState } from "react";

import shortid from 'shortid'

import ContactForm from "./components/ContactForm";
import ContactFormHooks from './components/ContactForm/ContactFormHooks';

import ContactsList from "./components/ContactsList";
import ContactsListHooks from './components/ContactsList/ContactListHooks'

import Filter from "./components/Filter";
import FilterHooks from "./components/Filter/FilterHooks";


function AppAppHooks () {

const [ contacts, setContacts] = useState ([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);

  const [ name, setName] = useState ('');
  const [  filter, setFilter] = useState ('');

 const formSubmitHandler = (data) => {
    console.log("formSubmitHandler");
    console.log("Новый контакт ( data ) : ", data);
 
    const newContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number
    }
        if ( isExist(data) ) {
        // если функция isExist возврвтит true, то такой контакт уже есть и мы сразу выходим, ничего не добавляем в список
        return;
            } else {
                    // Обновляем прежнее состояние массива через распыление
                    this.setState((prevState) => {
                        return {
                        contacts: [newContact, ...prevState.contacts ],
                            };
                    });
                }         
    
  };

}

export default AppHooks;