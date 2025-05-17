import React from "react";
import { useRef, useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

  const handleViewPassword = () => {
    if (ref.current.src.includes("icons/view.png")) {
      passwordRef.current.type = "text";
      ref.current.src = "icons/hidden.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/view.png";
    }
  };

  const savePassword = (e) => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setForm({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast("Password not saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const editPassword = (id) => {
    console.log(`editing the password with id : ${id}`);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    setForm(passwordArray.filter((item) => item.id === id)[0]);
  };

  const deletePassword = (id) => {
    console.log(`delete the password with id : ${id}`);
    let conf = confirm("Do you really want to delele this Password?");
    if (conf) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast("🦄 Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />

      <div className=" flex flex-col gap-5 px-5 pt-0 mb-10 mx-auto md:container md:px-40 md:py-5  text-white ">
        <div className="fixed inset-0 -z-10 w-full  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className="flex flex-col text-white text-center gap-2 items-center">
          <div className="font-pop text-2xl">
            <span className="text-[#FF00D4] font-bold ">&lt;Jax</span>
            <span className="text-[#FF0090] font-bold">Crypt/&gt;</span>
          </div>
          <div className="text-md">Secure every key. Own your identity.</div>
        </div>
        <div>
          <input
            onChange={handleChange}
            name="site"
            value={form.site}
            type="text"
            placeholder=" Enter website URL"
            className="bg-[#CCCCFF] w-full rounded-full text-black px-3 py-1 text-sm border-2 border-[#9D00FF]"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-8 justify-between">
          <input
            onChange={handleChange}
            name="username"
            value={form.username}
            placeholder="Enter Username"
            type="text"
            className="bg-[#CCCCFF] rounded-full w-full text-black px-3 py-1 text-sm border-2 border-[#9D00FF]"
          />
          <div className="relative">
            <input
              ref={passwordRef}
              onChange={handleChange}
              name="password"
              value={form.password}
              placeholder="Enter Password"
              type="password"
              className="bg-[#CCCCFF] w-full rounded-full text-black pl-2 py-1 pr-9 text-sm border-2 border-[#9D00FF]"
            />
            <span className="absolute text-white top-[4px] right-2 cursor-pointer">
              <img
                ref={ref}
                src="icons/view.png"
                alt=""
                width={23}
                onClick={handleViewPassword}
              />
            </span>
          </div>
        </div>
        <div className="mx-auto  px-2">
          <button
            onClick={savePassword}
            className="bg-[#D6C1FF] text-black flex items-center justify-center gap-2  px-4  text-sm rounded-full w-full font-bold border-2 border-[#9D00FF]  hover:bg-[#ba99fb] cursor-pointer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              style={{ width: "25px" }}
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password-table flex flex-col gap-3 text-black ">
          <h2 className=" font-bold text-md text-white">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-[#00FFF7] text-md font-bold">
              There are no passwords
            </div>
          )}
          {passwordArray.length !== 0 && (
            <div className="w-full  ">
              <table className=" min-w-full rounded-lg overflow-hidden ">
                <thead className="border-4 text-sm border-[#9D00FF] text-[#00FFF7] font-bold bg-[#12002F]">
                  <tr>
                    <th className="py-3 text-center ">Site</th>
                    <th className="py-3 text-center ">Username</th>
                    <th className="py-3 text-center ">Password</th>
                    <th className="py-3 text-center ">Actions</th>
                  </tr>
                </thead>
                <tbody className=" border-4 text-sm border-[#9D00FF] text-[#39FF14] scro font-bold bg-[#1B0036] ">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="text-center py-5 px-6 ">
                          <div className=" flex justify-center items-center gap-2 hover:underline">
                            <div className="break-words max-w-80 whitespace-normal">
                              <a href="{item.site}" target="_blank">
                                {item.site}
                              </a>
                            </div>
                            <div
                              className="lordIconsCopy cursor-pointer "
                              onClick={() => {
                                handleCopy(item.site);
                              }}
                            >
                              <lord-icon
                                style={{ width: "25px", paddingTop: "4px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                colors="primary:#e8308c"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-5   ">
                          <div className=" flex justify-center items-center gap-2 ">
                            <span> {item.username}</span>
                            <div
                              className="lordIconsCopy cursor-pointer"
                              onClick={() => {
                                handleCopy(item.username);
                              }}
                            >
                              <lord-icon
                                onClick={() => {
                                  handleCopy;
                                }}
                                style={{ width: "25px", paddingTop: "4px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                colors="primary:#e8308c"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-5   ">
                          <div className=" flex justify-center items-center gap-2 ">
                            <span>{item.password}</span>
                            <div
                              className="lordIconsCopy cursor-pointer "
                              onClick={() => {
                                handleCopy(item.password);
                              }}
                            >
                              <lord-icon
                                style={{ width: "25px", paddingTop: "4px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                colors="primary:#e8308c"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-5 px-3 flex justify-center">
                          <span
                            className="lordIconsCopy cursor-pointer "
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", paddingTop: "2px" }}
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              colors="primary:#e8308c"
                              className="mx-1"
                            ></lord-icon>
                          </span>
                          <span
                            className="lordIconsCopy cursor-pointer "
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              className="mx-1"
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              colors="primary:#e8308c"
                              style={{ width: "25px", paddingTop: "2px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
