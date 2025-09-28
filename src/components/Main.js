import CardMain from "./CardMain";
import ButtonMain from "./ButtonMain";

function Main() {
  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center">
      <div className="container-sm my-4 border border-primary d-flex flex-column flex-column-reverse px-0 justify-content-evenly gap-2 pb-4">
        <CardMain />
        <ButtonMain />
      </div>
    </div>
  );
}

export default Main;
