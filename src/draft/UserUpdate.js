import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Button from "../components/button/Button";
import { Radio } from "../components/checkbox";
import Field from "../components/field/Field";
import ImageUpload from "../components/img/ImgUpload";
import Input from "../components/input/Input";
import { Label } from "../components/label";
import DashboardHeading from "../components/module/Dashboard/DashBoardHeading";
import { Textarea } from "../components/textArea";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase-app/firebase-config";
import useFireBaseImage from "../hooks/UseFirebaseImage";
import { userRole, userStatus } from "../utils/constants";
import FieldCheckboxes from "./FieldCheckboxs";

const UserUpdate = () => {
    const {
      control,
      handleSubmit,
      watch,
      reset,
      getValues,
      setValue,
      formState: { isValid, isSubmitting },
    } = useForm({
      mode: "onChange",
    });
    const [params] = useSearchParams();
    const userId = params.get("id");
    const watchStatus = watch("status");
    const watchRole = watch("role");
    const imageUrl = getValues("avatar");
    const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
    const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
    const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
      useFireBaseImage(setValue, getValues, imageName, deleteAvatar);
    const { userInfo } = useAuth();
    const handleUpdateUser = async (values) => {
      if (!isValid) return;
      if (userInfo?.role !== userRole.ADMIN) {
        Swal.fire("Failed", "You have no right to do this action", "warning");
        return;
      }
      try {
        const colRef = doc(db, "users", userId);
        await updateDoc(colRef, {
          ...values,
          avatar: image,
        });
        toast.success("Update user information successfully!");
      } catch (error) {
        toast.error("Update user failed!");
      }
    };
  
    async function deleteAvatar() {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        avatar: "",
      });
    }
    useEffect(() => {
      setImage(imageUrl);
    }, [imageUrl, setImage]);
    useEffect(() => {
      async function fetchData() {
        if (!userId) return;
        const colRef = doc(db, "users", userId);
        const docData = await getDoc(colRef);
        reset(docData && docData.data());
      }
      fetchData();
    }, [userId, reset]);
  

    return (
      <div>
        <DashboardHeading
          title="Update user"
          desc="Update user information"
        ></DashboardHeading>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
            <ImageUpload
              className="!rounded-full h-full"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Fullname</Label>
              <Input
                name="fullname"
                placeholder="Enter your fullname"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Username</Label>
              <Input
                name="username"
                placeholder="Enter your username"
                control={control}
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                control={control}
                type="email"
              ></Input>
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                name="password"
                placeholder="Enter your password"
                control={control}
                type="password"
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Status</Label>
              <FieldCheckboxes>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.ACTIVE}
                  value={userStatus.ACTIVE}
                  disabled={userInfo?.role !== userRole.ADMIN}
                >
                  Active
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.PENDING}
                  value={userStatus.PENDING}
                  disabled={userInfo?.role !== userRole.ADMIN}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.BAN}
                  value={userStatus.BAN}
                  disabled={userInfo?.role !== userRole.ADMIN}
                >
                  Banned
                </Radio>
              </FieldCheckboxes>
            </Field>
            <Field>
              <Label>Role</Label>
              <FieldCheckboxes>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.ADMIN}
                  value={userRole.ADMIN}
                  disabled={userInfo?.role !== userRole.ADMIN}
                >
                  Admin
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.MOD}
                  value={userRole.MOD}
                  disabled={userInfo?.role !== userRole.ADMIN}
                >
                  Moderator
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.USER}
                  value={userRole.USER}
                  disabled={userInfo?.role !== userRole.ADMIN}
                >
                  User
                </Radio>
              </FieldCheckboxes>
            </Field>
          </div>
          
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update
          </Button>
        </form>
      </div>
    );
  };
  
  export default UserUpdate;