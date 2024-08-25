import './showHideMenuButton.css';
import { PropTypes } from 'prop-types';

export default function ShowHideMenuButton({ action }) {
  return (
    <button
      className="show-hide-menu-button"
      type="button"
      onClick={action}
    >
      <svg className="show-hide-menu-icon" viewBox="0 0 24 24">
        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>
    </button>
  );
}

ShowHideMenuButton.propTypes = {
  action: PropTypes.func
};
