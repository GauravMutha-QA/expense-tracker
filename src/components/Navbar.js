import ButtonGroup from "./ButtonGroup";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{'backgroundImage':'linear-gradient(rgb(82 69 108), rgb(55 41 81 / 95%))'}}>
        <div className="container-fluid">
          <h1 className="navbar-brand" style={{'color':'white'}}>
            Tracker
          </h1>
          <ButtonGroup></ButtonGroup>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
