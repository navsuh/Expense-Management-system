import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <div className="p-[40px] bg-white font-serif">
      <section className="page_404 w-full">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div
                  className="four_zero_four_bg"
                  style={{
                    backgroundImage:
                      "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                    height: "400px",
                    backgroundPosition: "center",
                  }}
                >
                  <h1 className="text-center text-[80px]">404</h1>
                </div>

                <div className="contant_box_404 -mt-[50px]">
                  <h3 className="h1 text-5xl mb-5">
                    {/* Oooh You are not Authorised
                     */}
                     Page Not Found
                  </h3>

                  <p className="text-xl">
                    The page you are looking for not avaible!
                  </p>

                  <Link
                    to={"/login"}
            
                    className="link_401"
                    style={{
                      color: "#fff!important",
                      padding: "10px 20px",
                      background: "#39ac31",
                      margin: "20px 0",
                      display: "inline-block",
                    }}
                  >
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error401;