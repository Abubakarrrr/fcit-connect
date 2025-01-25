import { create } from "zustand";
import axios from "axios";
import { storage } from "@/utils/appwriteConfig";

const API_URL = "http://localhost:5000/api/project";
axios.defaults.withCredentials = true;

const checkImagesURL = async (images) => {
  let finalImages = [];
  images?.forEach(async (image) => {
    try {
      const res = await axios.get(image);
      if (res.data) {
        finalImages.push(image);
      }
    } catch (error) {
      // console.log(error.response?.data.message);
    }
  });
  return finalImages;
};

export const useProjectStore = create((set) => ({
  project: null,
  allProjects: [],
  error: null,
  isLoading: false,
  message: null,

  createIntialProject: async (projectData, userId) => {
    console.log("Inside Store: ", userId);
    set({ isLoading: true, error: null });
    const {
      templateName,
      description,
      campus,
      department,
      year,
      deployedLink,
      githubLink,
      figmaLink,
      category,
      supervisor,
    } = projectData;
    try {
      const newFileName = `${userId}-thumbnail`;
      const arrayBuffer = await projectData.thumbnail.arrayBuffer();
      const newFile = new File([arrayBuffer], newFileName, {
        type: projectData.thumbnail.type,
      });
      const response = await axios.post(`${API_URL}/create-project`, {
        title: templateName,
        description,
        campus,
        department,
        year,
        category,
        supervisor,
        figmaLink,
        githubLink,
        deployLink: deployedLink,
      });
      await storage.createFile(
        "678faed20020cb101db1",
        `${userId}-thumbnail`,
        newFile
      );
      set({
        message: response?.data?.message,
        isLoading: false,
      });
      return response?.data?.projectData._id;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error Creating Project",
      });
      throw error;
    }
  },
  getSingleUserProject: async (userId) => {
    console.log("Inside Store: ", userId);
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-user-project`);

      if (response.data.projectData) {
        const thumbnail = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-thumbnail`
        );
        const documentation = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-documentation`
        );
        const screenshot1 = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-screenshot1`
        );
        const screenshot2 = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-screenshot2`
        );
        const screenshot3 = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-screenshot3`
        );
        const images = Array.from([
          thumbnail,
          documentation,
          screenshot1,
          screenshot2,
          screenshot3,
        ]);
        const finalImages = await checkImagesURL(images);
        set({
          project: {
            ...response?.data?.projectData,
            images: finalImages,
          },
          message: response?.data?.message,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error Finding Project",
      });
      throw error;
    }
  },
  getSingleProject: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-project/${projectId}`);

      if (response.data.projectData) {
        const userId = response.data.projectData.user;
        console.log("userId: ", userId);

        const thumbnail = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-thumbnail`
        );
        const documentation = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-documentation`
        );
        const screenshot1 = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-screenshot1`
        );
        const screenshot2 = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-screenshot2`
        );
        const screenshot3 = storage.getFileView(
          "678faed20020cb101db1",
          `${userId}-screenshot3`
        );
        const images = Array.from([
          thumbnail,
          documentation,
          screenshot1,
          screenshot2,
          screenshot3,
        ]);
        const finalImages = await checkImagesURL(images);
        set({
          project: {
            ...response?.data?.projectData,
            images: finalImages,
          },
          message: response?.data?.message,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error Finding Project",
      });
      throw error;
    }
  },
  getAllProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-projects`);

      let projectsRes = [];
      if (response.data.projects) {
        response.data.projects.forEach(async (project) => {
          const userId = project.user;
         
          const thumbnail = storage.getFileView(
            "678faed20020cb101db1",
            `${userId}-thumbnail`
          );
          const documentation = storage.getFileView(
            "678faed20020cb101db1",
            `${userId}-documentation`
          );
          const screenshot1 = storage.getFileView(
            "678faed20020cb101db1",
            `${userId}-screenshot1`
          );
          const screenshot2 = storage.getFileView(
            "678faed20020cb101db1",
            `${userId}-screenshot2`
          );
          const screenshot3 = storage.getFileView(
            "678faed20020cb101db1",
            `${userId}-screenshot3`
          );
          const images = Array.from([
            thumbnail,
            documentation,
            screenshot1,
            screenshot2,
            screenshot3,
          ]);
          const finalImages = await checkImagesURL(images);
          projectsRes.push({
            ...project,
            images:finalImages
          });
        });
      }

      set({
        allProjects: projectsRes,
        message: response?.data?.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error Finding Projects",
      });
      throw error;
    }
  },
}));
