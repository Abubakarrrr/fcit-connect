import { create } from "zustand";
import axios from "axios";
import { ID, storage } from "@/utils/appwriteConfig";

const API_URL = "http://localhost:5000/api/project";
const ADMIN_API_URL = "http://localhost:5000/api/admin";
axios.defaults.withCredentials = true;

export const useProjectStore = create((set) => ({
  project: null,
  allProjects: [],
  teamMembers: [],
  message: null,
  categories: [],
  supervisors: [],
  isLoading: false,
  storeError: null,

  adminProjects: [],
  adminCategories: [],
  // USER APIs
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
      const thumbnail = await storage.createFile(
        "678faed20020cb101db1",
        ID.unique(),
        projectData.thumbnail
      );

      const thumbnailUrl = storage.getFileView(
        "678faed20020cb101db1",
        thumbnail?.$id
      );
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
        thumbnail: thumbnailUrl,
      });
      if (response.data.projectData) {
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
    console.log("Updating Project");
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
          updateData: {
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
          },
        }
      );
      if (response.data.projectData) {
        set({
          project: response.data.projectData,
          message: response.data.message,
          isLoading: false,
        });
        console.log("Updated Project");
        return response.data.projectData;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Updating Project",
      });
      throw error;
    }
  },
  deleteProject: async (projectId) => {
    console.log("Deleting Project");
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.post(
        `${API_URL}/delete-project/${projectId}`
      );
      if (response.data.deletedProject) {
        const deletedProject = response.data.deletedProject;
        const regex = /\/files\/([^\/]+)\/view/;
        console.log("DELETED");
        if (deletedProject.thumbnail) {
          const match = deletedProject.thumbnail.match(regex);
          await storage.deleteFile("678faed20020cb101db1", match[1]);
        }
        if (deletedProject.documentation) {
          const match = deletedProject.documentation.match(regex);
          await storage.deleteFile("678faed20020cb101db1", match[1]);
        }
        if (deletedProject.images.length > 0) {
          for (const imageUrl of deletedProject.images) {
            const match = imageUrl.match(regex);
            await storage.deleteFile("678faed20020cb101db1", match[1]);
          }
        }
        set({
          project: null,
          message: response.data.message,
          isLoading: false,
        });
        return response.data.deletedProject;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Updating Project",
      });
      throw error;
    }
  },
  getSingleUserProject: async (projectId) => {
    console.log("Getting Single Project");
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(
        `${API_URL}/get-user-project/${projectId}`
      );
      if (response.data.projectData) {
        set({
          project: response.data.projectData,
          message: response.data.message,
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
        set({
          project: response.data.projectData,
          message: response?.data?.message,
          isLoading: false,
        });
        return response.data.projectData;
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

      if (response.data.projects) {
        set({
          allProjects: response.data.projects,
          message: response?.data?.message,
          isLoading: false,
        });
        return response.data.projects;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Finding Projects",
      });
      throw error;
    }
  },
  uploadFile: async (file, projectId, type) => {
    set({ isLoading: true, storeError: null });
    console.log("file uploading");
    try {
      const createdFile = await storage.createFile(
        "678faed20020cb101db1",
        ID.unique(),
        file
      );
      const fileUrl = storage.getFileView(
        "678faed20020cb101db1",
        createdFile.$id
      );
      await axios.post(`${API_URL}/upload-file/${projectId}`, {
        fileUrl,
        type,
      });
      set({
        message: "file uploaded successfully",
        isLoading: false,
      });
      console.log("file uploaded");
      return fileUrl;
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error uploading file",
      });
      throw error;
    }
  },
  deleteFile: async (fileUrl, projectId, type) => {
    set({ isLoading: true, storeError: null });
    console.log("file deleting");
    try {
      const regex = /\/files\/([^\/]+)\/view/;
      const match = fileUrl.match(regex);
      await storage.deleteFile("678faed20020cb101db1", match[1]);
      await axios.post(`${API_URL}/delete-file/${projectId}`, {
        fileUrl,
        type,
      });
      console.log("file deleted");
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
  addTeamMember: async (teamMember, projectId) => {
    set({ isLoading: true, storeError: null });
    console.log("Adding team member");
    try {
      const response = await axios.post(
        `${API_URL}/add-team-member/${projectId}`,
        {
          teamMember,
        }
      );

      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        console.log("Added team member");
        return response.data.teamMember;
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
        `${API_URL}/update-team-member/${memberId}`,
        { updateData }
      );
      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.teamMember;
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
    set({ storeError: null });
    try {
      console.log("Deleting Member");
      const response = await axios.post(
        `${API_URL}/delete-team-member/${memberId}`
      );
      if (response.data.message) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        console.log("Member Deleted");
      }
    } catch (error) {
      set({
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
        `${API_URL}/get-team-member/${memberId}`
      );

      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.teamMember;
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
  getAllTeamMembers: async (projectId) => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(
        `${API_URL}/get-all-team-members/${projectId}`
      );
      if (response.data.teamMembers) {
        set({
          message: response.data.message,
          isLoading: false,
          teamMembers: response.data.teamMembers,
        });
        return response.data.teamMembers;
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
  getAllCategories: async () => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(`${API_URL}/get-all-categories`);

      if (response.data.categories) {
        set({
          message: response.data.message,
          isLoading: false,
          categories: response.data.categories,
        });
        return response.data.categories;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError:
          error.response?.data?.message || "Error Fetching Supervisors",
      });
      throw error;
    }
  },
  getAllSupervisors: async () => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(`${API_URL}/get-all-supervisors`);

      if (response.data.supervisorNames) {
        set({
          message: response.data.message,
          isLoading: false,
          supervisors: response.data.supervisorNames,
        });

        return response.data.supervisorNames;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError:
          error.response?.data?.message || "Error Fetching Supervisors",
      });
      throw error;
    }
  },

  // ADMIN APIs
  sudo_createIntialProject: async (projectData) => {
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
      const thumbnail = await storage.createFile(
        "678faed20020cb101db1",
        ID.unique(),
        projectData.thumbnail
      );

      const thumbnailUrl = storage.getFileView(
        "678faed20020cb101db1",
        thumbnail?.$id
      );
      const response = await axios.post(`${ADMIN_API_URL}/create-project`, {
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
        thumbnail: thumbnailUrl,
      });
      if (response.data.projectData) {
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
  sudo_updateProject: async (projectData, projectId) => {
    console.log("Updating Project");
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
        `${ADMIN_API_URL}/update-project/${projectId}`,
        {
          updateData: {
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
          },
        }
      );
      if (response.data.projectData) {
        set({
          project: response.data.projectData,
          message: response.data.message,
          isLoading: false,
        });
        console.log("Updated Project");
        return response.data.projectData;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Updating Project",
      });
      throw error;
    }
  },
  sudo_deleteProject: async (projectId) => {
    console.log("Deleting Project");
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/delete-project/${projectId}`
      );
      if (response.data.deletedProject) {
        const deletedProject = response.data.deletedProject;
        const regex = /\/files\/([^\/]+)\/view/;
        console.log("DELETED");
        if (deletedProject.thumbnail) {
          const match = deletedProject.thumbnail.match(regex);
          await storage.deleteFile("678faed20020cb101db1", match[1]);
        }
        if (deletedProject.documentation) {
          const match = deletedProject.documentation.match(regex);
          await storage.deleteFile("678faed20020cb101db1", match[1]);
        }
        if (deletedProject.images.length > 0) {
          for (const imageUrl of deletedProject.images) {
            const match = imageUrl.match(regex);
            await storage.deleteFile("678faed20020cb101db1", match[1]);
          }
        }
        set({
          project: null,
          message: response.data.message,
          isLoading: false,
        });
        return response.data.deletedProject;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Updating Project",
      });
      throw error;
    }
  },
  sudo_getSingleProject: async (projectId) => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/get-project/${projectId}`
      );

      if (response.data.projectData) {
        set({
          project: response.data.projectData,
          message: response?.data?.message,
          isLoading: false,
        });
        return response.data.projectData;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Finding Project",
      });
      throw error;
    }
  },
  sudo_getAllProjects: async () => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(`${ADMIN_API_URL}/get-projects`);

      if (response.data.projects) {
        set({
          allProjects: response.data.projects,
          message: response?.data?.message,
          isLoading: false,
        });
        return response.data.projects;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Finding Projects",
      });
      throw error;
    }
  },
  sudo_getAllAdminProjects: async () => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(`${ADMIN_API_URL}/get-admin-projects`);

      if (response.data.projects) {
        set({
          adminProjects: response.data.projects,
          message: response?.data?.message,
          isLoading: false,
        });
        return response.data.projects;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Finding Projects",
      });
      throw error;
    }
  },
  sudo_approveProject: async (projectId,feedback) => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/approve-project/${projectId}`,{feedback}
      );

      if (response.data.projectData) {
        set({
          project: response.data.projectData,
          message: response?.data?.message,
          isLoading: false,
        });
        return response.data.projectData;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Approving Project",
      });
      throw error;
    }
  },
  sudo_rejectProject: async (projectId,feedback) => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/reject-project/${projectId}`,{feedback}
      );

      if (response.data.projectData) {
        set({
          project: response.data.projectData,
          message: response?.data?.message,
          isLoading: false,
        });
        return response.data.projectData;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Rejecting Project",
      });
      throw error;
    }
  },

  sudo_addTeamMember: async (teamMember, projectId) => {
    set({ isLoading: true, storeError: null });
    console.log("Adding team member");
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/add-team-member/${projectId}`,
        {
          teamMember,
        }
      );

      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        console.log("Added team member");
        return response.data.teamMember;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Adding Team Member",
      });
      throw error;
    }
  },
  sudo_updateTeamMember: async (updateData, memberId) => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/update-team-member/${memberId}`,
        { updateData }
      );
      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.teamMember;
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
  sudo_deleteTeamMember: async (memberId) => {
    set({ storeError: null });
    try {
      console.log("Deleting Member");
      const response = await axios.post(
        `${ADMIN_API_URL}/delete-team-member/${memberId}`
      );
      if (response.data.message) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        console.log("Member Deleted");
      }
    } catch (error) {
      set({
        storeError:
          error.response?.data?.message || "Error Deleting Team Member",
      });
      throw error;
    }
  },
  sudo_getTeamMember: async (memberId) => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/get-team-member/${memberId}`
      );

      if (response.data.teamMember) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.teamMember;
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
  sudo_getAllTeamMembers: async (projectId) => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/get-all-team-members/${projectId}`
      );
      if (response.data.teamMembers) {
        set({
          message: response.data.message,
          isLoading: false,
          teamMembers: response.data.teamMembers,
        });
        return response.data.teamMembers;
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

  sudo_createCategory: async (name) => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.post(`${ADMIN_API_URL}/create-category`, {
        name,
      });

      if (response.data.category) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.category;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError: error.response?.data?.message || "Error Adding Team Member",
      });
      throw error;
    }
  },
  sudo_updateCategory: async (name, catId) => {
    set({ isLoading: true, storeError: null });

    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/update-category/${catId}`,
        { name }
      );
      if (response.data.category) {
        set({
          message: response.data.message,
          isLoading: false,
        });
        return response.data.category;
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
  sudo_deleteCategory: async (catId) => {
    set({ storeError: null });
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/delete-category/${catId}`
      );
      if (response.data.success) {
        set({
          message: response.data.message,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        storeError:
          error.response?.data?.message || "Error Deleting Category",
      });
      throw error;
    }
  },
  sudo_getAllCategories: async () => {
    set({ isLoading: true, storeError: null });
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/get-all-categories`
      );
      if (response.data.categories) {
        set({
          message: response.data.message,
          isLoading: false,
          adminCategories: response.data.categories,
        });
        return response.data.categories;
      }
    } catch (error) {
      set({
        isLoading: false,
        storeError:
          error.response?.data?.message || "Error Finding Categories",
      });
      throw error;
    }
  },
 
}));
