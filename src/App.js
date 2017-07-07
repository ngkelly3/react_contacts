import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContacts from './CreateContacts'
import * as ContactsAPI from './utils/ContactsAPI'


class App extends Component {

  state = {
    contacts: []
  }

  // when the component mounts, it grabs data from the API and stores it into the contacts array
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  // here we created a function that will remove a contact
  // we pass in the current state to setState, and we filter based on what the current contact.id is
  // basically, we filter the array to include all elements of the state that does not equal the contact that we just clicked.  Pretty cool, right?
  // But how do we get this to ListContacts?  Because it needs to be invoked there.
  // We can pass this into that component as a prop!  Handy.
  removeContact = (contact) => {
    // update the state based on the previous state
    // use setState with no argument to update the state without any dependency on the previous state
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    // also removes from our database
    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
        <Route path="/create" component={CreateContacts}/>
      </div>
    );
  }
}

export default App;
