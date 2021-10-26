import logo from "./logo.svg";
import s from "./App.module.css";
import React, { Component } from "react";

import shortid from 'shortid'

import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";


class App extends Component {
  state = {
    // contacts: ["Adrian", "Jacob Mercer", "Charles de Batz"],
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    name: "",
    filter: "",
  };

  formSubmitHandler = (data) => {
    console.log("formSubmitHandler");
    console.log("Новый контакт ( data ) : ", data);
 
    const newContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number
    }


    if ( this.isExist(data) ) {
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

  changeFilter = e => {
    this.setState ({ filter: e.currentTarget.value })
  }


  getVisibleContact = () => {
    const {filter, contacts } =  this.state;
    //Приводим значение фильтра к нижнему регистру (и в функции проверки имена тоже будем приводить к нижнему регистру)
    const  normalizedFilter = filter.toLowerCase ();

    //Используем метод Array.filter() c MDN. Проверяем есть ли значение из фильтра в массиве контактов (ищем по значению имени)
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }


  // Функция о выводе предупреждения, если пользователь хочет добавить контакты, имена которых уже есть в телефонной книге.
  //Её вызов делаем внутри функции сабмита формы formSubmitHandler
  isExist  = (data) => {
    //из нового полученного объекта с новым контактом берём name переводим в нижний регистр и ищем такие же имена в существующем списке контактов
    const { contacts } =  this.state;
    const  normalizedNewName = data.name.toLowerCase ();
    const tmpArray = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedNewName));

    if (tmpArray.length!==0) {
      alert (`${tmpArray[0].name} is already in contacts`)
       return true;
      } else {
        return false;
       }

  }

  deleteContact = (contactId) => {
    this.setState ( prevState => ({
      contacts: prevState.contacts.filter ( contact=> contact.id !== contactId)
    }) )
  }
  

  render() {

    //Создание фильтра
  //Приводим значение фильтра к нижнему регистру (и в функции проверки имена тоже будем приводить к нижнему регистру)
// const  normalizedFilter = this.state.filter.toLowerCase ();
// const visibleContacts = this.state.contacts.filter(contact =>
//    contact.name.toLowerCase().includes(normalizedFilter));

const visibleContacts = this.getVisibleContact();


console.log ("Рендерим из  App текущий список контактов : ", this.state.contacts)

    const { contacts } = this.state;
    return (
      <div className={s.container}>
         
         <h1 className={s.titlePhonebook}>Phonebook</h1>
         <ContactForm name={this.state.name}  number={this.state.number} onFormSubmit={this.formSubmitHandler} />
       

        <h2 className={s.contactsTitle}>Contacts</h2>

          {/* Это фильтр. Его значение мы не будем хранить в state стейте данной формы. Значение живого фильтра будет хранится в стейте App */}
          <Filter value = {this.state.filter} handleFilter = {this.changeFilter}/>

          {/* <ContactsList contacts={contacts} /> */}
          <ContactsList contacts={visibleContacts} onDeleteContact = {this.deleteContact}/>       

      </div>
    );
  }
}

export default App;
