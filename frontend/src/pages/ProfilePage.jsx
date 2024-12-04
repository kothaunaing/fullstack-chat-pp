import React, { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-2xl mx-auto my-2 space-y-4">
        <div className="bg-base-200 rounded-md p-2">
          <div className="text-center">
            <h1 className="font-bold text-2xl ">Profile</h1>
            <p className="">Your profile information</p>
          </div>
          <div className=" mt-4 flex flex-col items-center">
            <div className="relative size-28   rounded-full">
              <img
                className="size-full skeleton rounded-full object-cover object-center"
                src={selectedImage || authUser.profilePic}
              />
              <button
                onClick={() => {
                  const input = document.querySelector("#avatar-upload");
                  input.click();
                }}
                className=" btn btn-circle absolute right-1 bottom-1 "
              >
                <Camera
                  className={`size-5 ${
                    isUpdatingProfile ? "animate-pulse" : ""
                  }`}
                />
              </button>
            </div>
            <input
              disabled={isUpdatingProfile}
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSubmit}
            />
            <p>
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon and update the profile"}
            </p>
          </div>
          <div className="m-2">
            <div className="form-control space-y-2">
              <div className="flex items-center gap-x-1">
                <User className="size-5" />
                <span>Full Name</span>
              </div>
              <p className="input input-md flex items-center ">
                {authUser?.fullName}
              </p>
            </div>
            <div className="form-control space-y-2 mt-2">
              <div className="flex items-center gap-x-1 ">
                <Mail className="size-5" />
                <span>Email</span>
              </div>
              <p className="input input-md flex items-center ">
                {authUser?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-base-200 p-2 rounded-md">
          <h1 className="font-bold text-2xl">Account Information</h1>
          <div className="mt-3">
            <div className="flex justify-between">
              <p>Member since</p>
              <p className="font-bold"> {authUser.createdAt}</p>
            </div>
            <div className="divider" />
            <div className="flex justify-between">
              <p>Account Status</p>
              <p className="text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
