import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '../../store/slices/userSlice'
import Loadingbutton from '../loadingbutton/Loadingbutton'
import { toast } from "react-toastify";

const UpdateProfile = () => {

  const { user, loading, error, isUpdated, messages } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkdinUrl === "undefined" ? "" : user.linkdinUrl)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubUrl === "undefined" ? "" : user.githubUrl)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramUrl === "undefined" ? "" : user.instagramUrl)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );
  const dispatch = useDispatch()
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    }
  }

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('aboutMe', aboutMe);
    formData.append('linkdinUrl', linkedInURL);
    formData.append('githubUrl', githubURL);
    formData.append('instagramUrl', instagramURL);
    formData.append('avatar', avatar);
    formData.append('resume', resume);
    dispatch(updateProfile(formData))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser())
      dispatch(resetProfile());
    }
    if (messages) {
      toast.success(messages)
    }
  }, [dispatch, loading, error, isUpdated])

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Profile Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72 object-contain">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview ? avatarPreview : '/avatarHolder.jpg'}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  <Link to={user && user.resume && user.resume.url} target="_blank">
                    <img
                      src={resumePreview ? resumePreview : "/avatarHolder.jpg"}
                      alt="avatar"
                      className="w-full  h-auto sm:w-72 sm:h-72 rounded-2xl"
                    />
                  </Link>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={resumeHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  placeholder='Your Full Name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder='Your Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  placeholder='Your Email Number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  placeholder="About Me"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  placeholder="Github URL"
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={linkedInURL}
                  onChange={(e) => setLinkedInURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  placeholder="Instagram URL"
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdateProfile()}
                  className="w-full"
                >
                  Update Profile
                </Button>
              ) : (
                <Loadingbutton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;