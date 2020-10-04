import React from 'react';
import AppMode from '../AppMode.js';

class SideMenu extends React.Component {

  //renderModeItems -- Renders correct subset of mode menu items based on
  //current mode, which is stored in this.prop.mode. Uses switch statement to
  //determine mode.
  renderModeMenuItems = () => {
    switch (this.props.mode) {
      case AppMode.ROUNDS:
        return(
          <div>
            <a className="menuItem">
              <span className="fa fa-search"></span>&nbsp;View Data Table</a>
            <a className="sidemenu-item" onClick={() => this.props.changeMode(AppMode.ROUNDS_LOGROUND)}>
              <span className="fa fa-plus"></span>&nbsp;Log New Round</a>
          </div>
        );
      break;
      case AppMode.COURSES:
        return(
          <div>
          <a className="sidemenu-item">
              <span className="fa fa-plus"></span>&nbsp;Not implemented yet 1</a>
          <a className="sidemenu-item">
              <span className="fa fa-search"></span>&nbsp;Not implemente yet 2</a>
          </div>
        );
      default:
          return null;
      }
  }

    
    render() {
       return (
        <div className= {"sidemenu " + 
        (this.props.menuOpen ? "sidemenu-open" : "sidemenu-closed")} >
          {/* SIDE MENU TITLE */}
          <div className="sidemenu-title">
            <span className="sidemenu-userID">&nbsp;{this.props.userId}</span>
          </div>
          {/* MENU CONTENT */}
          {/*Mode-based menu items */}
          {this.renderModeMenuItems()}
          {/* Always-there menu items */}
          <a className="sidemenu-item" onClick={this.props.showAbout}><span className="fa fa-info-circle">
              </span>&nbsp;About</a>
          <a className="sidemenu-item" onClick={() => this.props.changeMode(AppMode.LOGIN)}><span className="fa fa-sign-out">
              </span>&nbsp;Log Out</a>
        </div>
        );
    }
  }

export default SideMenu;
