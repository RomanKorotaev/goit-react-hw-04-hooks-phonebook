import React, { Component } from "react";
import s from "./ContactForm.module.css";
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  // Это единый обработчик для разных элементов. Выбираем нужный по атрибуту name (задать каждому элементу свой)
  // и через вычисляемое (диннамическое) свойство объекта присваеваем нужному элементу нужное велью
  handleChange = (e) => {
    const {name} = e.currentTarget;

        this.setState({ 
             [name]: e.currentTarget.value
             });

        // console.log("Сработало изменение инпута Form.js)", e);
        // console.log("e.currentTarget.value: ", e.currentTarget.value);
        // console.log("e.currentTarget.name: ", e.currentTarget.name);

  };



  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Сработал сабмит формы при клике на кнопку эдд");
    console.log("this.state : ", this.state);

    // Записываем  переменные имени и телефона, напечатанные в форме, в объект
    const data = {
      name: this.state.name,
      number: this.state.number,
    }

    // Передаём объект с новыми данными из формы как пареметр функции - для передачи в Арр (поднятие состояния)
    this.props.onFormSubmit(data);

    // Очищаем поля формы
    this.reset();
  };

  // Метод очистки полей Формы
  reset = () => {
    console.log("Сработал    reset ");
    this.setState ( {
       name: "",
      number: "" },
    );
  };

  render() {
    return (
      // <form onSubmit={this.props.onFormSubmit}>
      <form onSubmit={this.handleFormSubmit}>
      
        <label className={s.nameTitle}>
          Name:
          <input
          className={s.inputStyleClass }
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
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
              value={this.state.number}
              onChange={this.handleChange}
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
}



ContactForm.propTypes = {
 
  state: PropTypes.arrayOf(
    // Объект с определённой структурой
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};


export default ContactForm;
