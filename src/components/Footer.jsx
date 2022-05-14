import { MDBFooter } from "mdb-react-ui-kit";

// Sitewide footer
export default function Footer() {
  return (
    <MDBFooter className="bg-dark text-center text-white text-lg-left">
      <div className="bg-dark text-center p-3 fixed-bottom">
        &copy; {new Date().getFullYear()} Copyright: {"Aarun Jury - n9691693 "}
        <a className="text-white" href="/">
          VotW.com
        </a>
      </div>
    </MDBFooter>
  );
}
