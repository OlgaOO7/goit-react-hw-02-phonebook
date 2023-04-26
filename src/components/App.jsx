import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";
import css from "./App.module.css";

export class App extends Component {

  static defaultProps = {
    initialContactList: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
  }

  state = {
    contacts: this.props.initialContactList,
    filter: '',
    // [
      // {id: 'id-1', name: 'Rosie Simpson'},
      // {id: 'id-2', name: 'Hermione Kline'},
      // {id: 'id-3', name: 'Eden Clements'},
      // {id: 'id-4', name: 'Annie Copeland'},
    // ],
  };

  handleNewContact = (data) => {
    const { contacts } = this.state;
    const enteredName = data.name.toLowerCase();
    const checkedRepeatedName = contacts.find(contact => contact.name.toLocaleLowerCase() === enteredName);
    if (checkedRepeatedName) {
      alert(`${data.name} is already in contacts!`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, {...data, id: nanoid()}],
    }))
    // console.log(this.state);
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  handleFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getFilterResult = () => {
    const { filter, contacts} = this.state;
    const filterContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterContact)
    );
  };

  render() {
    const { filter } = this.state;
    const filterResult = this.getFilterResult();
    return (
      <div className={css.wrapper}>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm  onSubmit={this.handleNewContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilter} />
        <ContactsList contacts={filterResult} onDelete={this.deleteContact} />
      </div>
    );
  }
}

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
