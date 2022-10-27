import { useMutation } from "@tanstack/react-query";
import { updateUser } from "api/users";
import { AuthContext } from "context/AuthProvider";
import { useContext } from "react";
import { convertFormData } from "utils/convertFormData";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const VerifyForm = ({
  formRef,
  profileImage: inputPicture,
  inputFileRef,
  setShowModal,
}) => {
  const navigate = useNavigate();
  const {
    reAuth,
    updatePhotoUrlProfile,
    updateEmailProfile,
    user,
    checkIfEmailExist,
  } = useContext(AuthContext);
  const currentPicture = user.photoURL;

  //!VERIFY CREDENTIALS
  const verifyCredentials = async (e) => {
    e.preventDefault();
    const { verifyEmail, verifyPassword } = convertFormData(e.target);
    try {
      await reAuth(verifyEmail, verifyPassword);
      uploadPhotoURL();
    } catch (error) {
      toast.error("Wrong email and password combination");
    }
  };

  //!UPLOAD TO CLOUDINARY
  const uploadPhotoURL = async () => {
    const data = new FormData(formRef.current);
    console.log(inputPicture);
    if (currentPicture !== inputPicture && inputFileRef.current.value) {
      mutate(data);
    }
    await updateEmail();
  };
  //!MUTATION
  const { mutate } = useMutation(updateUser, {
    onSuccess: async (data) => {
      await updatePhotoUrlProfile(data);
      inputFileRef.current.value = null;
      // toast.success("Profile picture updated!!");
    },
    onError: async () => {
      toast.error("Cannot update profile picture!!");
    },
  });

  //!UPDATE CHECK EMAIL

  const updateEmail = async () => {
    const { email } = convertFormData(formRef.current);
    try {
      await checkIfEmailExist(email);
      await updateEmailProfile(email);
      toast.success("Profile updated correctly!!");
      setShowModal(false);
    } catch (error) {
      toast.error("Cannot update the email!!");
    }
  };

  return (
    <form
      action=""
      className="flex flex-col mt-3 px-5 text-black"
      onSubmit={verifyCredentials}
    >
      email:
      <input type="email" name="verifyEmail" id="" />
      password:
      <input type="password" name="verifyPassword" />
      <button type="submit" className="bg-purple-500">
        VERIFY
      </button>
    </form>
  );
};

export default VerifyForm;