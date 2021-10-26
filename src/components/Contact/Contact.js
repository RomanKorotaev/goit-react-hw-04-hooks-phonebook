import s from "./Contact.module.css";
import React, { Component } from "react";

// Прокидывание пропсов по цепочке до "внука": 1:10:00 Репета. Занятие 5. Жизненный цикл 
class Contact extends Component { 

    render () {
        const {name, number, onDelete} = this.props;
        return ( 
           <div>
                <p> <span> {name} : </span> <span>{number}</span></p >

                <button type="button"
                className ={s.deleteBtn}
                // onClick ={ () => onDeleteContact(id) }
                onClick ={ onDelete } >   Delete </button>
            </div>  
        )
    }
}

export default Contact;