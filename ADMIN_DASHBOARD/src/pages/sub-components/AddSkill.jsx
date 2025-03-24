import { addNewSkill, clearAllSkillErrors, getAllSkill, resetSkillSlice } from '../../store/slices/skillSlice';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Loadingbutton from "../loadingbutton/Loadingbutton";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.skill);

  const handleSvg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSvgPreview(reader.result);
        setSvg(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault(); // ✅ Prevents page reload

    if (!title || !proficiency || !svg) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);

    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkill());
    }
  }, [dispatch, error, message]); // ✅ Removed `loading` dependency

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form className="w-[100%] px-5 md:w-[650px]" onSubmit={handleAddNewSkill}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              ADD A NEW SKILL
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                <input
                  type="text"
                  className="block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-600"
                  placeholder="React.JS"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">Proficiency</label>
                <input
                  type="number"
                  className="block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-600"
                  placeholder="30"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                />
              </div>

              <div className="w-full col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Skill Svg</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {svgPreview ? (
                      <img className="mx-auto h-12 w-12" src={svgPreview} alt="SVG Preview" />
                    ) : (
                      <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <label htmlFor="file-upload" className="cursor-pointer font-semibold text-indigo-600">
                      Upload a file
                      <input id="file-upload" type="file" className="sr-only" onChange={handleSvg} />
                    </label>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button type="submit" className="w-full">Add Skill</Button>
          ) : (
            <Loadingbutton content={"Adding New Skill"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
