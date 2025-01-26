import { create } from "zustand";
import axios from "axios";
import { storage } from "@/utils/appwriteConfig";

const API_URL = "http://localhost:5000/api/project";
axios.defaults.withCredentials = true;

const checkImagesURL = async (images) => {
  let finalImages = [];
  for (const image of images) {
    try {
      const res = await axios.get(image);
      finalImages.push(image);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(`Failed to load image: ${image}`);
      } else {
        console.error(error);
      }
    }
  }
  return finalImages;
};

export const useProjectStore = create((set) => ({
  project: null,
  allProjects: [],
  teamMember: null,
  teamMembers: [],
  storeError: null,
  isLoading: false,
  message: null,

  createIntialProject: async (projectData) => {
    set({ isLoading: true, storeError: null });
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
      if (response.data.projectData) {
        const newFileName = `${response.data.projectData._id}-thumbnail`;
        const arrayBuffer = await projectData.thumbnail.arrayBuffer();
        const newFile = new File([arrayBuffer], newFileName, {
          type: projectData.thumbnail.type,
        });
        await storage.createFile(
          "678faed20020cb101db1",
          `${response.data.projectData._id}-thumbnail`,
          newFile
        );
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.projectData._id;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Creating Project",
      });
      throw error;
    }
  },
  updateProject: async (projectData, projectId) => {
    console.log("Inside Store: ");
    set({ isLoading: true, storeError: null });
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
      readme,
      frontend,
      backend,
      database,
      aiLibraries,
      devops,
      testing,
    } = projectData;
    try {
      const response = await axios.post(
        `${API_URL}/update-project/${projectId}`,
        {
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
          readme,
          frontend,
          backend,
          database,
          aiLibraries,
          devops,
          testing,
        }
      );
      if (response.data.projectData) {
        if (projectData.thumbnail) {
          const newFileName = `${projectId}-thumbnail`;
          const arrayBuffer = await projectData.thumbnail.arrayBuffer();
          const newFile = new File([arrayBuffer], newFileName, {
            type: projectData.thumbnail.type,
          });
          await storage.createFile(
            "678faed20020cb101db1",
            `${projectId}-thumbnail`,
            newFile
          );
        }
        if (projectData.screenshot1) {
          const newFileName = `${projectId}-screenshot1`;
          const arrayBuffer = await projectData.screenshot1.arrayBuffer();
          const newFile = new File([arrayBuffer], newFileName, {
            type: projectData.screenshot1.type,
          });
          await storage.createFile(
            "678faed20020cb101db1",
            `${projectId}-screenshot1`,
            newFile
          );
        }
        if (projectData.screenshot2) {
          const newFileName = `${projectId}-screenshot2`;
          const arrayBuffer = await projectData.screenshot2.arrayBuffer();
          const newFile = new File([arrayBuffer], newFileName, {
            type: projectData.screenshot2.type,
          });
          await storage.createFile(
            "678faed20020cb101db1",
            `${projectId}-screenshot2`,
            newFile
          );
        }
        if (projectData.screenshot3) {
          const newFileName = `${projectId}-screenshot3`;
          const arrayBuffer = await projectData.screenshot3.arrayBuffer();
          const newFile = new File([arrayBuffer], newFileName, {
            type: projectData.screenshot3.type,
          });
          await storage.createFile(
            "678faed20020cb101db1",
            `${projectId}-screenshot3`,
            newFile
          );
        }
        if (projectData.documentation) {
          const newFileName = `${projectId}-documentation`;
          const arrayBuffer = await projectData.documentation.arrayBuffer();
          const newFile = new File([arrayBuffer], newFileName, {
            type: projectData.documentation.type,
          });
          await storage.createFile(
            "678faed20020cb101db1",
            `${projectId}-documentation`,
            newFile
          );
        }
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.projectData._id;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Updating Project",
      });
      throw error;
    }
  },
  getSingleUserProject: async () => {
    console.log("Inside Store: ");
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(`${API_URL}/get-user-project`);

      if (response.data.projectData) {
        const projectId = response.data.projectData._id;
        const thumbnail = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-thumbnail`
        );
        const documentation = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-documentation`
        );
        const screenshot1 = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-screenshot1`
        );
        const screenshot2 = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-screenshot2`
        );
        const screenshot3 = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-screenshot3`
        );
        const images = Array.from([
          thumbnail,
          screenshot1,
          screenshot2,
          screenshot3,
          documentation,
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
        storeError: error.response?.data?.message || "Error Finding Project",
      });
      throw error;
    }
  },
  getSingleProject: async (projectId) => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(`${API_URL}/get-project/${projectId}`);

      if (response.data.projectData) {
        const projectId = response.data.projectData._id;

        const thumbnail = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-thumbnail`
        );
        const documentation = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-documentation`
        );
        const screenshot1 = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-screenshot1`
        );
        const screenshot2 = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-screenshot2`
        );
        const screenshot3 = storage.getFileView(
          "678faed20020cb101db1",
          `${projectId}-screenshot3`
        );
        const images = Array.from([
          thumbnail,
          screenshot1,
          screenshot2,
          screenshot3,
          documentation,
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
        storeError: error.response?.data?.message || "Error Finding Project",
      });
      throw error;
    }
  },
  getAllProjects: async () => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(`${API_URL}/get-projects`);

      let projectsRes = [];
      if (response.data.projects) {
        response.data.projects.forEach(async (project) => {
          const projectId = project._id;

          const thumbnail = storage.getFileView(
            "678faed20020cb101db1",
            `${projectId}-thumbnail`
          );
          const documentation = storage.getFileView(
            "678faed20020cb101db1",
            `${projectId}-documentation`
          );
          const screenshot1 = storage.getFileView(
            "678faed20020cb101db1",
            `${projectId}-screenshot1`
          );
          const screenshot2 = storage.getFileView(
            "678faed20020cb101db1",
            `${projectId}-screenshot2`
          );
          const screenshot3 = storage.getFileView(
            "678faed20020cb101db1",
            `${projectId}-screenshot3`
          );
          const images = Array.from([
            thumbnail,
            screenshot1,
            screenshot2,
            screenshot3,
            documentation,
          ]);
          const finalImages = await checkImagesURL(images);
          projectsRes.push({
            ...project,
            images: finalImages,
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
        storeError: error.response?.data?.message || "Error Finding Projects",
      });
      throw error;
    }
  },
  uploadFile: async (file, name, projectId) => {
    set({ isLoading: true, storeError: null });
    try {
      const newFileName = `${projectId}-${name}`;
      const arrayBuffer = await file.arrayBuffer();
      const newFile = new File([arrayBuffer], newFileName, {
        type: file.type,
      });
      const createdFile = await storage.createFile(
        "678faed20020cb101db1",
        newFileName,
        newFile
      );
      const fileUrl = storage.getFileView(
        "678faed20020cb101db1",
        createdFile.$id
      );
      set({
        message: "file uploaded successfully",
        isLoading: false,
      });
      return fileUrl;
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error uploading file",
      });
      throw error;
    }
  },
  deleteFile: async (fileURL) => {
    set({ isLoading: true, storeError: null });
    try {
      const regex = /\/files\/([^\/]+)\/view/;
      const match = fileURL.match(regex);
      await storage.deleteFile("678faed20020cb101db1", match[1]);
      set({
        message: "file deleted successfully",
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error deleting file",
      });
      throw error;
    }
  },
  addTeamMember: async (teamMember) => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.post(`${API_URL}/add-team-member`, {
        teamMember,
      });

      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
          teamMember: response.data.teamMember,
        });
        return response.data.teamMember._id;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Adding Team Member",
      });
      throw error;
    }
  },
  updateTeamMember: async (updateData, memberId) => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.post(
        `${API_URL}/update-team-member/:${memberId}`,
        {
          updateData,
        }
      );

      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
          teamMember: response.data.teamMember,
        });
        return response.data.teamMember._id;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError:
          error.response?.data?.message || "Error Updating Team Member",
      });
      throw error;
    }
  },
  deleteTeamMember: async (memberId) => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.post(
        `${API_URL}/delete-team-member/:${memberId}`
      );

      if (response.data.message) {
        set({
          message: response.data.message,
          isLoading: false,
          teamMember: null,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError:
          error.response?.data?.message || "Error Deleting Team Member",
      });
      throw error;
    }
  },
  getTeamMember: async (memberId) => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.get(
        `${API_URL}/get-team-member/:${memberId}`
      );

      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
          teamMember: response.data.teamMember,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError:
          error.response?.data?.message || "Error Finding Team Member",
      });
      throw error;
    }
  },
  getAllTeamMembers: async () => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.get(`${API_URL}/get-all-team-members`);

      if (response.data.teamMembers) {
        set({
          message: response.data.message,
          isLoading: false,
          teamMembers: response.data.teamMembers,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError:
          error.response?.data?.message || "Error Finding Team Members",
      });
      throw error;
    }
  },
}));
