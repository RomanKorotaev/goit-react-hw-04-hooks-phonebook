import React, { useState} from "react";
import s from "./ContactForm.module.css";
import PropTypes from 'prop-types';

export default function ContactFormHooks ({onFormSubmit}) {

    const [name, setName] =useState ('');
    const [number, setNumber] =useState ('');


     // Это единый обработчик для разных элементов. Выбираем нужный по атрибуту name (задать каждому элементу свой)
  // и через вычисляемое (диннамическое) свойство объекта присваеваем нужному элементу нужное велью
  const handleChange = (e) => {
    const {name, value} = e.currentTarget;

    switch (name) {
        case "name":
            setName(value);
          break;

          case "numbe":
            setNumber(number);
          break;

          default:
            return;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
   
    // Записываем  переменные имени и телефона, напечатанные в форме, в объект
    const data = {
      name: name,
      number: number,
    }

    // Передаём объект с новыми данными из формы как пареметр функции - для передачи в Арр (поднятие состояния)
    onFormSubmit(data);

    // Очищаем поля формы
    reset();
  };


  // Метод очистки полей Формы
  const reset = () => {
    console.log("Сработал    reset ");
    setName('');
    setNumber('');
  };


    return (
        
        <form onSubmit={handleFormSubmit}>
        
          <label className={s.nameTitle}>
            Name:
            <input
            className={s.inputStyleClass }
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Введите имя"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
        
  
          <label className={s.nameTitle}>
            Number:
            <input
                className={s.inputStyleClass }
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                placeholder="Введите номер: 000-00-00"
                required
            />
                  </label> 
  
          <button className={s.addBtm}  type="submit"> Add contact </button>
        </form>
      );
}