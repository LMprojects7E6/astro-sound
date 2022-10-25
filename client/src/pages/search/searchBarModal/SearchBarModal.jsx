import Portal from "components/portal";
import Button from "components/button";
import { useState, Children, cloneElement } from "react";
import Icon from "components/icons";

export default function SearchBarModal({ modalTitle, children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className=" flex items-center m-10 rounded-lg  lg:ml-80 bg-white  md:max-w-sm  "
        onClick={() => setShowModal(true)}
      >
        <span className="p-2">
          <Icon name={"search"} size={22} color={"currentColor"} />
        </span>
        <input className="outline-none appearance-none" placeholder="Search" />
      </div>

      {showModal ? (
        <Portal>
          <div className="md:justify-center md:items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none md:w-fit w-full  md:h-min h-full bg-purple3 md:bg-grey2  m-auto">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className=" border-0 rounded md:shadow-lg relative flex flex-col w-full text-white outline-none focus:outline-none">
                {/*header*/}
                <div className="relative m-5">
                  <div className="flex  justify-between justify-items-center p-5 ">
                    <h3 className="text-3xl font-semibold pr-10 hidden md:block">
                      {modalTitle}
                    </h3>
                    <div className="absolute top-0 right-0 ">
                      <Button
                        bg={"grey2"}
                        width={"w-min"}
                        onClick={() => setShowModal(false)}
                        icon={"CloseWindow"}
                        iconColor={"currentColor"}
                        iconSize={30}
                      />
                    </div>
                  </div>
                  <div className="relative pr-4 px-4 hidden md:block">
                    <hr />
                  </div>
                </div>

                {/*body*/}
                {Children.map(children, (child) =>
                  cloneElement(child, { setShowModal, showModal })
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Portal>
      ) : null}
    </>
  );
}
