import React, { Component } from "react";
import s from "./Filter.module.css";
import PropTypes from 'prop-types';

class Filter extends Component {

    render() {
        // const {value, handleFilter} = this.props;

        return (
            <label className = {s.filterTitle}>
                  Find contacts by name:
                    <input
                    className ={s.filterInputStyle}
                      type="text"
                      name="filter"
                      value = {this.props.value} 
                      
                     onChange={this.props.handleFilter} 
                      placeholder="Введите имя для поиска контакта"
                  />
                </label> 
        )
    }
}

Filter.propTypes = {
  value: PropTypes.string,
 }

export default Filter;