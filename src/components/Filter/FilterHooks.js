import React, { useState } from "react";
import s from "./Filter.module.css";
import PropTypes from 'prop-types';

function FilterHooks ({value, handleFilter}) {

    return (
        <label className = {s.filterTitle}>
              Find contacts by name:
                <input
                className ={s.filterInputStyle}
                  type="text"
                  name="filter"
                  value = {value} 
                  
                 onChange={handleFilter} 
                  placeholder="Введите имя для поиска контакта"
              />
            </label> 
    )
}

FilterHooks.propTypes = {
    value: PropTypes.string,
   }

   export default FilterHooks;