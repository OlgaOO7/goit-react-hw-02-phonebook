import PropTypes from "prop-types";
import css from "./Contact.module.css";

export const Contact = ({contact, onDelete}) => {
  return (
    <li className={css.contactItem}>
      <p className={css.personContact}>{contact.name} : {contact.number}</p>
      <button type="button" id={contact.id} onClick={() => onDelete(contact.id)} className={css.deleteBtn}>Delete</button>
    </li>
  )
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
}