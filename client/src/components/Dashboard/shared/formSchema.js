import { useProjectStore } from "@/store/projectStore";
import Joi from "joi";

export const initialState = {
  templateName: "",
  description: "",
  campus: "",
  department: "",
  year: "",
  deployedLink: "",
  githubLink: "",
  figmaLink: "",
  category: "",
  supervisor: "",
};

export const validationSchema = Joi.object({
  templateName: Joi.string().min(3).required().label("FYP Name"),
  description: Joi.string().min(10).required().label("FYP Description"),
  campus: Joi.string().required().label("Campus"),
  department: Joi.string().required().label("Department"),
  year: Joi.string().required().label("Year"),
  deployedLink: Joi.string().uri().allow("").label("Deployed Link"),
  githubLink: Joi.string().uri().required().label("GitHub Link"),
  figmaLink: Joi.string().uri().allow("").label("Figma Link"),
  category: Joi.string().required().label("Category"),
  supervisor: Joi.string().required().label("Supervisor"),
});
export const thumbnailValidation = Joi.object({
  thumbnail: Joi.string().required().messages({
    "any.required": "Please upload a thumbnail image.",
  }),
});
