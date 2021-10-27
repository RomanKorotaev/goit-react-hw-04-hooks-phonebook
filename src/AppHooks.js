
import s from "./App.module.css";
import React, {useState } from "react";

import shortid from 'shortid'

import ContactForm from "./components/ContactForm";
import ContactFormHooks from './components/ContactForm/ContactFormHooks';

import ContactsList from "./components/ContactsList";
import ContactsListHooks from './components/ContactsList/ContactListHooks'

import Filter from "./components/Filter";
import FilterHooks from "./components/Filter/FilterHooks";


function AppHooks () {

const [ contacts, setContacts] = useState ([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);

  const [ name, setName] = useState ('');
  const [ number, setNumber] = useState ('');
  const [  filter, setFilter] = useState ('');
  


  // Функция о выводе предупреждения, если пользователь хочет добавить контакты, имена которых уже есть в телефонной книге.
  //Её вызов делаем внутри функции сабмита формы formSubmitHandler
  const isExist  = (data) => {
    //из нового полученного объекта с новым контактом берём name переводим в нижний регистр и ищем такие же имена в существующем списке контактов
    
    const  normalizedNewName = data.name.toLowerCase ();
    const tmpArray = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedNewName));

    if (tmpArray.length!==0) {
      alert (`${tmpArray[0].name} is already in contacts`)
       return true;
      } else {
        return false;
       }
  }


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
                  // setContacts ([newContact, ...prevState.contacts ])
                  setContacts ([newContact, ...contacts ])
                    }         
      };


      const changeFilter = e => {
        setFilter (e.currentTarget.value )
      }

      const getVisibleContact = () => {
        //Приводим значение фильтра к нижнему регистру (и в функции проверки имена тоже будем приводить к нижнему регистру)
        const  normalizedFilter = filter.toLowerCase ();
    
        //Используем метод Array.filter() c MDN. Проверяем есть ли значение из фильтра в массиве контактов (ищем по значению имени)
        return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
      }




  const deleteContact = (contactId) => {
    setContacts ( contacts.filter ( contact=> contact.id !== contactId))
  //   this.setState ( prevState => ({
  //     contacts: prevState.contacts.filter ( contact=> contact.id !== contactId)
  //   }) )
  }

  const visibleContacts = getVisibleContact();

  return (
    <div className={s.container}>
       
       <h1 className={s.titlePhonebook}>Phonebook</h1>
      
       <ContactFormHooks name={name}  number={number} onFormSubmit={formSubmitHandler} />

      <h2 className={s.contactsTitle}>Contacts</h2>

          <FilterHooks value = {filter} handleFilter = {changeFilter}/>


          <ContactsListHooks contactsArray={visibleContacts} onDeleteContact = {deleteContact}/>          

    </div>
  );

}

export default AppHooks;