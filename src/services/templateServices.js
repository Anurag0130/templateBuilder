import axiosInstance from "./configureAxios";
import { templateRoutes } from "./apiRoutes";

export const createTemplate = (payload) =>
    axiosInstance.post(templateRoutes.create, payload);

export const updateTemplate = (payload) =>
    axiosInstance.put(templateRoutes.update, payload);


export const deleteTemplate = (id) =>
    axiosInstance.delete(templateRoutes.delete, { data: { id } });

export const getTemplateById = (id) =>
    axiosInstance.get(templateRoutes.getById(id));

export const getAllTemplates = () =>
    axiosInstance.get(templateRoutes.getAll);
