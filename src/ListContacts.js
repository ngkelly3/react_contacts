import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// a component that only has a render method can be simplified into this "stateless" component, in which case we use props alone and don't have to worry about context
// function ListContacts(props) {
//   return(
//     // return an ordered list
//     // maps over each contact and display a contact to the view
//     <ol className='contact-list'>
//       {props.contacts.map((contact) => (
//         // why do we need a key here?  Because when we do a map, if we don't have a unique identifier for every key, React runs the risk of updating the entire list upon a state change
//         <li key={contact.id} className='contact-list-item'>
//           <div className='contact-avatar' style={{
//             backgroundImage: `url(${contact.avatarURL})`
//           }}/>
//           <div className='contact-details'>
//             <p>{contact.name}</p>
//             <p>{contact.email}</p>
//           </div>
//           <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
//             Remove
//           </button>
//         </li>
//       ))}
//     </ol>
//   )
// }

// a component that only has a render method can be simplified into this "stateless" component, in which case we use props alone and don't have to worry about context
class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''

  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {

    // object destructuring, to help clean up code
    const { contacts, onDeleteContact/*, onNavigate */} = this.props;
    const { query } = this.state;

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    // sort comes with JavaScript, and sortBy allows us to sort by a particular id
    showingContacts.sort(sortBy('name'))

    return(
      // return an ordered list
      // maps over each contact and display a contact to the view
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to="/create" //appends to the URL /create!
            //onClick={ onNavigate } (Link takes care of this, no need for onNavigate anymore)
            className="add-contact"
          >Add Contact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
              <span>Now showing {showingContacts.length} of {contacts.length}</span>
              <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            // why do we need a key here?  Because when we do a map, if we don't have a unique identifier for every key, React runs the risk of updating the entire list upon a state change
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

// this is really cool.  Basically, this is not necessary code, but it allows us
// to typecheck the props so that we, on some level, get what we expect
// this is to increase robustness of the code, much like how we use exceptions
// to check state in Java
// ListContacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContact: PropTypes.func.isRequired
// }

// A component  that lists the contacts
/*
class ListContacts extends Component {
  render() {
    // this.props contains the object we passed through the component
    // in this case, we passed in the contacts object into the component
    // to access it, we call this.props.contacts and use it as normal
    console.log('Props', this.props)
    return(
      // return an ordered list
      // maps over each contact and display a contact to the view
      <ol className='contact-list'>
        {this.props.contacts.map((contact) => (
          // why do we need a key here?  Because when we do a map, if we don't have a unique identifier for every key, React runs the risk of updating the entire list upon a state change
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`

            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
      </ol>
    )
  }
}
*/

// export line, accessible by App.js
export default ListContacts
