import Modal from "components/modal/Modal";
import ProfileForm from "./profileForm/ProfileForm";
import VerifyForm from "./verifyForm/VerifyForm";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "context/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(user.photoURL);
  const inputFileRef = useRef(null);
  const formRef = useRef(null);

  return (
    <div className="w-full justify-center flex h-full items-center">
      <div className="">
        <h1 className="text-2xl">Profile details</h1>
        <ProfileForm
          formRef={formRef}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          inputFileRef={inputFileRef}
        />
        <Modal
          modalTitle={"Verify account"}
          text={"Submit"}
          background={"bg-purple"}
        >
          <VerifyForm
            formRef={formRef}
            profileImage={profileImage}
            inputFileRef={inputFileRef}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
